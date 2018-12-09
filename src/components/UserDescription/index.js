import React from 'react';
import { AuthUserContext } from '../Sessions';
import introicon from './intro-icon.png';
import Box from '../../styles/components/UserDescription/Box'
import Title from '../../styles/components/UserDescription/Title'
import Icon from '../../styles/components/UserDescription/Icon'
import SmallText from '../../styles/components/UserDescription/SmallText'

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
