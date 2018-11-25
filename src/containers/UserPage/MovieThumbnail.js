import React from 'react';
import styled from 'styled-components';

const XSmallText = styled.p`
  font-size: 0.7em;
`;

const Thumbnail = styled.img`
  height: 200px;
`;

const MovieThumbnail = (props) => {
  return(
    <div className="col-3">
      <div className="row">
        <Thumbnail src={props.imgsrc} alt='' className="mx-auto"/>
      </div>
      <div className="row">
        <XSmallText className="mx-auto">{props.movieTitle}</XSmallText>
      </div>

    </div>
  )
}

export default MovieThumbnail;