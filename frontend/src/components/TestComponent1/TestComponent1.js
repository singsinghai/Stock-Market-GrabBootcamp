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
const COLORS = [
  "#4db6ac",
  "#9575cd",
  "#64b5f6",
  "#f06292",
  "#4db6ac",
  "#9575cd",
  "#64b5f6",
  "#f06292"
];

// option for treemap
const createChartOptions = (points) => ({
  series: [
    {
      type: "treemap",
      layoutAlgorithm: "squarified",
      allowDrillToNode: true,
      animation: false,
      dataLabels: {
        enabled: false
      },
      levelIsConstant: false,
      levels: [{
                     level: 1,
                     dataLabels: {
                        enabled: true
                      },
                      borderWidth: 10,
                      borderColor: 'black'
                    
       },
        {
          level: 2,
          borderWidth: 3
        }
      ],
      data: points
    }
  ],
  subtitle: false,
  title: false,
  exporting: false,
  credits: false
});

// code start from here
function TestComponent1() {
  const [points, setPoints] = useState([]);
  const chartOptions = useMemo(() => createChartOptions(points), [points]);
  // fetch data from another web to test tree map
  useEffect(() => {
    fetch(
      "https://cdn.jsdelivr.net/gh/highcharts/highcharts@v7.0.0/samples/data/world-mortality.json"
    )
      .then((result) => result.json())
      .then((data) => {
        var points = [],
          regionP,
          regionVal,
          regionI = 0,
          countryP,
          countryI,
          region,
          country
        // format data for tree map
        for (region in data) {
          if (data.hasOwnProperty(region)) {
            var regionVal = 0;
            regionP = {
              id: "id_" + regionI,
              name: region,
              color: COLORS[regionI],
              value: 0
            };
            countryI = 0;
            for (country in data[region]) {
              if (data[region].hasOwnProperty(country)) {
                countryP = {
                  id: regionP.id + "_" + countryI,
                  name: country,
                  parent: regionP.id,
                  color: COLORS[countryI % 7],
                  value: data[region][country]['Injuries']
                };
                points.push(countryP);
                regionVal += countryP.value;
                countryI = countryI + 1;
              }
            }
            regionP.value = Math.round(regionVal / countryI);
            points.push(regionP);
            regionI = regionI + 1;
          }
        }
        setPoints(points);
      });
  }, []);

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
}

export default TestComponent1;

