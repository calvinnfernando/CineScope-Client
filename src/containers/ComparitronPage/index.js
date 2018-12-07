import React, { Component } from 'react';
import styled from 'styled-components';
import { Navbar } from 'reactstrap';
import ComparitronMovieList from '../../components/CompareMovies/ComparitronMovieList';
import MovieService from '../../services/MovieService';
import logo from '../../components/img/logo.svg';
import ReviewCompareList from '../../components/CompareMovies/ReviewCompareList';

import '../../styles/components/comparitron.css';


const LogoStyle = styled.div`
  img {
	   height: 60px;
  }
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

const Sidebars = styled.div`
  position: relative;
  padding-right: 15px;
  padding-left: 15px;
  flex: 1;
  align-items: center;
  background-color: #ffeead;
  text-align: center;
  height: 100vh;
`;

const MainContent = styled.div`
  position: relative;
  padding-right: 15px;
  padding-left: 15px;
  flex: 3;
  height: 100vh;
  background-color: white;
  overflow-y: scroll;
  text-align: center;
`;


const MovieSelection = styled.li`
  border-radius: 15px;
  border-color: transparent;
  border-width: 1px;
  border-style: solid;
  background-color: #fff;
  font-family: Calibri;
  font-size: 17px;
  width: 100%;
  margin-top: 5px;
  cursor: pointer;
  outline: none !important;
  list-style-type: none;
  text-align: left;
  padding-left: 15px;
`;

const ComparitronMovieHolder = styled.div`
  background-color: #fff;
  border-radius: 15px;
  width: 100%;
  height: 82%;
  overflow-y: scroll;
`;


class ComparitronPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieSelections: [],
      chartSelections: [],
      movies: [],
      movieInput: ''
    }
    this.selectMovie = this.selectMovie.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault();
    var query = this.state.movieInput;
    MovieService.getSearchMovies(query).then((movies) => {
      this.setState({ movies: movies, query: query });
    })
  }

  selectMovie(movie) {
    var movieSelections = this.state.movieSelections;

    var movieExists = movieSelections.findIndex((el, i) => {
      return el.id === movie.id;
    });
    if (movieExists !== -1) {
      movieSelections.splice(movieExists, 1);
    }
    else {
      movieSelections.push(movie);
    }

    this.setState({ movieSelections: movieSelections });
    //this.setState({ chartSelections: [] });
  }

  removeMovie(item) {
    const movieSelections = this.state.movieSelections;

    movieSelections.some((el, i) => {
      if (el.id === item.id) {
        movieSelections.splice(i, 1);
        return true;
      }
    });

    this.setState({
      movieSelections: movieSelections
    });
    //this.setState({ chartSelections: [] });
  }

  handleChartSelection(event) {
    event.preventDefault();

    let chartSelections = this.state.chartSelections;

    var done = chartSelections.some((el, i) => {
      if (el === event.target.id) {
        chartSelections.splice(i, 1);
        document.getElementById(event.target.id).style.borderColor = "transparent";
        return true;
      }
    });

    if (!done) {
      chartSelections.push(event.target.id);
      document.getElementById(event.target.id).style.borderColor = "gray";
    }

    this.setState({
      chartSelections: chartSelections
    });
  }

  render() {
    return (
      <div>
        <Navbar className="navbar-style" light expand="md">
          <LogoStyle>
            <a href="/"><img src={logo} alt='CineScope'/></a>
          </LogoStyle>
          <h1 className="comparitron-logo">Comparitron</h1>
        </Navbar>
        <Container>
          <Sidebars>
            <form id="addItemForm" onSubmit={this.handleSubmit.bind(this)}>
              <p className="select-text">SELECT MOVIES</p>
              <input
                style={{ borderRadius: 20, borderWidth: 0, outline: "none", paddingLeft: 15, width: "100%" }}
                type="search"
                placeholder="Enter a movie"
                value={this.state.movieInput}
                onChange={event => this.setState({ movieInput: event.target.value })} />
                {/* Kept in for padding */}
              <ul style={{ paddingTop: 5, paddingRight: 5, marginLeft: 0, display: "inline-flex", float: "left", flexWrap: "wrap" }}>
              </ul>
            </form>
            <ComparitronMovieHolder className="movie-holder">
              <ComparitronMovieList movies={this.state.movies} movieSelections={this.state.movieSelections} selectMovie={this.selectMovie} />
            </ComparitronMovieHolder>
          </Sidebars>
          <MainContent className="scroll">
		  	<ReviewCompareList
				movies={this.state.movieSelections}
				chartSelections={this.state.chartSelections}
			/>
		  </MainContent>
          <Sidebars>
            <p className="select-text">SELECT CHARTS</p>
            <button className="review-selection" id="Rotten Tomatoes" onClick={this.handleChartSelection.bind(this)}>Rotten Tomatoes</button>
            <button className="review-selection" id="IMDb" onClick={this.handleChartSelection.bind(this)}>IMDb</button>
            <button className="review-selection" id="Metacritic" onClick={this.handleChartSelection.bind(this)}>Metacritic</button>
            {/*<button className="review-selection" id="Box Office" onClick={this.handleChartSelection.bind(this)}>Box Office</button>
            <button className="review-selection" id="Overview" onClick={this.handleChartSelection.bind(this)}>Overview</button>*/}
            <hr></hr>
            <p className="select-text">SELECTED MOVIES</p>
            <ul style={{ paddingInlineStart: 0 }}>
              {this.state.movieSelections.map(item => (
                <div className="movie-selection" key={item.title}>
                  <span style={{ cursor: "pointer", color: "#dedede", fontSize: 17 }} onClick={() => this.removeMovie(item)}>X</span>
                  &nbsp; &nbsp; {item.title}
                </div>
              ))}
            </ul>
          </Sidebars>
        </Container>
      </div>
    );
  }
}

export default ComparitronPage;
