import React, { Component } from 'react';

import { search } from "../api/";
import SearchResult from './SearchResult';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            term: ""
        }
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleChange = (e) => {
        this.setState({ term: e.target.value });
    }

    handleSearch(e) {
        search(this.state.term)
            .then(data => this.setState({results: data}));
        e.preventDefault();
    }

    render() {
        let searchResults = null;
        if (this.state.results) {
            searchResults = <SearchResult results={this.state.results}/>
        }
        return (
            <section>
                <form className="search" onSubmit={this.handleSearch} autoComplete="on">
                    <input type="search"
                        autoComplete="on"
                        value={this.state.term}
                        name="search"
                        className="search"
                        onChange={this.handleChange} />

                    <input type="submit" value="Search" className="button" />
                </form>
                { searchResults }
            </section>
        );
    }
}

export default Search;