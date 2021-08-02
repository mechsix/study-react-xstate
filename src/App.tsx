import React from 'react';
import {HashRouter, Route, Switch} from "react-router-dom";
import App1 from './apps/app1';

const App: React.FC = () => {
    return (
        <HashRouter>
            <Switch>
                <Route path={"/app1"} component={App1}/>
            </Switch>
        </HashRouter>
    )
}

export default App;