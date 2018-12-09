import React, { Component } from 'react';
import ReviewCompare from './ReviewCompare';
import ReviewCompareListStyle from '../../styles/components/CompareMovies/reviewcomparelist';


class ReviewCompareList extends Component{
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
