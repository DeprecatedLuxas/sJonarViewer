import React from "react";
import { GlobalStyle } from "./styles/global";
import { Route, Switch } from "react-router-dom";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import SearchPage from "./pages/Search/SearchPage";

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
class App extends React.Component<any, any> {
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <GlobalStyle />
                    <Switch>
                        <Route exact path="/" component={Home} />

                        <Route path="/search" component={SearchPage} />
                        <Route path="/login" component={Login} />
                    </Switch>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default App;
