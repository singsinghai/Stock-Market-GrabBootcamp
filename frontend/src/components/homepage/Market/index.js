import { MarketPriceChart } from "./MarketPriceChart";
import { MarketTable } from "./MarketTable";
import { SplitView } from "../../splitview";
import { useState } from 'react';

export const Market = ({data}) => {

    const [current_market, setMarket ] = useState("VN-INDEX");

    return (
        <SplitView
            left={<MarketPriceChart data={data} current_market={current_market}/>}
            right={<MarketTable data={data} current_market={current_market} setMarket={setMarket} />}
        />
    )
}