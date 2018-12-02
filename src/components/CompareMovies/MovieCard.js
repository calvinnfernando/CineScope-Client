import React, {Component} from 'react';
import PropTypes from 'prop-types';
import '../../styles/components/movieCard.css';
import styled from 'styled-components';

const SelectedMovieStyle = styled.div`
img { 
  border-style: solid;
  border-width: 5px;
  border-color: white;
}
`;

class MovieCard extends Component {
  render() {
    return (
      <SelectedMovieStyle>
    <div className="movie-card" onClick={() => this.props.selectMovie(this.props.movie)}>
        <div className="movie-card card">
        
            <img className="card-img-top movie-img"
              src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${this.props.movie.poster_path}`}
              onError={(e) => {e.target.src="https://i.imgur.com/SeLMJwk.png"}} alt="" width="200" height="300" />
              
            
                <div className="card-img-overlay movie-description">
                    <p className="card-text">{this.props.movie.title}</p>
                </div>
                
        </div>
    </div>
  </SelectedMovieStyle>
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
