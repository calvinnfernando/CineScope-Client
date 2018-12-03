import React, { Component } from 'react';
import MovieList from './MovieList';
import MovieService from '../../services/MovieService';
import {getScrollDownPercentage} from '../../services/scrollHelper';
import { Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class Movies extends Component {

    constructor() {
        super();

        this.state = {
            movies: [],
            currentPage: 1,
            query: "",
            dropdownOpen: false,
            sortOption: '0'
        };

        this.mostPopular = this.mostPopular.bind(this);
        this.leastPopular = this.leastPopular.bind(this);
        this.a_zSorting = this.a_zSorting.bind(this);
        this.z_aSorting = this.z_aSorting.bind(this);
        this.newest = this.newest.bind(this);
        this.oldest = this.oldest.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.previousPage = this.previousPage.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    componentDidMount() {
        MovieService.getPopularMovies().then((movies) => {
            this.setState({ movies: movies, currentPage: 1, query: "" });
        })
    }

    /**
     * This method handles the input for the search bar
     *
     * @param {Event} event
     */
    handleInput(event) {
        var query = event.target.value;
        MovieService.getSearchMovies(query).then((movies) => {
            this.setState({movies: movies, query: query});
        })
    }

    nextPage(event) {
        const nextPage = this.state.currentPage + 1;
        MovieService.getSearchMovies(this.state.query, nextPage)
            .then((movies) => this.state.movies = movies)
            .then((newMovies) => this.setState({movies: newMovies}));
        this.setState({currentPage: this.state.currentPage + 1});
    }

    previousPage(event) {
      if (this.state.currentPage !== 1) {
      const nextPage = this.state.currentPage - 1;
      MovieService.getSearchMovies(this.state.query, nextPage)
          .then((movies) => this.state.movies = movies)
          .then((newMovies) => this.setState({movies: newMovies}));
      this.setState({currentPage: this.state.currentPage - 1});
      }
    }

    // Dropdown Toggler
    toggle() {
      this.setState({
        dropdownOpen: !this.state.dropdownOpen
      });
    }

    // Sorting options
    mostPopular() { this.setState({sortOption: '0'}); }
    leastPopular() { this.setState({sortOption: '1'}); }
    a_zSorting() { this.setState({sortOption: '2'}); }
    z_aSorting() { this.setState({sortOption: '3'}); }
    newest() { this.setState({sortOption: '4'}); }
    oldest() { this.setState({sortOption: '5'}); }

    render() {
        return (
            <div className="jumbotron jumbotron-fluid">
              <div className="container-fluid">
                <p className="h1" align="center">MOVIES</p>
                <div className="col-sm-12 text-right">
                  <Button onClick={this.nextPage}>Next Page</Button>
                  <Button onClick={this.previousPage}>Previous Page</Button>
                  <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                    <DropdownToggle caret>Sort</DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem onClick={this.mostPopular}>Most Popular</DropdownItem>
                      <DropdownItem onClick={this.leastPopular}>Least Popular</DropdownItem>
                      <DropdownItem onClick={this.a_zSorting}>Alphabetical (A-Z)</DropdownItem>
                      <DropdownItem onClick={this.z_aSorting}>Alphabetical (Z-A)</DropdownItem>
                      <DropdownItem onClick={this.newest}>Newest</DropdownItem>
                      <DropdownItem onClick={this.oldest}>Oldest</DropdownItem>
                    </DropdownMenu>
                  </ButtonDropdown>
                </div>
                <div className="col-sm-12 mt-4">
                  <input className="form-control" onInput={this.handleInput} type="text" placeholder="Search" aria-label="Search movie title" />
                </div>
              </div>
              <div className="d-flex flex-row mt-2">
                  <div className="col-sm-12 text-center">
                      <MovieList sortOption={this.state.sortOption} movies={this.state.movies}/>
                  </div>
              </div>
            </div>
        );
    }
}

export default Movies;
