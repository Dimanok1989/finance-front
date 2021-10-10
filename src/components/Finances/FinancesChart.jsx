import React from "react";
import { Row, Col, Card } from 'antd';
import moment from "moment";
import axios from "./../../system/axios";

import ChartMonths from "./ChartMonths";
import ChartYears from "./ChartYears";

const Chart = () => {

    const [loading, setLoading] = React.useState(true);
    const [months, setMonths] = React.useState([]);
    const [years, setYears] = React.useState([]);

    React.useEffect(() => {

        const getMonth = month => {
            let text = moment(month).format("MMM YYYY");
            return text[0].toUpperCase() + text.slice(1);
        }

        setLoading(true);

        axios.post('getFinanceStat').then(({ data }) => {
            setMonths(data.salary.map(row => ({ ...row, month: getMonth(row.month) })));
            setYears(data.years);
        }).catch(error => {

        }).then(() => {
            setLoading(false);
        });

    }, []);

    return <Row gutter={12}>
        <Col span={12}>
            <Card style={{ minHeight: 450 }} loading={loading} title="Сумма за месяц">
                {loading ? null : <ChartMonths data={months} />}
            </Card>
        </Col>
        <Col span={12}>
            <Card style={{ minHeight: 450 }} loading={loading} title="Сумма за год">
                {loading ? null : <ChartYears data={years} />}
            </Card>
        </Col>
    </Row>

}

export default Chart;