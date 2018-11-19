import React, { Component } from 'react';
import MovieList from '../MovieLists/MovieList';
import MovieService from '../../services/MovieService';
import {getScrollDownPercentage} from '../../services/scrollHelper';
import '../../styles/components/movieCard.css';
import styled from 'styled-components';

const RecommendedText = styled.div`
    text-align: left;
    color: #FFFFFF;
    margin: 10px;
    h2 {
        font-size: 24px;
    }
`;

class RecommendedMovies extends Component {

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
        //window.addEventListener('scroll', this.handleScroll);
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

    render() {
        return (
            <div className="container">
                <RecommendedText><h2>Recommended Movies</h2></RecommendedText>
                <div className="d-flex flex-row mt-2">
                    <div className="col-sm-12">
                        <MovieList movies={this.state.movies} />
                    </div>
                </div>
            </div>
        );
    }
}

export default RecommendedMovies;