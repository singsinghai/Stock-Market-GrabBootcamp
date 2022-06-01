import IndustryBoxPlot from "./IndustryBoxPLot"
import ColumnChart from "./ColumnChart"
import React from "react";
import { Col, Row } from "react-bootstrap";


function ValuationCharts() {
    return (
        <Row>
            <Col xs={12} xl={6}>
                <Row>
                    <Col xs={12} xl={6}>
                        <div> <ColumnChart/> </div>
                    </Col>

                    <Col xs={12} xl={6}>
                        <div>Chart 2</div>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} xl={6}>
                        <div>Chart 3</div>
                    </Col>

                    <Col xs={12} xl={6}>
                        <div>Chart 4</div>
                    </Col>
                </Row>
            </Col>

            <Col xs={12} xl={6}>
                <Row>
                    <div>Bullet Chart</div> {/*Bullet chart ở đây*/}
                    <Col xs={12} xl={6}>
                        <div><IndustryBoxPlot /></div>
                    </Col>

                    <Col xs={12} xl={6}>
                        <div>Bảng định giá</div>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}




export default ValuationCharts;