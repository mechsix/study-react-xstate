import React from 'react';
import {HashRouter, Route, Switch} from "react-router-dom";
import App1 from './apps/app1';
import TrafficLights from './apps/traffic_lights';

const App: React.FC = () => {
    return (
        <HashRouter>
            <Switch>
                <Route path={"/app1"} component={App1}/>
                <Route path={"/traffic_lights"} component={TrafficLights}/>
            </Switch>
        </HashRouter>
    )
}

export default App;