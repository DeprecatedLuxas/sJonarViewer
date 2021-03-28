import React from "react";

import { Route, Switch } from "react-router-dom";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import SearchPage from "./pages/Search/SearchPage";

import { BrowserRouter } from "react-router-dom";

class App extends React.Component<any, any> {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Home} />

                    <Route path="/search" component={SearchPage} />
                    <Route path="/login" component={Login} />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;
