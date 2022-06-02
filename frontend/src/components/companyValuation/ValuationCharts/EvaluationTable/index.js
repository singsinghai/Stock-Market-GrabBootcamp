import 'react-tabulator/css/tabulator_bootstrap3.css';
import { ReactTabulator } from 'react-tabulator';

function EvaluationTable() {
    const columns = [
        { title: "Chỉ số định giá", field: "evaluator" },
        { title: "Giá trị 1 cổ phiếu", field: "price" }
    ]

    const data = [
        { evaluator: "P/E", price: "112,785" },
        { evaluator: "EV/EBIDA", price: "103,913" },
        { evaluator: "P/B", price: "88,129" },
        { evaluator: "EV/Sales", price: "83,751" },
        { evaluator: "Kết quả định giá", price: "98,145"}
    ]

    return (
        <ReactTabulator
            data={data}
            columns={columns}
            layout="fitData"
            height="350px"
        />
    );
}

export default EvaluationTable;