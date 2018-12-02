import React from 'react';
import { AuthUserContext } from '../../components/Sessions';
import styled from 'styled-components';

const TestDiv = styled.div`
  background: white;
`;

const Test = () => (
  <AuthUserContext.Consumer>
  {
    authUser => authUser ? <TestDiv>{authUser.uid}</TestDiv>
      : <TestDiv>No ID</TestDiv>
  }
  </AuthUserContext.Consumer>
);

export default Test