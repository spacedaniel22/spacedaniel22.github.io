import React, { Component } from "react";

class BasketItem extends Component {

    removeItem() {
        this.props.removeItem(this.props.id);
    }

    render () {
        return (
        <label onClick={this.removeItem.bind(this)}> {this.props.title} </label>
        )
    }
}

export default BasketItem;