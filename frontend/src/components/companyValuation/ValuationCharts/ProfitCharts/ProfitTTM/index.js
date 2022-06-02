import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
require("highcharts/modules/draggable-points")(Highcharts);

function ProfitTTM({ profit_TTM, profit_yoy_TTM, label }) {

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
                data: profit_TTM
            }, {
                yAxis: 1,
                name: "Lợi nhuận sau thuế (YoY)",
                type: "spline",
                data: profit_yoy_TTM
            }
        ],
        title: {
            text: 'Lợi nhuận - TTM',
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

export default ProfitTTM;