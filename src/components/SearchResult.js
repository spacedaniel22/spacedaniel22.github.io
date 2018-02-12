import React, { Component } from "react";

class SearchResult extends Component {
    render() {
        const { results } = this.props;
        return (
            <div className="search-result">
                {Object.keys(this.props.results).map(y => {
                    const book = results[y];
                    return <div key={book.id}>{book.title}</div>
                })}
            </div>
        );
    }
}

export default SearchResult;