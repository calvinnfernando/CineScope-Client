import React, { Component } from 'react';
import styled from 'styled-components';
import ComparitronMovieList from './ComparitronMovieList';
import PieChart from 'react-minimal-pie-chart';
import MovieService from '../../services/MovieService';
import ReviewCompare from './ReviewCompare';

class ReviewCompareList extends Component{
  constructor(props) {
    super(props);
  }

  render(){
    const [ movieA, movieB ] = this.props.movies;
	const movieARating = 0;
	/*MovieService.getSingleMovieOMDb(movieA.imdb_id).then((movie)=> {
		movieARating = movie.Metascore;
	})*/
	const movieBRating = 0;
	/*MovieService.getSingleMovieOMDb(movieB.imdb_id).then((movie)=> {
		movieBRating = movie.Metascore;
	})*/

    return(
      <div style={{ width: "100%", height: 500, backgroundColor: "white" }}>
	  	{this.props.chartSelections.map(item => (
			<ReviewCompare
			 	movieA={movieA.title}
				movieB={movieB.title}
				chartType={item}
				movieARating={movieARating}
				movieBRating={movieBRating}
			/>
		))}
      </div>
    );
  }
}

export default ReviewCompareList;
