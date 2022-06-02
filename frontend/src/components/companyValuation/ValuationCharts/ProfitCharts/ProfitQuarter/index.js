import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
require("highcharts/modules/draggable-points")(Highcharts);



function ProfitQuarter({ profit, profit_yoy, label }) {

    const options = {
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


    return (
        <HighchartsReact
            constructorType={"chart"}
            highcharts={Highcharts}
            options={options}
        /> 
    );
}

export default ProfitQuarter;