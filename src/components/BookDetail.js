import React, { Component } from "react";
import { getBookDetail } from "../api/";

const initialState = {
    id: null,
    title: null,
    authors: [],
    description: null,
    imageLink: null,
    isAddedToBasket: false
}

class BookDetail extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
        this.basketAction = this.basketAction.bind(this);
    }

    componentDidMount() {
        getBookDetail(this.props.match.params.id)
            .then(data => {
                const isAddedToBasket = this.props.basketContent.some(x => x.id === this.props.match.params.id);
                this.setState({ ...data, isAddedToBasket });
            });
    }

    basketAction() {
        this.props.basketAction({
            isAdded: this.state.isAddedToBasket,
            id: this.state.id,
            title: this.state.title
        });
        this.setState({
            isAddedToBasket: !this.state.isAddedToBasket
        })
    }

    render() {
        const style = {
            backgroundImage: `url(${this.state.imageLink})`
        };
        const basketAction = this.state.isAddedToBasket ? "Remove from Basket" : "Add to Basket";
        return (
            <section className="book-detail">
                <div className="book-cover" style={style}></div>
                <h3 className="book-name">
                    {this.state.title}
                </h3>
                <span className="book-addToBasket" onClick={this.basketAction}>{basketAction}</span>
                <div className="book-authors">
                    { Object.keys(this.state.authors).map(i =>
                        <label key={i} className="author"> {this.state.authors[i]} </label>)
                    }
                </div>
                <div dangerouslySetInnerHTML={{__html: this.state.description}}></div>
            </section>
        );
    }

}

export default BookDetail;