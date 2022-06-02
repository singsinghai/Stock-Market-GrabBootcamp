import React, { useEffect, useState } from "react";
import ApiCaller from "../../../../../api/ApiCaller";
import { Loading } from "../../../../Loading";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
require("highcharts/modules/draggable-points")(Highcharts);

function Evaluation({ company_symbol }) {
    const [valuation_data, setData] = useState(null);

    const ValuationData = () => {
        const url = `http://139.180.215.250/api/business-valuation/${company_symbol}?format=json`;
        async function fetchData() {
            const res = await ApiCaller(url);
            setData(res)
        }

        useEffect(() => {
            fetchData();
        }, []);
    }
    ValuationData();

    let options = null;

    if (valuation_data) {
        const data = valuation_data.filter((item) => {
            return item.year >= 2022 - 4;
        })

        options = {
            
            title: {
                text: 'Biên lãi - Quý',
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

            subtitle: {
                text: 'Source: thesolarfoundation.com'
            },

            yAxis: {
                labels: {
                    format: '{text}%'
                },
            },

            xAxis: {
                categories: data.map((item) => "Q" + item.quarter + "/" + item.year % 2000),
                tickInterval: 2,
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
                name: 'Biên lãi gộp',
                data: data.map((item) => item.gross_margin * 100),
                type: "spline"
            }, {
                name: 'Biên lãi thuần',
                data: data.map((item) => item.profit_margin * 100),
                type: "spline"
            }, {
                name: 'Biên lãi trước thuế',
                data: data.map((item) => item.pretax_profit_margin * 100),
                type: "spline"
            }, {
                name: 'Biên lãi trước thuế',
                data: data.map((item) => item.pretax_profit_margin * 100),
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