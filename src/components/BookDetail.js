import React, { Component } from "react";
import { getBookDetail } from "../api/";

const initialState = {
    id: null,
    title: null,
    authors: [],
    description: null,
    imageLink: null
}

class BookDetail extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
        this.addToBasket = this.addToBasket.bind(this);
    }

    componentDidMount() {
        getBookDetail(this.props.match.params.id)
            .then(data => {
                this.setState({ ...initialState, ...data })
            });
    }

    addToBasket() {
        this.props.addToBasket({
            id: this.state.id,
            title: this.state.title
        });
    }

    render() {
        const style = {
            backgroundImage: `url(${this.state.imageLink})`
        };
        return (
            <section className="book-detail">
                <div className="book-cover" style={style}></div>
                <h3 className="book-name" onClick={this.addToBasket}>{this.state.title}</h3>
                { Object.keys(this.state.authors).map(i =>
                    <label key={i} className="book-author"> {this.state.authors[i]} </label>)
                }
                <div dangerouslySetInnerHTML={{__html: this.state.description}}></div>
            </section>
        );
    }

}

export default BookDetail;