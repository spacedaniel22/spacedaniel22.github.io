import React, { Component } from 'react';

import { search } from "../api/";
import SearchResult from './SearchResult';

const initialState = {
    term: "",
    results: null,
    errorMessage: null
}

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
        this.handleSearch = this.handleSearch.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount() {
        console.log(this.props);
    }

    handleChange = (e) => {
        this.setState({ ...initialState, term: e.target.value });
        this.handleSearch();
        e.preventDefault();
    }

    handleSearch() {
        search(this.state.term)
            .then(data => {
                if (data.notFound) {
                    this.setState({ ...initialState, errorMessage: data.message });
                    return;
                }
                this.setState({ ...initialState, results: data, term: this.state.term });
            });
    }

    render() {
        const { results, term, errorMessage } = this.state;
        let searchResults = null;
        if (results) {
            searchResults = <SearchResult results={results}/>
        } else if (errorMessage) {
            searchResults = <h3 className="error-message">{errorMessage}</h3>
        }
        return (
            <section>
                <form className="search" autoComplete="off">
                    <input type="text"
                        value={term}
                        name="search"
                        className="search"
                        onChange={this.handleChange} />
                    {/* <input type="submit" value="Search" className="button" /> */}
                </form>
                { searchResults }
            </section>
        );
    }
}

export default Search;