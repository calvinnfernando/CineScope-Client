import React from 'react';
import MovieCard from './MovieCard';
import PropTypes from 'prop-types';

const MovieList = (props) => {
  var moviesArray = {};
  switch (props.sortOption) {
    default: {
      moviesArray = props.movies.map(movie => (<MovieCard key={movie.id} movie={movie} />));
      break;
    }
    case '0': {
      moviesArray = props.movies.sort((a, b) => b.popularity - a.popularity).map(movie => (<MovieCard key={movie.id} movie={movie} />));
      break;
    }
    case '1': {
      moviesArray = props.movies.sort((a, b) => a.popularity - b.popularity).map(movie => (<MovieCard key={movie.id} movie={movie} />));
      break;
    }
    case '2': {
      moviesArray = props.movies.sort((a, b) => a.title.localeCompare(b.title)).map(movie => (<MovieCard key={movie.id} movie={movie} />));
      break;
    }
    case '3': {
      moviesArray = props.movies.sort((a, b) => b.title.localeCompare(a.title)).map(movie => (<MovieCard key={movie.id} movie={movie} />));
      break;
    }
    case '4': {
      moviesArray = props.movies.sort((a, b) => Date.parse(new Date(b.release_date)) - Date.parse(new Date(a.release_date))).map(movie => (<MovieCard key={movie.id} movie={movie} />));
      break;
    }
    case '5': {
      moviesArray = props.movies.sort((a, b) => Date.parse(new Date(a.release_date)) - Date.parse(new Date(b.release_date))).map(movie => (<MovieCard key={movie.id} movie={movie} />));
      break;
    }
  }
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
