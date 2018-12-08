import React from 'react';
import { AuthUserContext } from '../Sessions';
import NameStyle from '../../styles/components/Name/NameStyle'

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
