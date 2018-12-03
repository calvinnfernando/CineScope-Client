import React, { Component } from 'react';
import styled from 'styled-components';
import MovieService from '../../services/MovieService';

class ReviewCompare extends Component {
	constructor(props) {
		super(props);

		this.state = {

		}
	}

	componentDidMount() {
		console.log(this.props.movies[0].imdb_id);
		this.props.movies.forEach((movie) => {
			var imdb_id = '';
			console.log(movie.id);
			MovieService.getSingleMovie(movie.id).then((movieData) => {
				imdb_id = movieData.imdb_id;
				console.log(imdb_id);
				MovieService.getSingleMovieOMDb(imdb_id).then((movieData) => {
					console.log(movieData);
				})

				/*
				const ratings = movie.Ratings;
				var rottenTomatoes = "N/A";
				for (const source of ratings) {
				  if (source.Source === "Rotten Tomatoes") {
					rottenTomatoes = source.Value;
				  }
				}
				var rated = movie.Rated;
				if (rated === "N/A") {
				  rated = "Not yet rated";
				}
				this.setState({
				  director: movie.Director,
				  actors: movie.Actors,
				  runtime: movie.Runtime,
				  rated: rated,
				  rotten_tomatoes: rottenTomatoes,
				  metascore: movie.Metascore,
				  imdb_rating: movie.imdbRating
				});*/
			});
		});

	}

	renderGraphs(chartType) {
		if (chartType === "Rotten Tomatoes") {
			return (
				<div>
					<p>Rotten Tomatoes</p>
					<div>

					</div>
					<div>
						<p>Avengers</p>
						<p>Act of Valor</p>
					</div>
				</div>
			);
		}
		else if (chartType === "IMDb") {
			return (
				<div>
					<p>Rotten Tomatoes</p>
					<div>

					</div>
				</div>
			);
		}
		else if (chartType === "Metacritic") {
			return (
				<div>
					<p>Rotten Tomatoes</p>
					<div>

					</div>
				</div>
			);
		}
		else if (chartType === "Box Office") {
			return (
				<div>
					<p>Rotten Tomatoes</p>
					<div>

					</div>
				</div>
			);
		}
		else if (chartType === "Overview") {
			return (
				<div>
					<h1>Overview</h1>
					<div>

					</div>
				</div>
			);
		}
	}


	render() {

		return (
			<div>
				{this.renderGraphs(this.props.chartType)}
			</div>
		);
	}
};

export default ReviewCompare;
