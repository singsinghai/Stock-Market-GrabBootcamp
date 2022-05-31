import React from "react";
import { SplitView } from "../../splitview";
import TreeMap from "./TreeMap";
import TwoHalfBarChart from "./TwoHalfBarChart";

function TwoChart() {
    return (

        <SplitView
            left={ 
                <div>
                <div className="title">Bản đồ thị trường</div>
                <TreeMap />
                </div>
             }
             right={ 
                <div>
                <div className="title">Khối ngoại</div>
                <TwoHalfBarChart />
                </div>
             }
        />
    )
};

export default TwoChart