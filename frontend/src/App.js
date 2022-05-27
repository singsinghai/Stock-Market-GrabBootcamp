import './App.css';
import SidebarWithHeader from './components/sidebar';
import TestChart from './components/TestChart/TestChart';
//import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import TwoChart from './components/TwoChart/TwoChart'



function App() {
    return (
        // This is the Single-Page routing
        <BrowserRouter>
            {/* The Sidebar and Header is fixed on every page */}
            <SidebarWithHeader>
                <Routes>
                    <Route path="/" element={<TestChart/>} />
                    <Route path="/xxx" element={<TwoChart />} />
                </Routes>

            </SidebarWithHeader>
        </BrowserRouter>

    );
}

export default App;
