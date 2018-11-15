import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

// 'New' Libraries
import Cookies from 'universal-cookie';
import _ from 'lodash';

import indexRoutes from "routes/index.jsx";

import "assets/scss/material-dashboard-pro-react.css?v=1.4.0";

const hist = createBrowserHistory();
const userSessionCookie = new Cookies();

/* @TODO Implement route handling based on session status */
/* We're getting a warning because these currently do the same thing.*/

/* If there is a previous session on record we will direct user to dashboard */
{
    !_.isUndefined(userSessionCookie.get('user')) &&
    ReactDOM.render(
        <Router history={hist}>
            <Switch>
                {indexRoutes.map((prop, key) => {
                    return <Route path={prop.path} component={prop.component} key={key} />;
                })}
            </Switch>
        </Router>,
        document.getElementById("root")
    );
}

/* Else prompt a login or registration */
{
    _.isUndefined(userSessionCookie.get('user')) &&
    ReactDOM.render(
        <Router history={hist}>
            <Switch>
                {indexRoutes.map((prop, key) => {
                    return <Route path={prop.path} component={prop.component} key={key} />;
                })}
            </Switch>
        </Router>,
        document.getElementById("root")
    );
}
