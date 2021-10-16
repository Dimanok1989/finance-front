import React from "react";
import axios from "./system/axios";
import { BrowserRouter } from "react-router-dom";

import { connect } from "react-redux";
import { setIsLogin, setUserData } from "./store/actions";
import { setOpen as setOpenFinance } from "./store/finances/actions";

import { Layout, Menu, Result } from "antd";
import { Loader } from "./components/UI";
import FinanceModal from "./components/Add/FinanceModal";

import { ConfigProvider } from 'antd';
import 'moment/locale/ru';
import locale from 'antd/es/date-picker/locale/ru_RU';

import Routes from "./routes";
import Authrization from "./components/Authrization";

const App = props => {

    // console.log(props)

    const { isLogin, setIsLogin, setUserData } = props;
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(false);
    const [errorStatus, setErrorStatus] = React.useState(null);

    const { Header, Content } = Layout;

    React.useEffect(() => {

        setLoading(true);

        axios.post("user").then(({ data }) => {
            setIsLogin(true);
            setUserData(data.user);
            setError(null);
        }).catch(error => {

            if (error?.response?.status === 401)
                return;

            setError(axios.getError(error));
            setErrorStatus(error?.response?.status || null);

        }).then(() => {
            setLoading(false);
        });

    }, []);

    if (loading)
        return <Loader inverted />

    if (error) {
        return <Result
            status="error"
            title={errorStatus || "Ошибка"}
            subTitle={error}
        />
    }

    if (!isLogin)
        return <Authrization {...props} />;

    return <ConfigProvider locale={locale}>
        <BrowserRouter>

            <FinanceModal />

            <Layout style={{ minHeight: '100vh' }}>

                <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                    <div className="logo">KOLGAEV</div>
                    <Menu theme="dark" selectable={false} mode="horizontal">
                        {/* <Menu.Item key="1" onClick={() => props.setOpenFinance(true)}>
                            Добавить
                        </Menu.Item> */}
                    </Menu>
                </Header>

                <Content className="site-layout" style={{ padding: '50px 50px 0', marginTop: 64 }}>
                    <Routes />
                </Content>

            </Layout>

        </BrowserRouter>
    </ConfigProvider>

}

const mapStateToProps = state => ({
    isLogin: state.main.isLogin,
    isBlock: state.main.isBlock,
    user: state.main.user,
});

const mapDispatchToProps = {
    setIsLogin, setUserData, setOpenFinance
}

export default connect(mapStateToProps, mapDispatchToProps)(App);