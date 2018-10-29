import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import createHistory from "history/createBrowserHistory";

import firebase from 'firebase';

import HomePage from './containers/HomePage';

class App extends Component {
	constructor(props){
		super(props);

		// Initialize Firebase
		var config = {
			apiKey: "AIzaSyAm-9jm4Lq3qOzWxMa5r4eDqiqPdIgI11s",
			authDomain: "cine-scope.firebaseapp.com",
			databaseURL: "https://cine-scope.firebaseio.com",
			projectId: "cine-scope",
			storageBucket: "cine-scope.appspot.com",
			messagingSenderId: "692991307960"
		};
		firebase.initializeApp(config);
	}
	render(){
		return (
			<Switch>
				<Route exact path="/" component={HomePage}/>
			</Switch>
		);
	}
}

export default App;
