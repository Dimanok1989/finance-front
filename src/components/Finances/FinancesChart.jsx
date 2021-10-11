import React from "react";
import { Row, Col, Card } from 'antd';
import moment from "moment";
import axios from "./../../system/axios";
import { connect } from "react-redux";
import { chartMonthsData, chartYearsData } from "./../../store/finances/actions";

import ChartMonths from "./ChartMonths";
import ChartYears from "./ChartYears";

const Chart = props => {

    const [loading, setLoading] = React.useState(true);
    const { months, chartMonthsData } = props;
    const { years, chartYearsData } = props;

    React.useEffect(() => {

        const getMonth = month => {
            let text = moment(month).format("MMM YYYY");
            return text[0].toUpperCase() + text.slice(1);
        }

        setLoading(true);

        axios.post('getFinanceStat').then(({ data }) => {
            chartMonthsData(data.salary.map(row => ({ ...row, month: getMonth(row.month) })));
            chartYearsData(data.years);
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

const mapStateToProps = state => ({
    months: state.finance.chartMonths,
    years: state.finance.chartYears,
});

const mapDispatchToProps = {
    chartMonthsData, chartYearsData
}

export default connect(mapStateToProps, mapDispatchToProps)(Chart);
