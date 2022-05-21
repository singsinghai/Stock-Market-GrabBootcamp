import './App.css';
import SidebarWithHeader from './components/sidebar';
import TestChart from './components/TestChart/TestChart';
//import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import TestComponent1 from './components/TestComponent1';



function App() {
    return (
        // This is the Single-Page routing
        <BrowserRouter>
            {/* The Sidebar and Header is fixed on every page */}
            <SidebarWithHeader>
                <Routes>
                    <Route path="/" element={<TestChart/>} />
                    <Route path="/xxx" element={<TestComponent1 />} />
                </Routes>

            </SidebarWithHeader>
        </BrowserRouter>

    );
}

export default App;
