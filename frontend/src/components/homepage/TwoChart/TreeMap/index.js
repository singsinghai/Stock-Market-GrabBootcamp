import React, { useEffect, useState, useMemo, useRef } from "react";
import Highcharts from "highcharts";
import HighchartsData from "highcharts/modules/data";
import HighchartsExporting from "highcharts/modules/exporting";
import HighchartsHeatmap from "highcharts/modules/heatmap";
import HighchartsTreeChart from "highcharts/modules/treemap";
import HighchartsReact from "highcharts-react-official";
import { Loading } from "../../../Loading";


HighchartsData(Highcharts);
HighchartsHeatmap(Highcharts);
HighchartsTreeChart(Highcharts);
HighchartsExporting(Highcharts);

const months = ['01','02','03','04','05','06','07','08','09','10','11','12']
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
                    formatter: function () {
                        if (this.point.shapeArgs) {
                            if (this.point.shapeArgs.width > this.point.name.length * 6 && this.point.shapeArgs.height > 30)
                                return this.point.name
                        }
                    }
                },
                borderWidth: 3,
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
                    formatter: function () {
                        if (this.point.shapeArgs) {
                            if (this.point.shapeArgs.width > this.point.name.length * 9 && this.point.shapeArgs.height > 30)
                                return this.point.name + '<br>' + this.point.change + '%'
                        }
                    }
                },
                borderWidth: 1,
            }
            ],
            data: points,
            borderRadius: '1%',
            borderWidth: 10,
            name: 'Thị trường'
        }
    ],
    tooltip: {
        pointFormat: "<b>{point.name}:</b>  {point.value}"
    },
    subtitle: false,
    title: false,
    exporting: false,
    credits: false,
    chart: {
		backgroundColor: '#f5f5f5',
    }
});

// code start from here
function TreeMap() {
    const chartComponent = useRef(null);
    let url = 'http://139.180.215.250/api/stock-price/all/';
    let d = new Date()
    // 60 * 60 * 1000 means 1 hour 
    // if you are in 0:00 to 9:15 AM you don't have any data from today because the first trade from 9:15 AM
    // there is a delay in data update too
    // so I decrease 10 hours 
    d.setTime(d.getTime() - 60 * 60 * 1000 * 10) 
    url += d.getFullYear() +'-'+months[d.getMonth()]+'-'+d.getDate()
    const [points, setPoints] = useState([]);
    const chartOptions = useMemo(() => createChartOptions(points), [points]);
    useEffect(() => {
        fetch(url)
            .then(result => result.json())
            .then(data => {
                var industryI = 0,
                    industry,
                    industryVal,
                    idx,
                    points = []

                for (industry in data) {
                    industryVal = 0
                    for (idx in data[industry]) {
                        var col = "#17803d";
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
                        id: 'industry_' + industryI,
                        name: industry,
                        color: 'rgba(23, 128, 61, 0)',
                        value: industryVal
                    })
                    industryI++;
                }
                setPoints(points);
            });
    }, [])

    return (
        points.length === 0?
        <Loading />
        : <div>
            <HighchartsReact ref={chartComponent} highcharts={Highcharts} options={chartOptions} />
        </div>
    );
}


export default TreeMap;

