import 'react-tabulator/css/tabulator_bootstrap3.css';
import { ReactTabulator } from 'react-tabulator';
import { Navigate } from "react-router-dom";
import { useState } from 'react';


function CompanyRanking() {

    const [company, setCompany] = useState(null);

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
    { title: "Biên an toàn", field: "day", headerHozAlign: "center", hozAlign: "center" },
    { title: "T.trưởng DT 4 quý gần nhất", field: "week", hozAlign: "center", titleFormatter: "textarea", headerHozAlign: "center" },
    { title: "T.trưởng DT bình quân 5 năm gần nhất", field: "month", titleFormatter: "textarea", width: 200, headerHozAlign: "center", hozAlign: "center" },
    { title: "T.trưởng LN 4 quý gần nhất", field: "three_month", titleFormatter: "textarea", headerHozAlign: "center", hozAlign: "center" },
    { title: "T.trưởng LNST bình quân 5 năm gần nhất", field: "year", titleFormatter: "textarea", width: 200, headerHozAlign: "center", hozAlign: "center" },
    { title: "ROE", field: "ROE", headerHozAlign: "center", hozAlign: "center" }
    ];

    const ranking_data = [
        { market_symbol: "VIC", day: 0, week: 0, month: 0, three_month: 0, year: 0, ROE: 0 },
        { market_symbol: "PNJ", day: 0, week: 0, month: 0, three_month: 0, year: 0, ROE: 0 },
    ]

    return (
        company ? <Navigate to={`/company/${company}`} />
            : <ReactTabulator
                data={ranking_data}
                columns={columns}
                layout="fitColumns"
            />
    );
}

export default CompanyRanking;