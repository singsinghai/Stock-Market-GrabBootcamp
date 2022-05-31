import React from "react";
import { Market } from "./Market";
import TwoChart from "./TwoChart"

export const HomePage = ({market_data}) => {
    return (
        <div >      
            <Market data={market_data}/>
            <TwoChart />
        </div>
        // <MarketTable/>
    );
};