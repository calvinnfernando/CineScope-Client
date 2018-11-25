import React, { Component } from 'react';
import styled from 'styled-components'

const RelatedMoviesStyle = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;

    a, a:hover {
        text-decoration: none;
        color: #777;
    }
`;

const RelatedMovieStyle = styled.div`

`;

class RelatedMovies extends Component {
    
    render() {
        const relatedMovies = ['falseimage', 'needimage', 'imghere'];
        const moviesToDisplay = relatedMovies.map(relatedMovie => { 
            return <RelatedMovieStyle key={relatedMovie}>
                <img src="" alt={relatedMovie} />
                <a href="">Movie Title</a>
                </RelatedMovieStyle>
        }); 

        return (
            <div>
                <h2>RelatedMovies</h2>
                <RelatedMoviesStyle className="row">
                    {moviesToDisplay}
                </RelatedMoviesStyle>
            </div>
        )
    }

}

export default RelatedMovies;