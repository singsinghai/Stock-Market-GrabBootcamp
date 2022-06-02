import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import ApiCaller from "../../../../api/ApiCaller";
import { Loading } from "../../../Loading";
import ProfitQuarter from "./ProfitQuarter";
import ProfitTTM from "./ProfitTTM";


function ProfitCharts({ company_symbol }) {
    const [profit_data, setData] = useState(null);

    const ProfitData = () => {
        const url = `http://139.180.215.250/api/financial-statements/${company_symbol}?format=json`;
        async function fetchData() {
            const res = await ApiCaller(url);
            setData(res)
        }

        useEffect(() => {
            fetchData();
        }, []);
    }
    ProfitData()

    let profit, profit_yoy, profit_TTM, profit_yoy_TTM, label = null;

    if (profit_data) {
        const data = profit_data.filter((item) => {
            return item.year >= 2022 - 4;
        })

        const yoy_data = profit_data.filter((item) => {
            return item.year >= 2022 - 5;
        })

        profit = data.map((item) => item.profit_after_taxes / 1000000000);
        profit_yoy = yoy_data.map(((item) => item.profit_after_taxes / 1000000000));
        label = data.map((item) => "Q" + item.quarter + "/" + item.year % 2000);

        let temp_yoy = []
        for (let i = 0; i < profit_yoy.length; i++) {
            temp_yoy[i] = profit_yoy[i]
            if (i >= 4) {
                profit_yoy[i] = ((temp_yoy[i] - temp_yoy[i - 4]) / temp_yoy[i - 4] * 100);
            }
        }
        profit_yoy = profit_yoy.slice(4);

        const TTM_data = profit_data.filter((item) => {
            return item.year >= 2022 - 6;
        })

        profit_TTM = TTM_data.map(((item) => item.profit_after_taxes / 1000000000));
        profit_yoy_TTM = TTM_data.map(((item) => item.profit_after_taxes / 1000000000));

        let temp_TTM = [];
        for (let i = 0; i < profit_yoy.length; i++) {
            temp_TTM[i] = profit_TTM[i];
            if (i >= 3) {
                profit_TTM[i] = (temp_TTM[i] + temp_TTM[i - 1] + temp_TTM[i - 2] + temp_TTM[i - 3]);
            }
        }

        temp_yoy = []
        for (let i = 0; i < profit_yoy.length; i++) {
            temp_yoy[i] = profit_yoy[i];
            if (i >= 4) {
                profit_yoy_TTM[i] = ((temp_yoy[i] - temp_yoy[i - 4]) / temp_yoy[i - 4] * 100);
            }
        }
        profit_TTM = profit_TTM.slice(8);
        profit_yoy_TTM = profit_yoy_TTM.slice(8);
        console.log(profit_TTM, profit_yoy_TTM)


    }

    return (

        profit_data ? 
        < Row >
            <Col xs={12} xl={6} className='p-0'>
                <ProfitQuarter profit={profit} profit_yoy={profit_yoy} label={label} />
            </Col>

            <Col xs={12} xl={6} className='p-0'>
                <ProfitTTM profit_TTM={profit_TTM} profit_yoy_TTM={profit_yoy_TTM} label={label} />
            </Col>
        </Row > : <Loading height="300px" />
    )
}

export default ProfitCharts;