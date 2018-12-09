import React, { Component } from 'react';
import styled from 'styled-components';
import MovieService from '../../services/MovieService';
import { Pie, Bar } from 'react-chartjs-2';

const ChartStyle = styled.div`
	margin: 20px auto;
`;

class ReviewCompare extends Component {
	constructor(props) {
		super(props);

		this.state = {
			movieTitles: [],
			imdb: {},
			metascore: {},
			rotten_tomatoes: {}
		}

		this.setData = this.setData.bind(this);
	}

	componentDidMount() {
		//const moviesArray = this.props.movies;
		//this.setState({ movies: moviesArray })
		this.setData();
	}

	UNSAFE_componentWillReceiveProps(newProps) {
		this.setState({
			movieTitles: [],
			imdb: {},
			metascore: {},
			rotten_tomatoes: {}
		})
		this.setData();
		this.renderGraphs(this.props.chartType);
	}

	setData() {
		this.props.movies.forEach((movie) => {
			var newMovieTitles = this.state.movieTitles;
			newMovieTitles.push(movie.title);
			this.setState({ movieTitles: newMovieTitles });
			var imdb_id = '';
			MovieService.getSingleMovie(movie.id).then((movieData) => {
				imdb_id = movieData.imdb_id;
				MovieService.getSingleMovieOMDb(imdb_id).then((movieData) => {

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
		// Used in all chart types
		var index;
		var rating;
		// Rotten tomatoes
		const allRottenTomatoesPies = [];
		for (index in this.state.rotten_tomatoes) {
			rating = parseInt(this.state.rotten_tomatoes[index]);
			var otherRating = 100 - rating;
			const data = {
				labels: ['Liked it', 'Disliked it'],
				datasets: [{
					data: [rating, otherRating],
					backgroundColor: [
						'#44b7fb',
						'#f55f81'
					]
				}]
			}
			allRottenTomatoesPies.push(<div><Pie data={data} /><h4 style={{ color: 'gray', marginBottom: '40px' }}>{index}</h4></div>);
		}

		// Imdb
		const imdbLabels = [];
		const imdbRatings = [];

		for (var index in this.state.imdb) {
			var rating = parseFloat(this.state.imdb[index]);

			imdbRatings.push(rating);
			imdbLabels.push(index);
		}
		const imdbData = {
			labels: imdbLabels,
			datasets: [{
				label: 'IMDb Rating',
				backgroundColor: 'rgba(136, 239, 231, 0.5)',
				data: imdbRatings
			}]
		}

		// Metacritic
		const metascoreLabels = [];
		const metascoreRatings = [];
		for (index in this.state.metascore) {
			rating = parseInt(this.state.metascore[index]);
			metascoreRatings.push(rating);
			metascoreLabels.push(index);
		}
		const metacriticData = {
			labels: metascoreLabels,
			datasets: [{
				label: 'Metascore',
				backgroundColor: 'rgba(255, 173, 114, 0.5)',
				data: metascoreRatings
			}]
		}

		if (chartType === "Rotten Tomatoes") {
			return (
				<ChartStyle>
					<h2>Rotten Tomatoes</h2>
					<div>
						{allRottenTomatoesPies}
					</div>
				</ChartStyle>
			);
		}
		else if (chartType === "IMDb") {
			return (
				<ChartStyle>
					<h2>IMDb</h2>
					<div>
						<Bar data={imdbData} options={{
							scales: {
								yAxes: [{
									ticks: {
										beginAtZero: true,
										max: 10
									}
								}]
							}
						}} />
					</div>
				</ChartStyle>
			);
		}
		else if (chartType === "Metacritic") {
			return (
				<ChartStyle>
					<h2>Metacritic</h2>
					<div>
						<Bar data={metacriticData} options={{
							scales: {
								yAxes: [{
									ticks: {
										beginAtZero: true,
										max: 100
									}
								}]
							}
						}} />
					</div>
				</ChartStyle>
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
