import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../styles/components/movieCard.css';
import styled from 'styled-components';

const SelectedMovieStyle = styled.div`
  outline: 5px solid #8370d3; 
`;

const MovieCardStyle = styled.div`
margin: 15px auto;
width: 60%;
position: relative;
text-align: center;

img { 
  width: 100%;
  height: auto;
}
`;

const MovieCardOverlay = styled.div`
background: rgba(0,0,0,0.5);
opacity: 0;
position: absolute;
top: 0px;
left: 0px;
width: 100%;
height: 100%;
&:hover {
  opacity: 1
}
`;

const MovieCardText = styled.p`
z-index: 5;
margin-top: 25%;
color: white;
`;

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
