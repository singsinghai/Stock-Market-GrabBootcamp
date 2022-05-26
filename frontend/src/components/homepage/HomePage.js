import React from "react";
import TestChart from "./MarketPriceChart";
import { SplitView } from "../splitview";
import MarketTable from "./MarketTable";

function HomePage() {
    return (
        <div>
        <SplitView
            left = {<TestChart/>}
            right = {<TestChart /> }

        />

        <SplitView
            left = {<TestChart/>}
            right = {<TestChart /> }

        />
        </div>
        // <MarketTable/>
    );
}

export default HomePage;