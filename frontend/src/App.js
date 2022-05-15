import './App.css';
import SidebarWithHeader from './components/sidebar';
import TestChart from './components/TestChart/TestChart';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TestComponent1 from './components/TestComponent1';



function App() {
    
    return (
        <div className="App">
            {/* Changing page using Router according to options in the Sidebar.
            This is not Single Page implemented yet */}
            <Router> 
                {/* Every page displays a sidebar and header view */}
                <SidebarWithHeader>
                    <Switch>

                        {/* Other pages currently not implemented */}
                        <Route path={"/xxx"} component={TestComponent1} />

                        {/* This is the homepage */}
                        <Route path="/" component={TestChart} />

                        {/* <Route path="*" component={NotFound} /> */}
                    </Switch>
                </SidebarWithHeader>
            </Router>
        </div >
    );
}

export default App;
