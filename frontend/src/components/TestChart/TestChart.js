// THIS FILE IS JUST TO TEST THE HIGHCHARTS LIBRARY

import React from "react";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import data from "./stockMarketHistoryPrice.json"

// The requirements to save the chart into CSV, PNG, PDF,...
require('highcharts/modules/exporting')(Highcharts);
require('highcharts/modules/export-data')(Highcharts);
require('highcharts/modules/annotations')(Highcharts);

function TestChart() {
    const dateToString = date => date.toDateString().slice(4); //Hàm để cắt mất cái days in week (Mon, Tue, Wed,...)
    let DATE_SPLIT = 91;
    let COMPANY = "VN-INDEX"


    // Lọc ra nhưng item là VN-INDEX
    data = data.filter((item) => {
        return item.marketSymbol === COMPANY
    })

    // Ép kiểu cho date về dạng datetime
    data = data.map(item => ({
        ...item,
        tradingDate: new Date(item.tradingDate)
    }));

    // Sort theo date từ ngày xa nhất tới ngày gần nhất
    data.sort((a, b) => a.tradingDate - b.tradingDate);

    // Bắt đầu định nghĩa các yếu tố của chart
    const options = {
        chart: {
            zoomType: 'x'
        },

        title: { text: 'Open Price vs Average Price over time' },
        subtitle: { text: 'Yor Forger No.1' },
        xAxis: {
            categories: data.map(item => dateToString(item.tradingDate)),
            tickInterval: DATE_SPLIT
        },

        //Making gradient color looking for the area plot
        plotOptions: {
            area: {
                fillColor: {
                    linearGradient: {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    },
                    stops: [
                        [0, Highcharts.getOptions().colors[0]],
                        [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                    ]
                },
                marker: {
                    radius: 2
                },
                lineWidth: 1,
                states: {
                    hover: {
                        lineWidth: 1
                    }
                },
                threshold: null
            }
        },

        // This is the data to draw in the chart
        series: [
            {
                type: 'area',
                name: 'Price Close',
                data: data.map(item => item.priceClose)
            }
        ],

        // The export button
        exporting: {
            buttons: {
                contextButton: {
                    menuItems: [
                        'viewFullscreen', 'separator', 'downloadPNG',
                        'downloadSVG', 'downloadPDF', 'separator', 'downloadCSV'
                    ]
                },
            },
            enabled: true,
        },
        navigation: {
            buttonOptions: {
                align: 'right',
                verticalAlign: 'top',
                y: 0
            }
        },
    };

    return (
        <HighchartsReact highcharts={Highcharts} options={options} />
    );
}


export default TestChart;