import React from "react";
import { Column } from '@antv/g2plot';

const ChartYears = props => {

    const content = React.useRef();
    const plot = React.useRef();
    const { data } = props;

    React.useEffect(() => {
        plot.current && plot.current.changeData([...data]);
    }, [data]);

    React.useEffect(() => {

        plot.current = new Column(content.current, {
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

        plot.current.render();

        return () => {
            plot.current.destroy();
        }

    }, [])

    return <div ref={content}></div>

}

export default ChartYears;