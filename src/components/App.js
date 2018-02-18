import React, { Component } from 'react';
import '../styles/App.css';

import Routes from "../Routes/";
import Header from './Header';

class App extends Component {
	render() {
		return (
			<div className="App">
				<Header title="Books" />
				<Routes />
			</div>
		);
	}
}

export default App;
