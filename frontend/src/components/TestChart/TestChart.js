// THIS FILE IS JUST TO TEST THE HIGHCHARTS LIBRARY

import React from "react";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import data from "./response.json"

function TestChart() {
    const dateToString = date => date.toDateString().slice(4);
    const DATE_SPLIT = 10;

    data = data.map(item => ({
        ...item,
        date: new Date(item.date)
    }));

    data.sort((a, b) => a.date - b.date);

    const options = {
        title: { text: 'Open Price vs Average Price over time' },
        subtitle: { text: 'Yor Forger No.1' },
        xAxis: {
            categories: data.reverse().map((item, i) => i % DATE_SPLIT === 0 ? dateToString(item.date) : '').reverse()
        },
        series: [
            {
                name: 'Price Average',
                data: data.map(item => item.priceAverage)
            }, 
            {
                name: 'Open Average',
                data: data.map(item => item.priceOpen)
            }
        ]
    };

    return (
        <HighchartsReact highcharts={Highcharts} options={options} />
    );
}


export default TestChart;