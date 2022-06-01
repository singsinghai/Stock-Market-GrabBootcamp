import './App.css';
import SidebarWithHeader from './components/SideBar';
//import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { HomePage } from './components/homepage';
import CompanyValuation from './components/companyValuation';
import ApiCaller from './api/ApiCaller';
import { useEffect, useState } from 'react';
import CompanyRanking from './components/companyRanking';



function App() {
    const [market_data, setMarketData] = useState(null);
    const GetMarketData = () => {
        const url = 'http://139.180.215.250/api/market-price?format=json';
    
        async function fetchData() {
            const res = await ApiCaller(url);
            setMarketData(res)
        }
    
        useEffect(() => {
            fetchData();
        }, []);
    }
    GetMarketData()



    return (
        // This is the Single-Page routing
        <BrowserRouter>
            {/* The Sidebar and Header is fixed on every page */}
            <SidebarWithHeader>
                <Routes>
                    <Route path="/" element={<HomePage market_data={market_data}/>} />
                    <Route path="/company-ranking" element={<CompanyRanking/>} />
                    <Route path="/xxx" element={ <div> Nothing here yet! </div> } />
                    <Route path="/company/:company_symbol" element={<CompanyValuation />} />
                </Routes>

            </SidebarWithHeader>
        </BrowserRouter>

    );
}

export default App;
