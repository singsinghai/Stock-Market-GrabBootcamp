import React, { useEffect, useState } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import ApiCaller from "../../../../api/ApiCaller";
import { Loading } from "../../../Loading";
require("highcharts/modules/draggable-points")(Highcharts);



function ColumnChart({ company_symbol }) {

    const [profit_data, setData] = useState(null);
    let options = {}

    const ProfitData = () => {
        const url = `http://139.180.215.250/api/financial-statements/${company_symbol}?format=json`;
        async function fetchData() {
            const res = await ApiCaller(url);
            setData(res)
        }

        useEffect(() => {
            fetchData();
        }, []);
    }
    ProfitData()

    if (profit_data) {
        const data = profit_data.filter((item) => {
            return item.year >= 2022 - 4;
        })

        const yoy_data = profit_data.filter((item) => {
            return item.year >= 2022 - 5;
        })

        const profit = data.map((item) => item.profit_after_taxes / 1000000000);
        let profit_yoy = yoy_data.map(((item) => item.profit_after_taxes / 1000000000));
        const label = data.map((item) => "Q" + item.quarter + "/" + item.year % 2000);

        //Copy
        let temp_yoy = []

        for (let i = 0; i < profit_yoy.length; i++) {
            temp_yoy[i] = profit_yoy[i]
            if (i >= 4) {
                profit_yoy[i] = ((temp_yoy[i] - temp_yoy[i - 4]) / temp_yoy[i - 4] * 100)
            }
        }

        profit_yoy = profit_yoy.slice(4)


        console.log(profit_yoy)
        console.log(profit)
        console.log(label)

        options = {
            xAxis: {
                categories: label,
                tickInterval: 2,
            },
            yAxis: [{
                title: false
            }, {
                opposite: true,
                labels: {
                    format: '{text}%'
                },
                title: false
            }],
            series: [
                {
                    yAxis: 0,
                    name: "Lợi nhuận sau thế công ty mẹ",
                    type: "column",
                    data: profit,
                }, {
                    yAxis: 1,
                    name: "Lợi nhuận sau thuế (YoY)",
                    type: "spline",
                    data: profit_yoy
                }
            ],
            title: {
                text: 'Lợi nhuận - Quý',
                style: {
                    fontFamily: "Segoe UI",
                    fontSize: 14,
                    fontWeight: "bold"
                },
            },
            chart: {
                borderWidth: 1,
                borderColor: 'black',
                borderRadius: 15
            },
        }
    }

    return (
        profit_data ? <HighchartsReact
            constructorType={"chart"}
            highcharts={Highcharts}
            options={options}
        /> : <Loading height="300px" />
    );
}

export default ColumnChart;