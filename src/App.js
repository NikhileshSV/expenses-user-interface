import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Main from "./components/Main/containers/Main";
import Register from "./components/Login/containers/Register";
import Login from "./components/Login/containers/Login";
import Reports from "./components/Reports/containers/Main";
import PrivateRoute from "./Router/PrivateRoute";

const App = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/login" exact component={Login} />
                <Route path="/register" exact component={Register} />
                <Route exact path="/" render={() => <Redirect to="/transactions" />} />
                <PrivateRoute path="/transactions" exact>
                    <Main />
                </PrivateRoute>
                <PrivateRoute path="/reports" exact>
                    <Reports />
                </PrivateRoute>
            </Switch>
        </BrowserRouter>
    );
};

export default App;
