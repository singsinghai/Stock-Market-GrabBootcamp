import { MarketPriceChart } from "./MarketPriceChart";
import { MarketTable } from "./MarketTable";
import { Row, Col} from "react-bootstrap";
import { useState } from 'react';

export const Market = ({data}) => {

    const [current_market, setMarket ] = useState("VN-INDEX");

    return (
        <Row>
            <Col xs={12} xl={6}>
                <MarketPriceChart data={data} current_market={current_market}/>
            </Col>
            <Col xs={12} xl={6}>
                <MarketTable data={data} current_market={current_market} setMarket={setMarket} />
            </Col>
        </Row>
    )
}