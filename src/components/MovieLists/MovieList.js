import React from 'react';
import MovieCard from './MovieCard';
import PropTypes from 'prop-types';
import '../../styles/components/movieCard.css';

const MovieList = (props) => {
  const moviesArray = props.movies.map(movie => (<MovieCard key={movie.id} movie={movie} />));
  console.log(props);
   return (
    <div className="card-deck">
      {moviesArray}
    </div>
  )
}

MovieList.defaultProps = {
  movies: []
};

MovieList.propTypes = {
  movies: PropTypes.array
};

export default MovieList;