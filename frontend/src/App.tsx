import React from 'react';
import {GlobalStyle} from "./styles/global";
import {Route, Switch} from 'react-router-dom'
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import SearchPage from "./pages/Search/SearchPage";
import KnownsPage from "./pages/Knowns/KnownsPage"
function App() {
    return (
        <>
            <GlobalStyle/>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/knowns" component={KnownsPage}/>
                <Route path="/search" component={SearchPage}/>
                <Route path="/login" component={Login}/>
            </Switch>
        </>
    );
}

export default App;
