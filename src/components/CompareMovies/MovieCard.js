import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../styles/components/movieCard.css';
import styled from 'styled-components';

const SelectedMovieStyle = styled.div`
  border-style: solid;
  border-width: 5px;
  border-color: white;
`;

const MovieCardStyle = styled.div`
width: 80%;

`;

const MovieCardOverlay = styled.div`
transition: .5s ease;
opacity: 0;
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
-ms-transform: translate(-50%, -50%);
text-align: center;
`;

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
      console.log("set to false");
    } else {
      this.setState({ selected: true });
      console.log("set to true");
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
              <p className="card-text">{this.props.movie.title}</p>
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
            <p className="card-text">{this.props.movie.title}</p>
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
