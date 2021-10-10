import React from "react";
import axios from "./../system/axios";
import moment from 'moment';
import { Table } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const PAGE_SIZE = 10;
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const Main = props => {

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
    const [pagination, setPagination] = React.useState({
        current: 1,
        pageSize: PAGE_SIZE,
    });
    const [data, setData] = React.useState([]);

    React.useEffect(() => {
        fetch(pagination);
    }, []);

    const getParams = React.useCallback(params => ({
        results: params.pageSize,
        page: params.current,
        ...params,
    }));

    const fetch = params => {

        setLoading(true);

        axios.post('getFinance', getParams(params)).then(({ data }) => {
            setData(data.data.map(row => ({ ...row, key: row.id })));
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

    return <div className="site-layout-background" style={{ padding: "1rem 1rem 0" }}>
        <Table
            columns={columns}
            dataSource={data}
            pagination={pagination}
            loading={loading ? { indicator: antIcon } : false}
            onChange={handleTableChange}
        // rowKey={console.log}
        />
    </div>

}

export default Main;