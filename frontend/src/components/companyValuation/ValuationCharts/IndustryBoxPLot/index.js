import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsMore from 'highcharts/highcharts-more';
import ApiCaller from '../../../../api/ApiCaller';
import { Loading } from '../../../Loading';

HighchartsMore(Highcharts);

function IndustryBoxPlot({company_symbol}) {
    // const [industry_data, setData] = useState(null);
    // let options = {}

    // const IndustryData = () => {
    //     const url = "http://139.180.215.250/api/business-valuation";
    
    //     async function fetchData() {
    //         const res = await ApiCaller(url);
    //         setData(res)
    //     }
    
    //     useEffect(() => {
    //         fetchData();
    //     }, []);
    // }
    //IndustryData()
    const industry_data = [11, 12,13,14,15,14,15,16,12,2,5,1,6,7,24,25,26,14,12,12,15,13,14,15,16,18,19,20,21,31]
    function getEvaluation(json) {
        return (json.book_value + json.earning_per_share + json.enterprise_value 
            + json.ev_over_ebit + json.ev_over_ebitda + json.ev_sales + json.price_to_book
            + json.price_earnings + json.price_to_sales + json.market_cap) / 10
    }
    let options = {}
    


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
                categories: [company_symbol],
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
                    pointFormat: 'Biên an toàn: {point.y}'
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