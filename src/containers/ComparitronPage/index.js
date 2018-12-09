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

const ComparitronMovieHolder = styled.div`
  background-color: #fff;
  border-radius: 15px;
  width: 100%;
  height: 82%;
  overflow-y: scroll;
`;

const FullNotification = styled.span`
  position: fixed;
  top: 4em;
  left: 50%;
  transform: translate(-50%);
  z-index: 10;
  background-color: #384491;
  padding: 8px 12px;
  border-radius: 8px;
  color: #FFFFFF;
  transition: 0.5s;
  opacity: 0;

  &.show {
    opacity: 1;
  }

  a {
    color: #999;
  }

  a:hover {
    text-decoration: none;
    color: white;
  }
`;


class ComparitronPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieSelections: [],
      chartSelections: [],
      movies: [],
      movieInput: '',
      fullNotification: false,
      fullNotificationFade: false
    }
    this.selectMovie = this.selectMovie.bind(this)
    this.fullNotification = this.fullNotification.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault();
    var query = this.state.movieInput;
    MovieService.getSearchMovies(query).then((movies) => {
      this.setState({ movies: movies, query: query });
    })
  }

  fullNotification() {
    this.setState({ fullNotification: true });
    this.setState({ fullNotificationFade: true });
    var refToThis = this;
    setTimeout(function(){
      refToThis.setState({fullInNotificationFade: false});
      setTimeout(function(){
        refToThis.setState({fullNotification: false});
      },500);
    },1000);
  }

  selectMovie(movie) {
    var movieSelections = this.state.movieSelections;

    if (movieSelections.length === 5) {
      this.fullNotification();
      return;
    }

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
      } else {
        return false;
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
      } else {
        return false;
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
        {this.state.fullNotification && <FullNotification className={this.state.fullNotificationFade ? 'show' : 'none'}>Please select up to a maximum of 5 movies.</FullNotification>}
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
