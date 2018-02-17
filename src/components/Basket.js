import React, { Component } from "react";
import BasketItem from "./BasketItem";

class Basket extends Component {

    removeItem(id) {
        this.props.removeItem(id)
    }

    render() {
        let content = null;
        if (this.props.content.length === 0) {
            content = <span>empty</span>
        } else {
            content = Object.keys(this.props.content).map(i =>
            <BasketItem key={i} id={this.props.content[i].id} title={this.props.content[i].title} removeItem={this.removeItem.bind(this)} />)
        }
        return (
            <div className="basket">
                {content}
            </div>
        )
    }
}

export default Basket;