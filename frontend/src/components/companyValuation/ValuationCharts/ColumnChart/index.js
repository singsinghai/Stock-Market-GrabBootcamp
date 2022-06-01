import React from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import data from "./data.json";
require("highcharts/modules/draggable-points")(Highcharts);



const createColumn = (points) => ({
    xAxis: {
        data: points.map((item) => item.name)
    },
    yAxis: [{},{}],
    series: [
    {
        yAxis: 0,
        name: "column",
        type: "column",
        data: points.map((item) => item.x)
    },
    {
        yAxis: 1,
        name: "line",
        type: "spline",
        data: points.map((item) => item.y)
    }
    ]
})

function ColumnChart() {
    const optionColumn = createColumn(data)
    return (
        <HighchartsReact
          constructorType={"chart"}
          highcharts={Highcharts}
          options={optionColumn}
        />
    );
}

export default ColumnChart;