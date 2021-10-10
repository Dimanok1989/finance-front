import React from "react";

import { Row, Col } from 'antd';
import FinanceRows from "./Finances/FinanceRows";
import FinancesChart from "./Finances/FinancesChart";

const Main = props => {

    return <div className="grid-content">
        <FinancesChart />
        <Row gutter={12}>
            <Col span={24}><FinanceRows /></Col>
        </Row>
    </div>

}

export default Main;