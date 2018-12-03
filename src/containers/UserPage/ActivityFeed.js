import React from 'react';
import styled from 'styled-components';
import profpic from '../../components/img/profile.svg';

const ActivityFeedStyle = styled.div`
  margin: 10px;
`;

const XSmallText = styled.p`
  font-size: 0.6em;
`;

const Description = styled.p`
  margin-bottom: 0px;
  font-size: 0.9em;
`;

const SmallProfile = styled.img`
  border-radius: 100px;
  height: 50px;
  width: 50px;
`;

const ActivityFeed = (props) => {
  return (
    <ActivityFeedStyle className='row m-3'> 
      <div className='col-'>
        <SmallProfile src={profpic} alt='' />
      </div>
      <div className='col'>
        <Description>{props.description}</Description>
        <XSmallText>{props.date}</XSmallText>
      </div>
    </ActivityFeedStyle>
  )
}

export default ActivityFeed;