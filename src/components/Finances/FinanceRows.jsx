import React from "react";
import axios from "./../../system/axios";
import moment from 'moment';

import { connect } from "react-redux";
import { setPagination, setData, setOpen } from "./../../store/finances/actions";

import { Table, Card, Row, Col, Button } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

const PAGE_SIZE = 10;
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const FinanceRows = props => {

    const { data, setData } = props;
    const { pagination, setPagination } = props;

    const columns = [
        { key: 3, dataIndex: "month", title: "Год", render: month => moment(month).format("YYYY") },
        {
            key: 0, dataIndex: "month", title: "Месяц", render: month => {
                let text = moment(month).format("MMMM");
                return text[0].toUpperCase() + text.slice(1);
            }
        },
        { key: 1, dataIndex: "date", title: "Дата выплаты", render: date => moment(date).format("DD.MM.YYYY") },
        { key: 2, dataIndex: "money", title: "Сумма" },
    ];

    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        fetch({
            current: 1,
            pageSize: PAGE_SIZE,
        });
    }, []);

    const getParams = React.useCallback(params => ({
        results: params.pageSize,
        page: params.current,
        ...params,
    }));

    const fetch = params => {

        setLoading(true);

        axios.post('getFinance', getParams(params)).then(({ data }) => {
            setData(data.data);
            setPagination({
                ...params,
                current: data.current_page,
                total: data.total,
            });
        }).catch(error => {

        }).then(() => {
            setLoading(false);
        });

    }

    const handleTableChange = (pagination, filters, sorter) => {
        fetch({
            ...pagination,
            sortField: sorter.field,
            sortOrder: sorter.order,
            ...filters
        });
    }

    return <Card
        bodyStyle={{ paddingBottom: 7 }}
        title={<Row justify="space-between" align="middle" style={{ margin: 0 }}>
            <Col>Таблица операций</Col>
            <Col>
                <Button
                    size="small"
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => props.setOpen(true)}
                    children="Добавить"
                />
            </Col>
        </Row>}
    >

        <Table
            columns={columns}
            dataSource={data}
            pagination={pagination}
            loading={loading ? { indicator: antIcon } : false}
            onChange={handleTableChange}
            style={{ height: "100%" }}
        // rowKey={console.log}
        />
    </Card>

}

const mapStateToProps = state => ({
    data: state.finance.data,
    pagination: state.finance.pagination,
});

const mapDispatchToProps = {
    setPagination, setData, setOpen
}

export default connect(mapStateToProps, mapDispatchToProps)(FinanceRows);