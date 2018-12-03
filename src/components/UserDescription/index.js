import React from 'react';
import styled from 'styled-components';

import { AuthUserContext } from '../Sessions';
import introicon from './intro-icon.png';

const Box = styled.div`
  margin: 7px 0px 7px 0px;
  background-color: #787878;
  border: 1px solid #999999;
  box-sizing: border-box;
  padding: 5px;
`;

const Title = styled.p`
  font-size: 1.1em;
  margin-left: 15px;
  margin-top: 10px;
`;

const Icon = styled.img`
  height: 20px;
  width: 20px;
  margin-right: 5px;
`;

const SmallText = styled.p`
  font-size: 0.8em;
  margin-left: 15px;
  margin-bottom: 5px;
`;

const UserDescription = () => (

  <AuthUserContext.Consumer>
    {
      authUser => authUser ?
        <Box>
          <Title>
            <Icon src={introicon} alt='intro'/>
            Intro
          </Title>
          <SmallText>Lives {authUser.liveIn}</SmallText>
          <SmallText>{authUser.bio}</SmallText>
          <SmallText>{authUser.birthday}</SmallText>
        </Box>
      : <Box>
        <Title>
          User not logged in
        </Title>
      </Box>
    }
  </AuthUserContext.Consumer>
);

export default UserDescription;