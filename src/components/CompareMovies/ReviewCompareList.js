import React, { Component } from 'react';
import styled from 'styled-components';
import ComparitronMovieList from './ComparitronMovieList';
import MovieService from '../../services/MovieService';
import ReviewCompare from './ReviewCompare';

class ReviewCompareList extends Component{
  constructor(props) {
		super(props);
		
		this.state = {
			movieTitles: []
		}
	}
	
	componentDidMount() {
		var newMovieTitles = [];
		this.props.movies.forEach((movie) => {
			newMovieTitles.push(movie.title);
		});
		this.setState({ movieTitles: newMovieTitles });
	}

	componentWillUpdate(nextProps, nextState) {
		console.log('one level up')
		console.log(this.state.movieTitles)
		console.log(nextState.movieTitles)
		if (nextProps.movies !== this.props.movies) {
			console.log('here?')
		}
	}

  render(){

    return(
      <div style={{ width: "100%", height: 500, backgroundColor: "white" }}>
	  	{this.props.chartSelections.map(item => (
				<div>
			<ReviewCompare
				 movies={this.props.movies}
				 movieTitles={this.state.movieTitles}
				chartType={item}
			/><hr/>
				</div>
		))}
      </div>
    );
  }
}

export default ReviewCompareList;
