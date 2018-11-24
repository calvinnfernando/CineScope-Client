import React, { Component } from 'react';
import MovieList from './MovieList';
import MovieService from '../../services/MovieService';
import {getScrollDownPercentage} from '../../services/scrollHelper';
import '../../styles/components/movieCard.css';

class Movies extends Component {

    constructor() {
        super();

        this.state = {
            movies: [],
            currentPage: 1,
            query: ""
        };

        this.handleInput = this.handleInput.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
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
    handleScroll() {
        let percentageScrolled = getScrollDownPercentage(window);
        //console.log("Percentage Scrolled: ", percentageScrolled);
        if (percentageScrolled > 0.8) {
            const nextPage = this.state.currentPage + 1;
            MovieService.getSearchMovies(this.state.query, nextPage)
                .then((movies) => this.state.movies.concat(movies))
                .then((newMovies) => this.setState({movies: newMovies}));

            this.setState({currentPage: this.state.currentPage + 1});
        } 
    }

    render() {
        return (
            <div className="container-fluid" >
                <div className="row">
                    <div className="col-sm-12">
                        <div className="md-form mt-0">
                            <input className="form-control" onInput={this.handleInput} type="text" placeholder="Search" aria-label="Search movie title" />
                        </div>
                    </div>
                </div>
                <div className="d-flex flex-row mt-2">
                    <div className="col-sm-12">
                        <MovieList movies={this.state.movies} />
                    </div>
                </div>
            </div>
        );
    }
}

export default Movies;