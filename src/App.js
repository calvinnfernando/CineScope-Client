import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from './containers/HomePage';
import LoginPage from './containers/LoginPage';
import UserPage from './containers/UserPage';
import SignUpPage from './containers/SignUpPage';
import MoviePage from './containers/MoviePage';
import AllMoviesPage from './containers/AllMoviesPage';
import ComparitronPage from './containers/ComparitronPage';

import { withAuthentication } from './components/Sessions';

const App = (fprops) => (
	<Switch>
		<Route exact path="/" component={HomePage}/>
		<Route path="/login" component={LoginPage}/>
		<Route path="/profile" component={UserPage}/>
		<Route
				path="/movie"
				render={(props) => <MoviePage {...props} {...fprops} />}
		/>
		<Route path="/movie/:id" component={MoviePage} />
		<Route path="/all-movies" component={AllMoviesPage}/>
		<Route path="/register" component={SignUpPage}/>
		<Route path="/Comparitron" component={ComparitronPage}/>
	</Switch>
);

export default withAuthentication(App);
