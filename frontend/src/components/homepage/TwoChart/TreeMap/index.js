import React, { useEffect, useState, useMemo } from "react";
import Highcharts from "highcharts";
import HighchartsData from "highcharts/modules/data";
import HighchartsExporting from "highcharts/modules/exporting";
import HighchartsHeatmap from "highcharts/modules/heatmap";
import HighchartsTreeChart from "highcharts/modules/treemap";
import HighchartsReact from "highcharts-react-official";

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
      style: {
        fontFamily: 'Segoe UI'
      },
      allowDrillToNode: true,
      animation: true,
      dataLabels: {
        enabled: true,
      },
      levelIsConstant: true,
      levels: [{
                level: 1,
                dataLabels: {
                  style: {
                    fontFamily: 'Segoe UI'
                  },
                  enabled: true,
                  inside: false,
                  y: 13,
                  backgroundColor: 'white',
                  align: "left",
                  color: 'black',
                  formatter: function(){
                    console.log(this.point.shapeArgs, this.point.name)
                    if(this.point.shapeArgs){
                      if(this.point.shapeArgs.width > this.point.name.length * 6 && this.point.shapeArgs.height > 30)
                        return this.point.name
                    }
                  }
                },
                borderWidth: 2,
              },
              {
                level: 2,
                dataLabels: {
                  style: {
                    fontFamily: 'Segoe UI',
                    textOutline: false,
                    fontWeight: 600,
                  },
                  color: '#f5f5f5',
                  enabled: true,
                  // format: '{name} <br> {change}',
                  formatter: function (){
                    if(this.point.shapeArgs){
                      if(this.point.shapeArgs.width > this.point.name.length * 9 && this.point.shapeArgs.height > 30)
                        return this.point.name + '<br>' + this.point.change + '%'
                    }
                  }
                },
                 
                borderWidth: 1,
                 
              }
      ],
      data: points
    }
  ],
  tooltip:{
    pointFormat: "<b>{point.name}:</b>  {point.value}"
  },
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
  useEffect(() => {
    fetch('http://139.180.215.250/api/stock-price/all/2022-05-31')
    .then(result => result.json())
    .then(data => {
      var industryI = 0,
          industry,
          industryVal,
          idx,
          points = []
      
      for (industry in data) {
        industryVal = 0
        for(idx in data[industry]){
          var col ="#17803d";
          var val = Math.round((data[industry][idx].price_close - data[industry][idx].price_open) * 100) / 100;
          if (val < 0) {
            col = "#b91C1b";
            val = -val;
          }
          if (val === 0) {
            col = "#777777";
          }
          industryVal += data[industry][idx].total_value;
          points.push({
            id: 'symbol_' + idx + '_' + industryI,
            name: data[industry][idx].symbol,
            change: val,
            parent: 'industry_' + industryI,
            color: col,
            value: data[industry][idx].total_value
          })
        }  
        points.push({
          id : 'industry_' + industryI,
          name: industry,
          color: 'rgba(23, 128, 61, 0)',
          value: industryVal
        })
        industryI++;
      }
      setPoints(points);
    })
  }, [])
  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
}


export default TreeMap;

