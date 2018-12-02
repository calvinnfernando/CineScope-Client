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
    width: 25%;
    font-size: 24px;
    text-align: center;

    img {
        max-width: 50%;
    }
`;

class RelatedMovies extends Component {

    render() {
        if (!this.props.movies) {
            return <h2>No related movies.</h2>
        }
        const moviesToDisplay = this.props.movies.map(relatedMovie => {
            return <RelatedMovieStyle key={relatedMovie.id}>
                <a href={'/movie/' + relatedMovie.id}>
                    <img src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${relatedMovie.poster_path}`}
                        onError={(e) => { e.target.src = "https://i.imgur.com/SeLMJwk.png" }} alt={relatedMovie} />
                    <div>{relatedMovie.title}</div>
                </a>
            </RelatedMovieStyle>
        });

        return (
            <div>
                <h2>Related Movies</h2>
                <RelatedMoviesStyle className="row">
                    {moviesToDisplay}
                </RelatedMoviesStyle>
            </div>
        )
    }

}

export default RelatedMovies;