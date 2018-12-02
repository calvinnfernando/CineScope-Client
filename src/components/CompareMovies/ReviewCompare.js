import React, { Component } from 'react';
import styled from 'styled-components';
import ComparitronMovieList from './ComparitronMovieList';
import PieChart from 'react-minimal-pie-chart';

//const ChartDiv = styled.div`
//  width: 100%;
//  height: 500px;
//  max-height: 600px;
//`;

class ReviewCompare extends Component{
  constructor(props) {
    super(props);
  }

  render(){
    const [ movieA, movieB ] = this.props.movies;

    return(
      <div style={{ overflow: "hidden", margin: 0 }}>
        
      </div>
    );
  }
}

export default ReviewCompare;
