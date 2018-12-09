import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../styles/components/movieCard.css';

import {
	MovieCardStyle, MovieCardOverlay, MovieCardText
} from '../../styles/components/CompareMovies/moviecard';

class MovieCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: false,
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

  componentDidMount() {
    const movieID = this.props.movie.id;
    var inMovieSelections = this.props.movieSelections.find((movie) => {
      return movie.id === movieID;
    });
    this.setState({ selected: inMovieSelections, movieSelections: this.props.movieSelections });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    var inMovieSelections = nextProps.movieSelections.find((movie) => {
      const movieID = nextProps.movie.id;
      return movie.id === movieID;
    });
    return { selected: inMovieSelections };
  }

  render() {
    return (
      <MovieCardStyle onClick={() => { this.props.selectMovie(this.props.movie); this.toggleSelect(); }}>
        <div className={this.state.selected ? 'card-border' : 'none'}>
          <img className="card-img-top movie-img"
            src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${this.props.movie.poster_path}`}
            onError={(e) => { e.target.src = "https://i.imgur.com/SeLMJwk.png" }} alt="" width="200" height="300" />
          <MovieCardOverlay>
            <MovieCardText>{this.props.movie.title}</MovieCardText>
          </MovieCardOverlay>
        </div>
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
