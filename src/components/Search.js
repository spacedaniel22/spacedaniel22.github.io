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
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        if (this.props.match.params.term) {
            this.setState({ ...initialState, term: this.props.match.params.term });
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.term !== this.state.term
            && this.state.term
            && (prevState.term.length > 1 || prevProps.match.params.term)) {
            this.handleSearch();
        }
    }

    handleChange = (e) => {
        this.setState({ ...initialState, term: e.target.value });
        this.props.history.replace(`/search/${e.target.value}`);
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

    handleSubmit(e) {
        e.preventDefault();
    }

    render() {
        const { results, errorMessage } = this.state;
        let searchResults = null;
        if (results) {
            searchResults = <SearchResult results={this.state.results}/>
        } else if (errorMessage) {
            searchResults = <h3 className="error-message">{errorMessage}</h3>
        }
        return (
            <section>
                <form className="search" autoComplete="off" onSubmit={this.handleSubmit}>
                    <input type="text"
                        value={this.state.term}
                        name="search"
                        className="search"
                        onChange={this.handleChange} />
                </form>
                {this.state.term}
                { searchResults }
            </section>
        );
    }
}

export default Search;