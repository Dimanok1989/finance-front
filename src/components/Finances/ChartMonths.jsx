import React from "react";
import { Column } from '@antv/g2plot';

const ChartMonths = props => {

    const content = React.useRef();
    const plot = React.useRef();
    const { data } = props;

    React.useEffect(() => {
        plot.current && plot.current.changeData([...data]);
    }, [data]);

    React.useEffect(() => {

        plot.current = new Column(content.current, {
            data: data,
            xField: 'month',
            yField: 'summa',
            animation: "scale-in-y",
            label: {
                autoRotate: true,
            },
            xAxis: {
                label: {
                    autoHide: true,
                    autoRotate: false,
                },
            },
            meta: {
                month: {
                    alias: 'Месяц',
                },
                summa: {
                    alias: 'Сумма',
                },
            },
        });

        plot.current.render();

        return () => {
            plot.current.destroy();
        }

    }, [])

    return <div ref={content}></div>

}

export default ChartMonths;