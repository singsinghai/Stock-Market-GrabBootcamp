// THIS FILE IS JUST TO TEST THE HIGHCHARTS LIBRARY

import React from "react";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import data from "./response.json"

function TestChart() {
    const dateToString = date => date.toDateString().slice(4); //Cắt mất cái days in week (Mon, Tue, Wed,...)
    const DATE_SPLIT = 30;


    // Ép kiểu cho date về dạng datetime
    data = data.map(item => ({
        ...item,
        date: new Date(item.date)
    }));

    // Sort theo date từ ngày xa nhất tới ngày gần nhất
    data.sort((a, b) => a.date - b.date);

    const options = {
        
        title: { text: 'Open Price vs Average Price over time' },
        subtitle: { text: 'Yor Forger No.1' },
        xAxis: {
            categories: data.map(item => dateToString(item.date)),//data.map(r => r).reverse().map((item, i) => i % DATE_SPLIT === 0 ? dateToString(item.date) : '').reverse()
            tickInterval: DATE_SPLIT
        },
        yAxis: {
            type: 'logarithmic'
        },
        series: [
            // {
            //     name: 'Price Average',
            //     data: data.map(item => item.priceAverage)
            // }, 
            {
                type: 'area',
                name: 'Price Open',
                data: data.map(item => item.priceOpen)
            }
        ]
    };

    return (
        <HighchartsReact highcharts={Highcharts} options={options} />
    );
}


export default TestChart;