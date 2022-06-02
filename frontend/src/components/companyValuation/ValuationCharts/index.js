import IndustryBoxPlot from "./IndustryBoxPLot";
import React from "react";
import { Col, Row } from "react-bootstrap";
import BulletChart from "./BulletChart";
import ProfitCharts from "./ProfitCharts";
import MultiLines from "./MultiLines";

function ValuationCharts({company_symbol}) {
    return (
        <div>
            <ProfitCharts company_symbol={company_symbol}/>
            <MultiLines company_symbol={company_symbol}/>

            <Row>
                <div><BulletChart /></div> {/*Bullet chart ở đây*/}
                <Col xs={12} xl={6}>
                    <div><IndustryBoxPlot /></div>
                </Col> 
                <Col xs={12} xl={6}>
                    <div>Bảng định giá</div>
                </Col>
            </Row>
        </div>
    );
}

export default ValuationCharts;
