import React, { useEffect, useState, useMemo } from "react";
import Highcharts from "highcharts";
import HighchartsData from "highcharts/modules/data";
import HighchartsExporting from "highcharts/modules/exporting";
import HighchartsHeatmap from "highcharts/modules/heatmap";
import HighchartsTreeChart from "highcharts/modules/treemap";
import HighchartsReact from "highcharts-react-official";
import data from "./todayPrice.json"

HighchartsData(Highcharts);
HighchartsHeatmap(Highcharts);
HighchartsTreeChart(Highcharts);
HighchartsExporting(Highcharts);

// option for treemap
const createChartOptions = (points) => ({
  series: [
    {
      type: "treemap",
      layoutAlgorithm: "squarified",
      allowDrillToNode: true,
      animation: true,
      dataLabels: {
        enabled: true,
      },
      levelIsConstant: true,
      levels: [{
                     level: 1,
                     dataLabels: {
                        enabled: true,
                        inside: false,
                        y: 10,
                        allowOverlap: false,
                        backgroundColor: 'white',
                        filter: {
                          property: 'value',
                          operator: '>',
                          value: 1
                        },
                        align: "left",
                        color: 'black'
                      },
                      borderWidth: 3
                    
       }],
      data: points
    }
  ],
  subtitle: false,
  title: false,
  exporting: false,
  credits: false,
  chart:{
    height: 300
  }
});

// code start from here
function TreeMap() {
  const [points, setPoints] = useState([]);
  const chartOptions = useMemo(() => createChartOptions(points), [points]);
  // useEffect will be used when having the endpoint API
  useEffect(() => {
    var idx;
    for (idx in data) {
      var col ="#198754"
      var val = data[idx].priceClose - data[idx].priceOpen
      if (val < 0) {
        col = "#dc3545"
        val = -val
      }
      var symbol = {
        id: idx,
        name: data[idx].symbol,
        color: col,
        value: val
      }
      points.push(symbol)
    }
    setPoints(points)
  })
  
  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
}


export default TreeMap;

