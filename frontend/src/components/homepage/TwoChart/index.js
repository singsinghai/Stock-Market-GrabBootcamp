import React from "react";
import TreeMap from "./TreeMap";
import TwoHalfBarChart from "./TwoHalfBarChart";
import { Row, Col } from "react-bootstrap";

function TwoChart() {
    return (
        <Row>
            <Col xs={12} xl={7}>
                <div>
                    <div className="title">Bản đồ thị trường</div>
                    <TreeMap />
                </div>
            </Col>
            <Col xs={12} xl={5}>
                <div>
                    <div className="title">Khối ngoại</div>
                    <TwoHalfBarChart />
                </div>
            </Col>
        </Row>
                
    )
};

export default TwoChart;