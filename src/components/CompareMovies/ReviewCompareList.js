import React, { Component } from 'react';
import styled from 'styled-components';
import ComparitronMovieList from './ComparitronMovieList';
import MovieService from '../../services/MovieService';
import ReviewCompare from './ReviewCompare';
import ReviewCompareListStyle from '../../styles/components/CompareMovies/reviewcomparelist';

class ReviewCompareList extends Component{
  constructor(props) {
		super(props);
	}
  
  render(){
    return(
      <div style={ReviewCompareListStyle.style}>
	  	{this.props.chartSelections.map(item => (
				<div>
			<ReviewCompare
				movies={this.props.movies}
        chartType={item}
			/><hr/>
				</div>
		))}
      </div>
    );
  }
}

export default ReviewCompareList;
