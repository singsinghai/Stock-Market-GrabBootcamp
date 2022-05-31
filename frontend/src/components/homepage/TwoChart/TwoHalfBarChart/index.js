import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Loading } from "../../../Loading";

const createBarChart = (res) => {
  // data processing
  // take symbol having highest totalForeignValue
  // take symbol having lowest totalForeignValue
  // take 10 symbol having highest totalForeignValue
  // take 10 symbol having lowest totalForeignValue
  if(res === null) return
  const max_value_green = res[0].totalForeignValue;
  const max_value_red = res[res.length -1].totalForeignValue;
  const data_red = res.slice(-10).reverse().map(item => ({
    ...item,
    value: item.totalForeignValue * 100 / max_value_red
  }));;
  const data_green = res.slice(0,10).map(item => ({
    ...item,
    value: item.totalForeignValue * 100 / max_value_green
  }));
  // format data to show chart
  const list_green = data_green.map((item) => 
    <div className="d-flex flex-row-reverse ">
      <div className="col-3 text-end">
        <Link to={`/company/${item.symbol}`}>
          {item.symbol}
        </Link>
      </div>
      <div className="col-9 flex-col-reverse d-flex flex-row-reverse">
        <div className="bg-green my-auto rounded ms-1" style={{width:item.value, height:15}}></div>
        <span> {Math.round(item.totalForeignValue / 100000000)/10}</span>
      </div>
    </div>    
  )
  const list_red = data_red.map((item) => 
    <div className="d-flex">
      <div className="col-3">
        <Link to={`/company/${item.symbol}`}>
          {item.symbol}
        </Link>
      </div>
      <div className="col-9 flex-col-reverse d-flex flex-row">
        <div className="bg-red my-auto rounded me-1" style={{width:item.value, height:15}}></div>
        <span>{Math.round(item.totalForeignValue / -100000000)/10}</span>
      </div>
    </div>    
  )
  const list = (<div className="row center" style={{maxWidth: 500}}>
            <div className="col-6">
              <div className="text-center text-green fw-bold"> Top mua ròng</div>
              {list_green}
            </div>
            <div className="col-6">
              <div className="text-center text-red fw-bold"> Top bán ròng</div>
              {list_red}
        </div>
    </div>)
    return (
        <div>
            {list}
        </div>
    )
}
function TwoHalfBarChart(){
    const [points, setPoints] = useState(null);
    const BarChart = useMemo(() => createBarChart(points), [points]);
    useEffect(() => {
        fetch('http://139.180.215.250/api/stock-price/top-foreign-value')
            .then(result => result.json())
            .then(data => {
                points = data;
                setPoints(data)
            })
        },[])
    return points? BarChart: <Loading />
}
          

export default TwoHalfBarChart;