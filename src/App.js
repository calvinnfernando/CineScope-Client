import React, { Component } from 'react';
import firebase from 'firebase';
import './App.css';

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
			<div className="App">
	  		</div>
		);
	}
}

export default App;
