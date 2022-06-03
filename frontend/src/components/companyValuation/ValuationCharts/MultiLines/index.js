import React from "react";
import { Col, Row } from "react-bootstrap";
import Evaluation from "./Evaluation";
import ProfitMargin from "./ProfitMargin";

function MultiLines({ company_symbol, businessValue}) {

    return (
        < Row >
            <Col xs={12} xl={6} className='p-0'>
                <ProfitMargin company_symbol={company_symbol} />
            </Col>

            <Col xs={12} xl={6} className='p-0'>
                <Evaluation company_symbol={company_symbol} businessValue={businessValue} />
            </Col>
        </Row >
    )
}

export default MultiLines;