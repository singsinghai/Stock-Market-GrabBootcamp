import './App.css';
import SidebarWithHeader from './components/sidebar';
//import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { HomePage } from './components/homepage/HomePage';
import CompanyValuation from './components/companyValuation';
import ApiCaller from './api/ApiCaller';
import { useEffect, useState } from 'react';



function App() {
    const url = 'http://139.180.215.250/api/market-price?format=json';
    const table_data = []
    const [data, setData] = useState(null);

    async function fetchData() {
        const res = await ApiCaller(url);
        setData(res)
    }

    useEffect(() => {
        fetchData();
    }, []);



    return (
        // This is the Single-Page routing
        <BrowserRouter>
            {/* The Sidebar and Header is fixed on every page */}
            <SidebarWithHeader>
                <Routes>
                    <Route path="/" element={<HomePage data={data}/>} />

                    <Route path="/xxx" element={ <div> Nothing here yet! </div> } />
                    <Route path="/company/:company_symbol" element={<CompanyValuation />} />

                </Routes>

            </SidebarWithHeader>
        </BrowserRouter>

    );
}

export default App;
