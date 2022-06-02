import IndustryBoxPlot from "./IndustryBoxPLot";
import React from "react";
import { Col, Row } from "react-bootstrap";
import BulletChart from "./BulletChart";
import ProfitCharts from "./ProfitCharts";

function ValuationCharts({company_symbol}) {
    return (
        <div>
            <ProfitCharts company_symbol={company_symbol}/>
            <Row>
                <Col xs={12} xl={6} className='p-0'>
                    <div>Chart 3</div>
                </Col>

                <Col xs={12} xl={6} className='p-0'>
                    <div>Chart 4</div>
                </Col>
            </Row>

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
