import React from "react";
import { Column } from '@antv/g2plot';

const ChartMonths = props => {

    const content = React.useRef();
    const { data } = props;

    React.useEffect(() => {

        const columnPlot = new Column(content.current, {
            data: data,
            xField: 'month',
            yField: 'summa',
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

        columnPlot.render();

        return () => {
            columnPlot.destroy();
        }

    }, [data])

    return <div ref={content}></div>

}

export default ChartMonths;