import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsMore from 'highcharts/highcharts-more';

HighchartsMore(Highcharts);

export const IndustryBoxPlot = () => {
    function getPercentile(data, percentile) {
        data.sort();
        var index = (percentile / 100) * data.length;
        var result;
        if (Math.floor(index) == index) {
            result = (data[(index - 1)] + data[index]) / 2;
        } else {
            result = data[Math.floor(index)];
        }
        return result;
    }

    function getBoxValues(data) {
        let boxData = {},
            q1 = getPercentile(data, 25),
            median = getPercentile(data, 50),
            q3 = getPercentile(data, 75),
            iqr = q3 - q1,
            lowerFence = q1 - (iqr * 1.5),
            upperFence = q3 + (iqr * 1.5),
            outliers = [];

        for (var i = 0; i < data.length; i++) {
            if (data[i] < lowerFence || data[i] > upperFence) {
                outliers.push([0, data[i]]);
            }
        };

        boxData.values = {
            low: lowerFence,
            q1: q1,
            median: median,
            q3: q3,
            high: upperFence
        };

        boxData.outliers = outliers;
        return boxData;
    }

    const boxData = getBoxValues([2.5, 22, 10, 11, 12, 13, 14, 15, 14, 13, 12, 12, 13, 14, 15, 11, 12, 13, 14, 15, 11, 12, 13, 14, 15, 19, 18, 4, 6, 15, 16, 2, 14].sort())

    const options = {
        chart: {
            type: "boxplot",
            height: "300px",
            width: 400
        },

        title: {
            text: 'Biên an toàn các công ty cùng ngành',
            style: {
                fontFamily: "Segoe UI",
                fontSize: 14,
                fontWeight: "bold"
            }
        },

        legend: {
            enabled: false
        },

        xAxis: {
            categories: '1',
            // title: {
            //     text: 'Experiment No.'
            // }
        },

        yAxis: {
            title: {
                text: ''
            },
        },

        series: [{
            name: 'Observations',
            data: [boxData.values],
            tooltip: {
                headerFormat: '<em>Experiment No {point.key}</em><br/>'
            },
            pointWidth: 50,
            color: "black",
            fillColor: "gray"
        }, {
            name: 'Outliers',
            color: "red",
            type: 'scatter',
            data: boxData.outliers,// x, y positions where 0 is the first category

            marker: {
                fillColor: "violet",
                lineWidth: 1,
                lineColor: "purple"
            },
            tooltip: {
                pointFormat: 'Observation: {point.y}'
            }
        }]
    }
    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={options}
        />
    );
}
