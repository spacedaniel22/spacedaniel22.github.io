import React, { Component } from "react";

class BookDetail extends Component {

    render() {
        return (
            <section className="book-detail">
                Book Detail
                <span> {this.props.match.params.id}</span>
            </section>
        );
    }

}

export default BookDetail;