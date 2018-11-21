import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from './containers/HomePage';
import LoginPage from './containers/LoginPage';
import UserPage from './containers/UserPage';
import SignUpPage from './containers/SignUpPage';

class App extends Component {
	constructor(props){
		super(props);

		this.state = {
			movies: [],
		}
	}
	render(){
		return (
			<Switch>
				<Route exact path="/" component={HomePage}/>
				<Route path="/login" component={LoginPage}/>
				<Route path="/register" component={SignUpPage}/>
				<Route path="/profile" component={UserPage}/>
			</Switch>
		);
	}
}

export default App;
