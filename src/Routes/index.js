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
        this.basketAction = this.basketAction.bind(this);
    }

    componentDidMount() {
        const cached = localStorage.getItem("basket");
        if (cached) {
            this.setState({ addedToBasket: JSON.parse(cached) })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.addedToBasket !== prevState.addedToBasket) {
            localStorage.setItem("basket", JSON.stringify(this.state.addedToBasket));
        }
    }

    basketAction(book) {
        if (book.isAdded) {
            this.removeItem(book.id);
        } else {
            this.addItem(book);
        }
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
                <Basket content={this.state.addedToBasket} />
                <Router>
                    <Switch>
                        <Route exact path="/" render={props => <Search {...props}/> } />
                        <Route path="/search/:term?" render={props => <Search {...props}/> } />
                        <Route path="/detail/:id" render={props => <BookDetail {...props} basketAction={this.basketAction} basketContent={this.state.addedToBasket} /> } />
                        <Route component={ NoMatch } />
                    </Switch>
                </Router>
            </main>
        )
    }
}

export default Routes;