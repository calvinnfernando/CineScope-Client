import React from 'react';

import { withFirebase } from '../Firebase';

const SignOutButton = ({ firebase }) => (
  <a href="/">
  <button type="button" onClick={firebase.doSignOut}>
    Sign Out
  </button>
  </a>
);

export default withFirebase(SignOutButton);
