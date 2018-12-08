import React from 'react';
import styled from 'styled-components';
import { AuthUserContext } from '../Sessions';

const NameStyle = styled.h3`
max-width: 30%;
color: #222;
font-family: 'Roboto', sans-serif;
margin: auto;
`;

const Name = () => (
  <NameStyle>
  <AuthUserContext.Consumer>
    {
      authUser => authUser ?
      authUser.displayName
      :
      'No Name'
    }
  </AuthUserContext.Consumer>
  </NameStyle>
);

export default Name
