import React from 'react';

import { withFirebase } from '../Firebase';

const SignOutButton = ({ firebase }) => (
  <a href="/">
    <span onClick={firebase.doSignOut}>
      Sign Out
    </span>
  </a>
);

export default withFirebase(SignOutButton);
