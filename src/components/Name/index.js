import React from 'react';
import styled from 'styled-components';
import { AuthUserContext } from '../Sessions';

const NameStyle = styled.h3`
max-width: 30%;
margin: auto;
color: #FFFFFF;
font-family: 'Josefin Sans', sans-serif;
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
