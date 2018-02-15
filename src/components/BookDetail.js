import React, { Component } from "react";
import { getBookDetail } from "../api/";

const initialState = {
    description: null,
    imageLink: null
}

class BookDetail extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    componentDidMount() {
        getBookDetail(this.props.match.params.id)
            .then(data => {
                this.setState({ ...initialState, ...data })
            });
    }

    render() {
        const { title, authors } = this.props.location.state;
        const { description, imageLink } = this.state;
        const style = {
            backgroundImage: `url(${imageLink})`
        };
        return (
            <section className="book-detail">
                <div className="book-cover" style={style}></div>
                <h3 className="book-name">{title}</h3>
                { Object.keys(authors).map(i =>
                    <label key={i} className="book-author"> {authors[i]} </label>)
                }
                <div>{description}</div>
            </section>
        );
    }

}

export default BookDetail;