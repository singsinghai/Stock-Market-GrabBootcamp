// THIS FILE IS JUST TO TEST THE HIGHCHARTS LIBRARY

import React from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from 'highcharts-react-official';


// The requirements to save the chart into CSV, PNG, PDF,...
require('highcharts/modules/exporting')(Highcharts);
require('highcharts/modules/export-data')(Highcharts);
require('highcharts/modules/annotations')(Highcharts);

function MarketPriceChart ({ data, current_market }) {

    let by_market = data.filter((item) => {
        return item.market_symbol === current_market
    })

    // trading_date được sếp từ ngày gần nhất, để tiện cho visualize,
    // ta phải sort nó theo chiều ngược lại
    by_market = by_market.map(item => ({
        ...item,
        trading_date: new Date(item.trading_date).getTime()
    }));

    by_market.sort((a, b) => a.trading_date - b.trading_date);

    // Map các cột dữ liệu json thành ma trận 
    let trading_date = by_market.map(item => item.trading_date)
    let price_close = by_market.map(item => item.price_close)

    let chart_data = trading_date.map((item, i) => [item, price_close[i]])

    // Bắt đầu định nghĩa các yếu tố của chart
    const options = {
        chart: {
            zoomType: 'x',
            height: 350,
        },

        title: {
            text: 'Diễn biến thị trường ' + current_market,
            style: {
                fontFamily: "Segoe UI",
                fontWeight: "bold"
            }
        },
        xAxis: {
            type: "datetime"
        },

        legend: {
            enabled: false
        },

        rangeSelector: {
            selected: 1
        },

        // Making gradient color looking for the area plot
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
                type: "area",
                name: 'Price Close',
                data: chart_data
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


    };



    return (
        <HighchartsReact
            highcharts={Highcharts}
            constructorType={"stockChart"}
            options={options}
        />
    );
}

export default MarketPriceChart;