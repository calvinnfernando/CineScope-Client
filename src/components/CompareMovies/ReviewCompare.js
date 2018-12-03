import React, { Component } from 'react';
import styled from 'styled-components';
import MovieService from '../../services/MovieService';
import {Pie} from 'react-chartjs-2';

class ReviewCompare extends Component {
	constructor(props) {
		super(props);

		this.state = {
			movieTitles: [],
			imdb: {},
			metascore: {},
			rotten_tomatoes: {}
		}
	}

	componentDidMount() {
		this.props.movies.forEach((movie) => {
			var newMovieTitles = this.state.movieTitles;
			newMovieTitles.push(movie.title);
			this.setState({movieTitles: newMovieTitles});
			var imdb_id = '';
			MovieService.getSingleMovie(movie.id).then((movieData) => {
				imdb_id = movieData.imdb_id;
				MovieService.getSingleMovieOMDb(imdb_id).then((movieData) => {
					//console.log(movieData);

					const ratings = movieData.Ratings;
					var rottenTomatoes = "N/A";
					for (const source of ratings) {
						if (source.Source === "Rotten Tomatoes") {
							rottenTomatoes = source.Value;
						}
					}
					var new_rotten_tomatoes = this.state.rotten_tomatoes;
					new_rotten_tomatoes[movie.title] = rottenTomatoes;

					var new_metascore = this.state.metascore;
					new_metascore[movie.title] = movieData.Metascore;

					var new_imdb = this.state.imdb;
					new_imdb[movie.title] = movieData.imdbRating;
		

					this.setState({
						rotten_tomatoes: new_rotten_tomatoes,
						metascore: new_metascore,
						imdb_rating: new_imdb
					});

					
				})


			});
		});

	}

	renderGraphs(chartType) {
		var movieTitles = this.state.movieTitles;
		var rottenTomatoesRatings = [];
		for (var index in this.state.rotten_tomatoes) {
			var ratingWithoutPercentage = parseInt(this.state.rotten_tomatoes[index].split('%')[0]);
			rottenTomatoesRatings.push(ratingWithoutPercentage);	
		}
		console.log(movieTitles)
		console.log(rottenTomatoesRatings)
		const rottenTomatoesData = {
			labels: movieTitles,
			datasets: [{ 
				data: rottenTomatoesRatings,
				backgroundColor: [
					'#44b7fb',
					'#f55f81'
				]
			}]
		};

		const allRottenTomatoesPies = rottenTomatoesRatings.map(rating => {
			var rating = parseInt(rating);
			var otherRating = 100 - rating;
			const data = {
				labels: ['Liked it', 'Disliked it'],
				datasets: [rating, otherRating],
				backgroundColor: [
					'#44b7fb',
					'#f55f81'
				]
			}
			return <Pie data={data} />
		});

		

		if (chartType === "Rotten Tomatoes") {
			return (
				<div>
					<h1>Rotten Tomatoes</h1>
					<div>
						<Pie data={rottenTomatoesData}/>
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
		console.log(this.state.rotten_tomatoes)
		console.log(this.state.imdb)
		console.log(this.state.metascore)
		return (
			<div>
				{this.renderGraphs(this.props.chartType)}
			</div>
		);
	}
};

export default ReviewCompare;
