import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsMore from 'highcharts/highcharts-more';
import ApiCaller from '../../../../api/ApiCaller';
import { Loading } from '../../../Loading';

HighchartsMore(Highcharts);

function IndustryBoxPlot() {
    const [industry_data, setData] = useState(null);
    let options = {}

    const IndustryData = () => {
        const url = "";
    
        async function fetchData() {
            const res = await ApiCaller(url);
            setData(res)
        }
    
        useEffect(() => {
            fetchData();
        }, []);
    }
    //IndustryData()

    function getPercentile(data, percentile) {
        data.sort();
        var index = (percentile / 100) * data.length;
        var result;
        if (Math.floor(index) === index) {
            result = (data[(index - 1)] + data[index]) / 2;
        } else {
            result = data[Math.floor(index)];
        }
        return result;
    }

    if (industry_data) {
        function getBoxValues(data) {
            let q1 = getPercentile(data, 25),
                median = getPercentile(data, 50),
                q3 = getPercentile(data, 75),
                iqr = q3 - q1,
                lowerFence = q1 - (iqr * 1.5),
                upperFence = q3 + (iqr * 1.5);
    
            const boxData = {
                low: lowerFence,
                q1: q1,
                median: median,
                q3: q3,
                high: upperFence
            };
    
            return boxData;
        }
    
        const boxData = getBoxValues(industry_data)
    
        options = {
            chart: {
                type: "boxplot",
                //height: "300px",
            },
    
            title: {
                text: 'Tỷ lệ biên an toàn của các công ty cùng ngành',
                style: {
                    fontFamily: "Segoe UI",
                    fontSize: 14,
                    fontWeight: "bold"
                }, 
            },
    
            legend: {
                enabled: false
            },
    
            xAxis: {
                categories: ['company'],
            },
    
            yAxis: {
                title: {
                    text: ''
                },
            },
    
            series: [{
                dataLabels: {
                    align: 'left',
                    enabled: true
                },
                name: 'IndustryValues',
                data: [boxData],
                tooltip: {
                },
                pointWidth: 40,
                color: "black",
                fillColor: "gray"
            }, {
                name: 'CompanyValue',
                color: "red",
                type: 'scatter',
                data: [[0, 13]],
    
                marker: {
                    fillColor: "violet",
                    lineWidth: 1,
                    lineColor: "purple"
                },
                tooltip: {
                    pointFormat: 'Định giá: {point.y}'
                }
            }]
        }
    }
    
    return (
        industry_data ? <HighchartsReact
            highcharts={Highcharts}
            options={options}
        /> : <Loading height="100px"/>
    );
}

export default IndustryBoxPlot;