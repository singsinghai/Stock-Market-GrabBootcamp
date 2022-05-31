import React from "react";
import Market from "./Market";
import TwoChart from "./TwoChart"

function HomePage() {
    return (
        <div > 
            <div className="title">Diễn biến thị trường</div>
            <Market />
            <TwoChart />
        </div>
        // <MarketTable/>
    );
}

export default HomePage;