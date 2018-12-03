import React from 'react';
import styled from 'styled-components';
import profpic from '../../components/img/profile.svg';

const FriendsThumbnailStyle = styled.div`
  margin-left: 0px;
`;

const XSmallText = styled.p`
  font-size: 0.8em;
`;

const SmallProfile = styled.img`
  border-radius: 100px;
  height: 70px;
  width: 70px;
`;

const FriendsThumbnail = (props) => {
  return (
    <FriendsThumbnailStyle className='col-3'> 
      <div className='row'>
        <SmallProfile src={profpic} alt='' />
      </div>
      <div className='row'>
        <XSmallText>{props.friendName}</XSmallText>
      </div>
    </FriendsThumbnailStyle>
  )
}

export default FriendsThumbnail;