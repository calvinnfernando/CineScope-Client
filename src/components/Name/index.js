import React from 'react';
import styled from 'styled-components';
import { AuthUserContext } from '../Sessions';

const NameStyle = styled.h3`
max-width: 30%;
margin-left: 10px;
`;

const Name = () => (
  <AuthUserContext.Consumer>
    {
      authUser => authUser ? 
      <NameStyle>{authUser.displayName}</NameStyle>
      : 
      <NameStyle>No Name</NameStyle>
    }
  </AuthUserContext.Consumer>
);

export default Name