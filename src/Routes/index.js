import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';

import Search from "../components/Search"
import BookDetail from "../components/BookDetail"
import NoMatch from "../components/NoMatch";

export default () => (
    <Router>
        <Switch>
            <Route exact path="/" render={props => <Search {...props}/> } />
            <Route path="/search/:term?" render={props => <Search {...props}/> } />
            <Route path="/detail/:id" component={ BookDetail } />
            <Route component={ NoMatch } />
        </Switch>
    </Router>
)