import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import MoviePage from '../../containers/MoviePage';
import '../../styles/components/movieCard.css';

const MovieCard = (props) => (
  <div className="movie-card">
      <div className="movie-card card">
          <img className="card-img-top movie-img"
            src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${props.movie.poster_path}`}
            onError={(e) => {e.target.src="https://i.imgur.com/SeLMJwk.png"}} alt="" width="200" height="300" />
            <Route path={"/" + props.movie.title.split(" ").join("_")} component={MoviePage}/>
            <a href={"/" + props.movie.title.split(" ").join("_")}>
              <div className="card-img-overlay movie-description">
                  <p className="card-text">{props.movie.title}</p>
              </div>
            </a>
      </div>
  </div>
);

MovieCard.defaultProps = {
  movie: {}
};

MovieCard.propTypes = {
  movie: PropTypes.object
};

export default MovieCard;
