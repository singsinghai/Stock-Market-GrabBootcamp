// THIS FILE IS JUST TO TEST THE HIGHCHARTS LIBRARY

import React from "react";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

// Generate custom data to draw chart
const options = {
    chart: {
        type: 'spline'
    },
    title: {
        text: 'My chart'
    },
    series: [
        {
            data: [1, 2, 1, 4, 3, 6]
        }
    ]
};

// Draw a curve line chart to test
const TestChart = () => (
    <div>
        <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
);

export default TestChart;