import React from "react";
import axios from "./../system/axios";
import { Card, Form, Input, Button, Alert } from "antd";
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Loader from "./UI/Loader";

const Auth = props => {

    const [load, setLoad] = React.useState(false);
    const [error, setError] = React.useState(false);

    const onFinish = (values) => {

        setLoad(true);

        axios.post('/login', values).then(({ data }) => {

            let key = process.env.REACT_APP_TOKEN_KEY || "access_token";
            localStorage.setItem(key, data.token);

            props.setUserData(data.user);
            props.setIsLogin(true);

        }).catch(error => {
            setError(axios.getError(error));
            setLoad(false);
        });

    };

    return <div style={{
        margin: "5rem auto",
        maxWidth: 300,
    }}>
        <Card title="Авторизация" style={{ position: "relative" }}>

            <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >

                <Form.Item
                    name="email"
                    rules={[{ required: true, message: 'Укажите адрес почты' }]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="E-mail" />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Укажите пароль' }]}
                >
                    <Input.Password
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Пароль"
                    />
                </Form.Item>

                <Form.Item style={{ marginBottom: 0 }}>
                    <Button type="primary" htmlType="submit" className="login-form-button">Авторизоваться</Button>
                </Form.Item>
            </Form>

            <Loader inverted active={load} />

        </Card>

        {error
            ? <Alert message={error} type="error" style={{ marginTop: "1rem" }} showIcon />
            : null
        }

    </div>;

}

export default Auth;