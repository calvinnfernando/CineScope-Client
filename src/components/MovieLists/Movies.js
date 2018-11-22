import React, { Component } from 'react';
import MovieList from './MovieList';
import MovieService from '../../services/MovieService';
import {getScrollDownPercentage} from '../../services/scrollHelper';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

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
        this.handleScroll = this.handleScroll.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    componentDidMount() {
        MovieService.getPopularMovies().then((movies) => {
            this.setState({ movies: movies, currentPage: 1, query: "" });
        })
        window.addEventListener('scroll', this.handleScroll);
    }

    /**
     * This method handle the input for the search bar
     *
     * @param {Event} event
     */
    handleInput(event) {
        var query = event.target.value;
        MovieService.getSearchMovies(query).then((movies) => {
            this.setState({movies: movies, query: query});
        })
    }

    /**
     * This method handle when the user has scrolled down
     * This method must load an additional movie list
     *
     * @param {Event} event
     */
    handleScroll(event) {
        //console.log(nextPage);
        let percentageScrolled = getScrollDownPercentage(window);
        if (percentageScrolled > .8) {
            const nextPage = this.state.currentPage + 1;
            console.log(nextPage);
            MovieService.getSearchMovies(this.state.query, nextPage)
                .then((movies) => this.state.movies.concat(movies))
                .then((newMovies) => this.setState({movies: newMovies}));

            this.setState({currentPage: this.state.currentPage + 1});
        }
    }

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

//<DropdownItem onClick={this.handleScroll}>Next Page Test</DropdownItem>

    render() {
        return (
            <div className="container-fluid" >
                <div className="row">
                    <div className="col-sm-12">
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
                        <div className="md-form mt-0">
                          <input className="form-control" onInput={this.handleInput} type="text" placeholder="Search" aria-label="Search movie title" />
                        </div>
                    </div>
                </div>
                <div className="d-flex flex-row mt-2">
                    <div className="col-sm-12">
                        <MovieList sortOption={this.state.sortOption} movies={this.state.movies}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Movies;
