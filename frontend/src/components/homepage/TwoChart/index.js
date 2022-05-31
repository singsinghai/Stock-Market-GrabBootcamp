import React from "react";
import TreeMap from "./TreeMap";
import TwoHalfBarChart from "./TwoHalfBarChart";

function TwoChart() {
    return (
        <div className="row">
            <div className="col-xl-7 col-12">
                <div className="title">Bản đồ thị trường</div>
                <TreeMap />
            </div>
            <div className="col-xl-5 col-12">
                <div className="title">Khối ngoại</div>
                <TwoHalfBarChart />
            </div>
        </div>
    )
};

export default TwoChart