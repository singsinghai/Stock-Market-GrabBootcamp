import React, { useEffect, useState } from "react";
import ApiCaller from "../../../../../api/ApiCaller";
import { Loading } from "../../../../Loading";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
require("highcharts/modules/draggable-points")(Highcharts);

function Evaluation({ company_symbol, businessValue}) {
    let options = null;
    const valuation_data = businessValue
    function compare( a, b ) {
        if ( a.year < b.year ){
          return -1;
        }
        if ( a.year > b.year ){
          return 1;
        }
        else{
            if ( a.quarter < b.quarter ){
                return -1;
            }
            if ( a.quarter > b.quarter ){
                return 1;
            }
        }
        return 0;
      }
    valuation_data.sort(compare)
    if (valuation_data) {
        const data = valuation_data.filter((item) => {
            return item.year >= 2022 - 4;
        })
        console.log('a',data)

        options = {
            
            title: {
                text: 'Định giá - TTM',
                style: {
                    fontFamily: "Segoe UI",
                    fontSize: 14,
                    fontWeight: "bold"
                }
            },

            chart: {
                borderWidth: 1,
                borderColor: 'black',
                borderRadius: 15
            },

            yAxis: [{
                labels: {
                    format: '{text}%'
                },
            }],

            xAxis: {
                categories: data.map((item) => "Q" + item.quarter + "/" + item.year % 2000),
                tickInterval: 2,
                labels: {
                    formatter: function(){
                        console.log(this)
                        return this.axis.categories[Math.round((this.pos - 2010))]   
                    }
                },
            },

            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },

            plotOptions: {
                series: {
                    label: {
                        connectorAllowed: false
                    },
                    pointStart: 2010
                }
            },
            series: [{
                yAxis: 0,
                name: 'P/B',
                data: data.map((item) => item.price_to_book),
                type: "spline"
            }, {
                yAxis: 0,
                name: 'P/E',
                data: data.map((item) => item.price_earnings),
                type: "spline"
            }, {
                yAxis: 0,
                name: 'EV/EBITDA',
                data: data.map((item) => item.ev_over_ebitda),
                type: "spline"
            }, {
                yAxis: 0,
                name: 'EV/EBIT',
                data: data.map((item) => item.ev_over_ebit),
                type: "spline"
            }],

            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom'
                        }
                    }
                }]
            },
        }
    }

    return (
        valuation_data ?
            <HighchartsReact
                constructorType={"chart"}
                highcharts={Highcharts}
                options={options}
            /> : <Loading height="300px" />
    )
}

export default Evaluation;