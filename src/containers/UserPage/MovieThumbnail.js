import React from 'react';
import styled from 'styled-components';

const XSmallText = styled.p`
  font-size: 0.7em;
`;

const Thumbnail = styled.img`
  height: 200px;
`;

const Btn = styled.button`
  border-radius: 200px;
  background-color: firebrick;
  color: white;
  position: absolute;
  top: -10px;
  right: 25px;
  font-size: 15px;
  font-weight: bold;
  padding-top: -5px;
  padding-right: -5px;
`;

const MovieThumbnail = (props) => {
  return (
    <div className="col-3">
      <div className="row">
        <Thumbnail src={props.imgsrc} alt='' className="mx-auto"/>
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
      <div className="row">
        <XSmallText className="mx-auto">{props.movieTitle}</XSmallText>
      </div>

    </div>
  )
}

export default MovieThumbnail;