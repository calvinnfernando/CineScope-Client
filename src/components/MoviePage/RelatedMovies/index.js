import React, { Component } from 'react';
import RelatedMovieStyle from '../../../styles/components/MoviePage/RelatedMovieStyle'
import RelatedMoviesStyle from '../../../styles/components/MoviePage/RelatedMoviesStyle'

class RelatedMovies extends Component {

    render() {
      var moviesToDisplay = ""
        if (this.props.movies) {
          moviesToDisplay = this.props.movies.map(relatedMovie => {
            return <RelatedMovieStyle key={relatedMovie.id}>
                <a href={'/movie/' + relatedMovie.id}>
                    <img src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${relatedMovie.poster_path}`}
                        onError={(e) => { e.target.src = "https://i.imgur.com/SeLMJwk.png" }} alt={relatedMovie} />
                    <div>{relatedMovie.title}</div>
                </a>
                </RelatedMovieStyle>
            });
        }
        if (moviesToDisplay.length === 0) {
            return <h2>No related movies</h2>
        }
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
