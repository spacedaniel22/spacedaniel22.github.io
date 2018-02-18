import React, { Component } from "react";

class BasketItem extends Component {
    render () {
        return (
        <label className="basket-item">
            {this.props.title}
        </label>
        )
    }
}

export default BasketItem;