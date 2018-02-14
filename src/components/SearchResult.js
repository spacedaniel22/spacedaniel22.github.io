import React, { Component } from "react";
import { Link } from "react-router-dom";

class SearchResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }
    }

    render() {
        const { results } = this.props;
        return (
                <div className="search-result">
                    { Object.keys(this.props.results).map(i => {
                        let book = results[i];
                        return <Link to={`detail/${book.id}`} key={book.id}>
                            <div className="search-result-item">
                                <h3 className="title">{book.title}</h3>
                                { Object.keys(book.authors).map(idx =>
                                    <label key={idx} className="author"> {book.authors[idx]} </label>)
                                }
                            </div>
                        </Link>
                    }) }
                </div>
        );
    }
}

export default SearchResult;