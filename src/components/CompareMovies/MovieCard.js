import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../styles/components/movieCard.css';

import {
	SelectedMovieStyle, MovieCardStyle, MovieCardOverlay, MovieCardText
} from '../../styles/components/CompareMovies/moviecard';

class MovieCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: false
    };
    this.toggleSelect = this.toggleSelect.bind(this);

  }

  toggleSelect() {
    if (this.state.selected === true) {
      this.setState({ selected: false });
    } else {
      this.setState({ selected: true });
    }
  }

  render() {
    if (this.state.selected) {
      return (

        <MovieCardStyle onClick={() => { this.props.selectMovie(this.props.movie); this.toggleSelect(); }}>
          <SelectedMovieStyle>
            <img className="card-img-top movie-img"
              src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${this.props.movie.poster_path}`}
              onError={(e) => { e.target.src = "https://i.imgur.com/SeLMJwk.png" }} alt="" width="200" height="300" />

            <MovieCardOverlay>
              <MovieCardText>{this.props.movie.title}</MovieCardText>
            </MovieCardOverlay>
          </SelectedMovieStyle>
        </MovieCardStyle>

      );
    }
    return (
      <MovieCardStyle onClick={() => { this.props.selectMovie(this.props.movie); this.toggleSelect(); }}>
        <img className="card-img-top movie-img"
          src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${this.props.movie.poster_path}`}
          onError={(e) => { e.target.src = "https://i.imgur.com/SeLMJwk.png" }} alt="" width="200" height="300" />
        <MovieCardOverlay>
          <MovieCardText>{this.props.movie.title}</MovieCardText>
        </MovieCardOverlay>

      </MovieCardStyle>
    );
  }
}

MovieCard.defaultProps = {
  movie: {}
};

MovieCard.propTypes = {
  movie: PropTypes.object
};

export default MovieCard;
