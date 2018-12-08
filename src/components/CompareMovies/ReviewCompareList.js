import React, { Component } from 'react';
import ReviewCompare from './ReviewCompare';
import ReviewCompareListStyle from '../../styles/components/CompareMovies/reviewcomparelist';

class ReviewCompareList extends Component{
  render(){

		console.log('In Review Compare List');
		console.log(this.props.movies);

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
