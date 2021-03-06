import React from 'react';
import {GlobalStyle} from "./styles/global";
import {Route, Switch} from 'react-router-dom'
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";

function App() {
    return (
        <>
            <GlobalStyle/>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/login" component={Login}/>
            </Switch>
        </>
    );
}

export default App;
