import React, { Component } from 'react';
import styled from 'styled-components';


//const ChartDiv = styled.div`
//  width: 100%;
//  height: 500px;
//  max-height: 600px;
//`;

class CompareMovies extends Component{
  constructor(props) {
    super(props);
  }

  componentWillMount() {

  }

  render(){
    const [ movieA, movieB ] = this.props.movies;

    return(
      <div style={{ overflow: "hidden", margin: 0 }}>
        <div id="chartdiv" style={{ width: "100%", height: 500 }}>
        </div>
      </div>
    );
  }
}

export default CompareMovies;
