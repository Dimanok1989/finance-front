import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const Loader = props => {

    if (typeof props.active != "undefined" && !props.active)
        return null;

    const antIcon = <LoadingOutlined style={{ fontSize: props.width || 24 }} spin />;

    return <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: props.inverted ? "rgba(255, 255, 255, 0.45)" : "rgba(0, 0, 0, 0.1)",
    }}><Spin indicator={antIcon} /></div>;

}

export default Loader;