import React, { Component } from 'react';
import ReviewCompare from './ReviewCompare';

class ReviewCompareList extends Component {
  
  render(){

		console.log('In Review Compare List');
		console.log(this.props.movies);

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
