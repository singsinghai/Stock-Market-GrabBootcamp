import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import ApiCaller from "../../../../api/ApiCaller";
import { Loading } from "../../../Loading";

require("highcharts/modules/bullet")(Highcharts);

function BulletChart({company_symbol}) {

  // const [data, setData] =useState(null);
  // let options = null 

  // const GetData = () => {
  //     const url = `http://139.180.215.250/api/business-valuation/${company_symbol}?format=json`;
  //     async function fetchData() {
  //         const res = await ApiCaller(url);
  //         setData(res)
  //     }

  //     useEffect(() => {
  //         fetchData();
  //     }, []);
  // }
  //GetData();
  let options = null 
  let mean, price_close = null
  let data = {mean: 98145, price_close: 67500 }
  if (data) {
    // const company = data.filter((item) => {
    //   return item.company === company_symbol
    // })

    mean = data.mean
    price_close = data.price_close

    options = {
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
            to: mean - mean * 0.2,
            color: "#378a34",
          },
          {
            from: mean - mean * 0.2,
            to: mean + mean * 0.2,
            color: "#dec62c",
          },
          {
            from: mean + mean * 0.2,
            to: 2 * mean,
            color: "#b3331d",
          },
        ],
        max: 2 * mean,
      },
      series: [
        {
          data: [
            {
              y: price_close,
            },
            {
              y: mean,
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
  }



  

  return (
    data ? <HighchartsReact
      highcharts={Highcharts}
      options={options}
      className="h-50"
    /> : <Loading />
  ); 
}

export default BulletChart;
