import React, {Component} from 'react';
import Movies from '../../components/MovieLists/Movies';
import Header from '../../components/Header';
import styled from 'styled-components';

const StyledMovies = styled.div`
    padding: 10px;
    margin: 10px;
    border-radius: 15px;
    background-color: #e9ecef;
`;

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
