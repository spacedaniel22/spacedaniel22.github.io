import React, { Component } from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';

import Search from "../components/Search";
import BookDetail from "../components/BookDetail";
import Basket from "../components/Basket";
import NoMatch from "../components/NoMatch";

const initialState = {
    addedToBasket: []
}

class Routes extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
        this.addItem = this.addItem.bind(this);
        this.removeItem = this.removeItem.bind(this);
    }

    addItem(item) {
        if (this.state.addedToBasket.some(x => x.id === item.id)) return
        this.setState({
            addedToBasket: [...this.state.addedToBasket, item]
        })
    }

    removeItem(id) {
        this.setState({
            addedToBasket: this.state.addedToBasket.filter(x => x.id !== id)
        })
    }

    render () {
        return (
            <main>
                <Basket content={this.state.addedToBasket} removeItem={this.removeItem} />
                <Router>
                    <Switch>
                        <Route exact path="/" render={props => <Search {...props}/> } />
                        <Route path="/search/:term?" render={props => <Search {...props}/> } />
                        <Route path="/detail/:id" render={props => <BookDetail {...props} addToBasket={this.addItem} /> } />
                        <Route component={ NoMatch } />
                    </Switch>
                </Router>
            </main>
        )
    }
}

export default Routes;