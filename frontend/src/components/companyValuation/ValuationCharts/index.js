import IndustryBoxPlot from "./IndustryBoxPLot";
import ColumnChart from "./ColumnChart";
import React from "react";
import { Col, Row } from "react-bootstrap";
import BulletChart from "./BulletChart";

function ValuationCharts() {
    return (
        <div>
            <Row>
                <Col xs={12} xl={6} className='p-0'>
                    <div> <ColumnChart /> </div>
                </Col>

                <Col xs={12} xl={6} className='p-0'>
                    <div><ColumnChart /></div>
                </Col>
            </Row>
            <Row>
                <Col xs={12} xl={6} className='p-0'>
                    <div><ColumnChart /></div>
                </Col>

                <Col xs={12} xl={6} className='p-0'>
                    <div><ColumnChart /></div>
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
