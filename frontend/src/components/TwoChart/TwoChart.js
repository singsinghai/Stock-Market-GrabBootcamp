import React from "react";
import TestComponent1 from "../TestComponent1/TestComponent1";
import TwoHalfBarChart from "../TwoHalfBarChart/TwoHalfBarChart";

function TwoChart() {
    return (
        <div className="row">
            <div className="col-lg-7 col-12">
                <TestComponent1 />
            </div>
            <div className="col-lg-5 col-12">
                <TwoHalfBarChart />
            </div>
        </div>
    )
};

export default TwoChart