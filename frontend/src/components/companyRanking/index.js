import 'react-tabulator/css/tabulator_bootstrap3.css';
import { ReactTabulator } from 'react-tabulator';
import { Navigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import ApiCaller from '../../api/ApiCaller';
import { Loading } from '../Loading';


function CompanyRanking() {

   

    //financial-statement
    const [statement_data, setStatement] = useState(null);

    const StatementData = () => {
        const url = `http://139.180.215.250/api/financial-statements`;
        async function fetchData() {
            const res = await ApiCaller(url);
            setStatement(res)
        }

        useEffect(() => {
            fetchData();
        }, []);
    }
    StatementData();

    const groupBy = function (xs, key) {
        return xs.reduce(function (rv, x) {
            (rv[x[key]] = rv[x[key]] || []).push(x);
            return rv;
        }, {});
    };

    let ranking_data = [];
    if (statement_data) {

        for (let i = 0; i < statement_data.length; i++) {
            
            if (statement_data[i].dif_revenue === null || statement_data[i].dif_taxe === null) {
                continue;
            }
            const data_row = {
                mean: 23,
                market_symbol: statement_data[i].company_id,
                net_revenue: statement_data[i].dif_revenue,
                profit_after_taxes: statement_data[i].dif_taxes,
                ROE: (statement_data[i].roe * 100).toFixed(2) + "%",
                ROA: (statement_data[i].roa * 100).toFixed(2) + "%",
                ROIC: (statement_data[i].roic * 100).toFixed(2)  + "%",
            }

            ranking_data.push(data_row)
        }
    }


    const [company, setCompany] = useState(null);


    const update_percentage_color = (cell, formatterParams, onRendered) => {
        let cell_percentage = cell.getValue();
        
        if (cell_percentage < 0) { cell.getElement().style.color = "rgb(185, 28, 27)"; }
        else { cell.getElement().style.color = "rgb(23, 128, 61)"; }

        return cell_percentage.toFixed(2) + "%";
    }
    const columns = [{
        title: "Mã cổ phiếu",
        field: "market_symbol",
        headerHozAlign: "center",
        hozAlign: "center",
        cellClick: (e, cell) => {
            setCompany(cell.getValue());
        },
        formatter: (cell) => {
            cell.getElement().style.color = "purple";
            cell.getElement().style.fontWeight = "bold";
            return cell.getValue();
        },
    },
    { title: "Biên an toàn", field: "mean", headerHozAlign: "center", hozAlign: "center", formmater: update_percentage_color },
    { title: "T.trưởng DT 4 quý gần nhất", field: "net_revenue", hozAlign: "center", titleFormatter: "textarea", headerHozAlign: "center", formatter: update_percentage_color },
    { title: "T.trưởng LN 4 quý gần nhất", field: "profit_after_taxes", titleFormatter: "textarea", headerHozAlign: "center", hozAlign: "center", formatter: update_percentage_color },
    { title: "ROE", field: "ROE", headerHozAlign: "center", hozAlign: "center", formmater: update_percentage_color },
    { title: "ROA", field: "ROA", headerHozAlign: "center", hozAlign: "center", formmater: update_percentage_color },
    { title: "ROIC", field: "ROIC", headerHozAlign: "center", hozAlign: "center", formmater: update_percentage_color },
    { title: "Cổ tức", field: "dividend_payout_ratio", headerHozAlign: "center", hozAlign: "center", formmater: update_percentage_color },
    ];
    
    return (
        (statement_data) ? company ? <Navigate to={`/company/${company}`} />
            : <ReactTabulator
                data={ranking_data}
                options={{ pagination: 'local', paginationSize: 13 }}
                columns={columns}
                layout="fitColumns"
            /> : <Loading />
    );
}

export default CompanyRanking;