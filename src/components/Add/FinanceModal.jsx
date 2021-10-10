import React from "react";
import { connect } from "react-redux";
import { setOpen } from "./../../store/finances/actions";
import axios from "./../../system/axios";

import 'moment/locale/ru';
import locale from 'antd/es/date-picker/locale/ru_RU';

import { Modal, Form, DatePicker, InputNumber, message } from "antd";
import { Loader } from "./../UI";

const FinanceModal = props => {

    const { open, setOpen } = props;
    const [formdata, setFormdata] = React.useState({});
    const [save, setSave] = React.useState(false);
    const [form] = Form.useForm();

    const changeData = (name, value) => setFormdata({ ...formdata, [name]: value });

    const onChangeDate = params => {

        let format = "YYYY-MM-DD";
        let name = params[2];

        switch (name) {
            case "month": format = "YYYY-MM"; break;
            default: format = "YYYY-MM-DD"; break;
        }

        let value = params[0].format(format);

        changeData(name, value);

    }

    const onCheck = () => {
        form.validateFields().then(() => {
            setSave(true);
        }).catch(() => {
            message.error("Заполните все поля правильно");
        });
    };

    React.useEffect(() => {

        if (save) {

            axios.post('saveFinance', formdata).then(({ data }) => {
                setOpen(false);
                console.log(data);
            }).catch(error => {
                message.error(axios.getError(error));
            }).then(() => {
                setSave(false);
            });

        }

    }, [save]);

    React.useEffect(() => {
        if (!open) {
            setTimeout(() => {
                setFormdata({});
                setSave(false);
                form.resetFields();
            }, 300);
        }
    }, [open]);

    return <>

        <Modal
            title="Добавить операцию"
            centered
            visible={open}
            onOk={() => onCheck()}
            okText="Сохранить"
            onCancel={() => setOpen(false)}
            cancelText="Отмена"
            okButtonProps={{
                disabled: save,
            }}
        >
            <Form
                name="add_finance"
                layout="vertical"
                style={{ position: "relative" }}
                form={form}
            >

                <Form.Item
                    name="month"
                    label="Отчетный месяц"
                    rules={[
                        {
                            required: true,
                            message: 'Укажите отчетный месяц',
                        },
                    ]}
                >
                    <DatePicker
                        picker="month"
                        locale={locale}
                        format={"YYYY MMM"}
                        onChange={(...a) => onChangeDate([...a, "month"])}
                        style={{ width: "100%" }}
                    />
                </Form.Item>

                <Form.Item
                    name="date"
                    label="Дата операции"
                    rules={[
                        {
                            required: true,
                            message: 'Укажите дату операции',
                        },
                    ]}
                >
                    <DatePicker
                        picker="date"
                        locale={locale}
                        format={"DD.MM.YYYY"}
                        onChange={(...a) => onChangeDate([...a, "date"])}
                        style={{ width: "100%" }}
                    />
                </Form.Item>

                <Form.Item
                    name="summa"
                    label="Сумма операции"
                    rules={[
                        {
                            required: true,
                            message: 'Укажите сумму операции',
                        },
                    ]}
                >
                    <InputNumber
                        step={0.01}
                        formatter={value => `₽ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={value => value.replace(/\₽\s?|(,*)/g, '')}
                        onChange={value => changeData("summa", value)}
                        style={{ width: "100%" }}
                    />
                </Form.Item>

                <Loader inverted active={save} />

            </Form>
        </Modal>

    </>

}

const mapStateToProps = state => ({
    open: state.finance.open,
});

const mapDispatchToProps = {
    setOpen
}

export default connect(mapStateToProps, mapDispatchToProps)(FinanceModal);