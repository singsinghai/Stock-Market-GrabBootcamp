import React from "react";
import { Market } from "./Market";
import TwoChart from "./TwoChart"

export const HomePage = ({market_data}) => {
    return (
        <div > 
            <div className="title">Diễn biến thị trường</div>    
            <Market data={market_data}/>
            <TwoChart />
        </div>
    );
};