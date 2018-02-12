import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Header extends Component {
    render() {
        return (
            <header className="header">
                <h1 className="title">{ this.props.title }</h1>
            </header>
        );
    }
}

Header.propTypes = {
    title: PropTypes.string.isRequired
};

Header.defaultProps = {
    title: "Welcome"
}

export default Header;