import React, {Component} from 'react';
import Movies from '../../components/MovieLists/Movies';
import Header from '../../components/Header';
import StyledMovies from '../../styles/containers/AllMovies/StyledMovies'

class AllMoviesPage extends Component {
    render() {
        return (
            <div>
                <Header/>
                <StyledMovies className="container">
                    <Movies/>
                </StyledMovies>
            </div>
        );
    }
}

export default AllMoviesPage;
