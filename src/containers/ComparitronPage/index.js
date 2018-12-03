import React, { Component } from 'react';
import styled from 'styled-components';
import { Navbar } from 'reactstrap';
import ComparitronMovieList from '../../components/CompareMovies/ComparitronMovieList';
import MovieService from '../../services/MovieService';
import logo from '../../components/img/logo.svg';
import ReviewCompareList from '../../components/CompareMovies/ReviewCompareList';


const ComparitronLogo = styled.p`
  font-size: 25px;
  margin: auto 45% auto 35%;

  font-family: Calibri;
  color: white;
`;

const LogoStyle = styled.div`
  img {
	   height: 60px;
  }
`;

const TMStyle = styled.sup`
  font-size: 15px;
  font-weight: normal;
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
  background-color: #ffe499;
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

const ReviewSelection = styled.button`
  border-radius: 15px;
  border-color: transparent;
  border-width: 1px;
  border-style: solid;
  background-color: #feeecd;
  font-family: Calibri;
  font-size: 12px;
  outline: none;
  width: 100%;
  margin-top: 5px;
  cursor: pointer;
  outline: none !important;
  text-align: left;
  padding-left: 10px;
`;

const MovieSelection = styled.li`
  border-radius: 15px;
  border-color: transparent;
  border-width: 1px;
  border-style: solid;
  background-color: #feeecd;
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
  background-color: #feeecd;
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
        <Navbar color="warning" light expand="md">
          <LogoStyle>
            <a href="/"><img src={logo} alt='CineScope'/></a>
          </LogoStyle>
          <ComparitronLogo>Comparitron<TMStyle>TM</TMStyle></ComparitronLogo>
        </Navbar>
        <Container>
          <Sidebars>
            <form id="addItemForm" onSubmit={this.handleSubmit.bind(this)}>
              <p style={{ fontFamily: "Calibri", paddingTop: 15, fontWeight: "bold", color: "gray" }}>SELECT MOVIES</p>
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
            <ComparitronMovieHolder>
              <ComparitronMovieList movies={this.state.movies} selectMovie={this.selectMovie} />
            </ComparitronMovieHolder>
          </Sidebars>
          <MainContent>
		  	<ReviewCompareList
				movies={this.state.movieSelections}
				chartSelections={this.state.chartSelections}
			/>
		  </MainContent>
          <Sidebars>
            <p style={{ paddingTop: 15, fontFamily: "Calibri", fontWeight: "bold", color: "gray" }}>SELECT CHARTS</p>
            <ReviewSelection id="Rotten Tomatoes" onClick={this.handleChartSelection.bind(this)}>Rotten Tomatoes</ReviewSelection>
            <ReviewSelection id="IMDb" onClick={this.handleChartSelection.bind(this)}>IMDb</ReviewSelection>
            <ReviewSelection id="Metacritic" onClick={this.handleChartSelection.bind(this)}>Metacritic</ReviewSelection>
            <ReviewSelection id="Box Office" onClick={this.handleChartSelection.bind(this)}>Box Office</ReviewSelection>
            <ReviewSelection id="Overview" onClick={this.handleChartSelection.bind(this)}>Overview</ReviewSelection>
            <hr></hr>
            <p style={{ fontWeight: "bold", fontColor: "grey", fontFamily: "Calibri", color: "gray" }}>SELECTED MOVIES</p>
            <ul style={{ paddingInlineStart: 0 }}>
              {this.state.movieSelections.map(item => (
                <MovieSelection key={item.title}>
                  <span style={{ cursor: "pointer", color: "#dedede", fontSize: 17 }} onClick={() => this.removeMovie(item)}>X</span>
                  &nbsp; &nbsp; {item.title}
                </MovieSelection>
              ))}
            </ul>
          </Sidebars>
        </Container>
      </div>
    );
  }
}

export default ComparitronPage;
