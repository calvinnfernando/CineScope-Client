import React from 'react';
import { AuthUserContext } from '../Sessions';
import NameStyle from '../../styles/components/Name/NameStyle'

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
