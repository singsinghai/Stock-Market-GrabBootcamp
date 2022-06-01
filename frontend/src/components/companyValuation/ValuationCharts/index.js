import IndustryBoxPlot from "./IndustryBoxPLot";
import ColumnChart from "./ColumnChart";
import React from "react";
import { Col, Row } from "react-bootstrap";
import BulletChart from "./BulletChart";

function ValuationCharts() {
  return (
    <Row>
      <Col xs={12} xl={6}>
        <Row>
            <Col xs={12} xl={7}>
                <Row>
                    <Col xs={12} xl={6} className='p-0'>
                        <div> <ColumnChart/> </div>
                    </Col>

                    <Col xs={12} xl={6} className='p-0'>
                        <div><ColumnChart/></div>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} xl={6} className='p-0'>
                        <div><ColumnChart/></div>
                    </Col>

                    <Col xs={12} xl={6} className='p-0'>
                        <div><ColumnChart/></div>
                    </Col>
                </Row>
            </Col>

            <Col xs={12} xl={5}>
                <Row>
                    <div>Bullet Chart</div> {/*Bullet chart ở đây*/}
                    <Col xs={12} xl={6}>
                        <div><IndustryBoxPlot /></div>
                    </Col>

        </Row>
      </Col>
    </Row>
  );
}

export default ValuationCharts;
