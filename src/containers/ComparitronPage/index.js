import React, { Component } from 'react';
import styled from 'styled-components';
import { Nav, Navbar, NavItem, NavLink } from 'reactstrap';
import logo from '../../components/img/logo.svg';
import CompareMovies from '../../components/CompareMovies';

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


class ComparitronPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieSelections: ["Star Wars", "Avatar"],
      chartSelections: [],
      list: [],
      movieInput: ''
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    let list = this.state.list;
    const newItem = this.state.movieInput;
    const form = document.getElementById("addItemForm");

    if(newItem !== "") {
      list.push(newItem);
      this.setState({
        list: list,
        movieInput: ''
      });
      form.reset();
    }
  }

  removeItem(item) {
    const list = this.state.list.slice();

    list.some((el,i) => {
      if(el === item) {
        list.splice(i,1);
        return true;
      }
    });

    this.setState({
      list: list
    });
  }

  removeMovie(item) {
    const movieSelections = this.state.movieSelections;

    movieSelections.some((el,i) => {
      if(el === item) {
        movieSelections.splice(i,1);
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

    var done = chartSelections.some((el,i) => {
      if(el === event.target.id) {
        chartSelections.splice(i,1);
        document.getElementById(event.target.id).style.borderColor = "transparent";
        return true;
      }
    });

    if(!done) {
      chartSelections.push(event.target.id);
      document.getElementById(event.target.id).style.borderColor = "gray";
    }

    this.setState({
      chartSelections: chartSelections
    });
  }

  render() {
    return(
      <div>
        <Navbar color="warning" light expand="md">
          <LogoStyle>
              <a href="/"><img src={logo} alt='CineScope' /></a>
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
                  placeholder="Enter a search tag"
                  value={this.state.movieInput}
                  onChange={event => this.setState({ movieInput: event.target.value })}/>
                <ul style={{ paddingTop: 5, paddingRight: 5, marginLeft: 0, display: "inline-flex", float: "left", flexWrap: "wrap" }}>
                  {this.state.list.map(item => (
                    <li key={item}
                      style={{ listStyleType: "none", borderRadius: 15, borderColor: "transparent", borderWidth: 1,
                      borderStyle: "solid", backgroundColor: "#feeecd", fontSize: 15, width: 90, marginRight: 5, marginBottom: 5 }}>
                      {item} &nbsp;
                      <span style={{ cursor: "pointer" }} onClick={ () => this.removeItem(item)}>
                      x
                      </span>
                    </li>
                    ))}
                </ul>
              </form>
            </Sidebars>
            <MainContent>
              {this.state.chartSelections.map(item => (
                <CompareMovies chartType={item} movies={this.state.movieSelections} />
              ))}
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
                  <MovieSelection key={item}>
                    <span style={{ cursor: "pointer", color: "#dedede", fontSize: 17 }} onClick={() => this.removeMovie(item)}>X</span>
                    &nbsp; &nbsp; {item}
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
