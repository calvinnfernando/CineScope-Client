import React, { Component } from 'react';
import styled from 'styled-components';
import ComparitronMovieList from './ComparitronMovieList';
import MovieService from '../../services/MovieService';
import ReviewCompare from './ReviewCompare';

class ReviewCompareList extends Component{
  constructor(props) {
		super(props);
	}


  render(){
    return(
      <div style={{ width: "100%", height: 500, backgroundColor: "white" }}>
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
