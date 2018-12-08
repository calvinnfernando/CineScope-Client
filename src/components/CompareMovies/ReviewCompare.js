import React, { Component } from 'react';
import MovieService from '../../services/MovieService';
import { Pie, Bar } from 'react-chartjs-2';
import { ChartStyle } from '../../styles/components/CompareMovies/reviewcompare';

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
			this.setState({ movieTitles: newMovieTitles });
			var imdb_id = '';
			MovieService.getSingleMovie(movie.id).then((movieData) => {
				imdb_id = movieData.imdb_id;
				MovieService.getSingleMovieOMDb(imdb_id).then((movieData) => {
					console.log(movieData);

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

		// Rotten tomatoes
		const allRottenTomatoesPies = [];
		for (let index in this.state.rotten_tomatoes) {
			let rating = parseInt(this.state.rotten_tomatoes[index]);
			let otherRating = 100 - rating;
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
			allRottenTomatoesPies.push(<div><Pie data={data} /><h4 style={{color: 'gray', marginBottom: '40px'}}>{index}</h4></div>);
		}

		// Imdb
		const imdbLabels = [];
		const imdbRatings = [];
		for (let index in this.state.imdb) {
			let rating = parseInt(this.state.imdb[index]);
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
		for (let index in this.state.metascore) {
			let rating = parseInt(this.state.metascore[index]);
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

		// Box Office
		const boxOfficeLabels = [];
		const boxOfficeRatings = [];
		for (let index in this.state.box_office) {
			let rating = parseInt(this.state.box_office[index]);
			boxOfficeRatings.push(rating);
			boxOfficeLabels.push(index);
		}
		const boxOfficeData = {
			labels: boxOfficeLabels,
			datasets: [{
				label: 'Box Office Revenue',
				backgroundColor: 'rgba(204, 112, 249, 0.5)',
				data: boxOfficeRatings
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
		else if (chartType === "Box Office") {
			return (
				<ChartStyle>
					<h2>Box Office</h2>
					<div>
					<Bar data={boxOfficeData} options={{
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
