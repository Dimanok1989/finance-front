import React from "react";
import { Column } from '@antv/g2plot';

const ChartYears = props => {

    const content = React.useRef();
    const { data } = props;

    React.useEffect(() => {

        const columnPlot = new Column(content.current, {
            data: data,
            xField: 'year',
            yField: 'summa',
            seriesField: 'type',
            isStack: true,
            legend: false,
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
                year: {
                    alias: 'Год',
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

export default ChartYears;