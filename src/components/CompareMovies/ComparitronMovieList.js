import React from 'react';
import MovieCard from './MovieCard';
import PropTypes from 'prop-types';

const MovieList = (props) => {
  const moviesArray = props.movies.map(movie => (<MovieCard key={movie.id} movie={movie} selectMovie={props.selectMovie} />));
  console.log(props);
   return (
    <div>
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