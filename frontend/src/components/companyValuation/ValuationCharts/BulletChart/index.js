import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

require("highcharts/modules/bullet")(Highcharts);

function BulletChart() {
  const options = {
    chart: {
      type: "bullet",
      height: 250,
      inverted: "true",
    },
    title: {
      text: "Giá trị nội tại",
      style: {
        fontFamily: "Segoe UI",
        fontSize: 14,
        fontWeight: "bold",
      },
    },
    xAxis: {
      type: "linear",
      categories: [
        "<span>Giá trị cổ phiếu hiện tại</span>",
        "<span>Mức định giá</span>",
      ],
    },

    yAxis: {
      plotBands: [
        {
          from: 0,
          to: 60000,
          color: "#378a34",
        },
        {
          from: 60000,
          to: 140000,
          color: "#dec62c",
        },
        {
          from: 140000,
          to: 200000,
          color: "#b3331d",
        },
      ],
      max: 200000,
    },
    series: [
      {
        data: [
          {
            y: 50000,
          },
          {
            y: 100000,
          },
        ],
        showInLegend: false,
      },
      {
        data: [],
        name: "Vùng giá hấp dẫn",
      },
      {
        data: [],
        name: "Mức định giá +/- 20%",
      },
      {
        data: [],
        name: "Vùng giá cao",
      },
    ],
    tooltip: {
      pointFormat: "<b>Giá trị cổ phiếu hiện tại {point.y}</b>",
    },
    colors: ["#666", "#378a34", "#dec62c", "#b3331d"],
  };

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
      className="h-50"
    />
  );
}

export default BulletChart;
