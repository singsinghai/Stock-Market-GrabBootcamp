import './App.css';
import SidebarWithHeader from './components/sidebar';
//import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import HomePage from './components/homepage/HomePage';
import CompanySite from './components/companySite'



function App() {
    return (
        // This is the Single-Page routing
        <BrowserRouter>
            {/* The Sidebar and Header is fixed on every page */}
            <SidebarWithHeader>
                <Routes>
                    <Route path="/" element={<HomePage/>} />
                    <Route path="/company/:symbol" element={<CompanySite/>} />
                </Routes>

            </SidebarWithHeader>
        </BrowserRouter>

    );
}

export default App;
