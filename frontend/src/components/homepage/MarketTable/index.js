import 'react-tabulator/css/tabulator_bootstrap3.css';
import { ReactTabulator } from 'react-tabulator'
import axios from 'axios';
import { useEffect, useState } from 'react';

const columns = [
    { title: "Name", field: "name", width: 150 },
    { title: "Age", field: "age", hozAlign: "left" },
    { title: "Favourite", field: "col" },
    { title: "Date", field: "dob", hozAlign: "center" },
    { title: "Rating", field: "rating", hozAlign: "center" },
    { title: "Passed?", field: "passed", hozAlign: "center", formatter: "tickCross" }
];

function MarketTable() {

    const [data, setData] = useState(null);

    const getData = async () => {
        const url = 'http://139.180.215.250/api/market-price?format=json'
        
        const res = await axios.get(url)
        // const res = await fetch(url, {
        //     //mode: "no-cors",
        //     method: "GET",
        //     headers: {
        //         'Access-Control-Allow-Origin': '*'
        //     }
        // });
        // const json = await res.data.json();
        console.log(res)
        setData(res.data);
    };

    useEffect(() => {
        if (!data) {
            getData();
            console.log(data);
        }
    }, [data]);

    return (
        // <ReactTabulator
        //     data={data}
        //     columns={columns}
        //     layout="fitDataFill"
        // />
        <div>asifhij</div>
    )
}

export default MarketTable;