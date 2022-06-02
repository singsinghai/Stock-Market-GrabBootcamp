import IndustryBoxPlot from "./IndustryBoxPLot";
import React from "react";
import { Col, Row } from "react-bootstrap";
import BulletChart from "./BulletChart";
import ProfitCharts from "./ProfitCharts";
import MultiLines from "./MultiLines";
import EvaluationTable from "./EvaluationTable";


function ValuationCharts({company_symbol, businessValue}) {
    return (
        <div>
            <ProfitCharts company_symbol={company_symbol}/>
            <MultiLines company_symbol={company_symbol} businessValue={businessValue}/>

            <Row>
                <div><BulletChart company_symbol={company_symbol}/></div> {/*Bullet chart ở đây*/}
                <Col xs={12} xl={6}>
                    <div><IndustryBoxPlot company_symbol={company_symbol}/></div>
                </Col> 
                <Col xs={12} xl={6}>
                    <EvaluationTable />
                </Col>
            </Row>
        </div>
    );
}

export default ValuationCharts;
