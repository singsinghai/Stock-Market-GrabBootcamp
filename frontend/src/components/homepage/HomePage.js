import React from "react";
import { Market } from "./Market";
import TwoChart from "./TwoChart"

export const HomePage = ({data}) => {
    return (
        <div >      
            <Market data={data}/>
            <TwoChart />
        </div>
        // <MarketTable/>
    );
};