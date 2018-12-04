import React from 'react';
import styled from 'styled-components';
import '../../styles/components/movieCard.css';

const Btn = styled.button`
  border-radius: 200px;
  background-color: firebrick;
  color: white;
  position: absolute;
  top: -10px;
  right: 0px;
  font-size: 15px;
  font-weight: bold;
  padding-top: -5px;
  padding-right: -5px;
`;

const MovieCardStyle = styled.div`
  position: relative;
`;

const MovieCard = (props) => (
  <MovieCardStyle>
    <div className="movie-card card">
      <img className="card-img-top movie-img"
        src={"http://image.tmdb.org/t/p/w185" + props.poster}
        onError={(e) => { e.target.src = "https://i.imgur.com/SeLMJwk.png" }} alt="" width="200" height="298" />
      <a href={"/movie/" + parseInt(props.id)}>
        <div className="card-img-overlay movie-description">
          <p className="card-text">{props.movie_title}</p>
        </div>
      </a>
    </div>
    {
      (props.onEdit) && (
        <div>
          <Btn type="button" onClick={() => {
            props.deleteMovie(props.count);
          }}>
            &times;
            </Btn>
        </div>
      )
    }
  </MovieCardStyle>
);

export default MovieCard;