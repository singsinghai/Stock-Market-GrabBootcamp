import React from "react";
import { Market } from "./Market";
import TwoChart from "./TwoChart"
import { Loading } from "../Loading";

export const HomePage = ({market_data}) => {
    return (
        <div >      
            { market_data ? <Market data={market_data}/> : <Loading height={"350px"} width={"1200px"} /> }
            <TwoChart />
        </div>
        // <MarketTable/>
    );
};