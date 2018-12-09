import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import Header from '../../components/Header';

import { withFirebase } from '../../components/Firebase';
import * as ROUTES from '../../constants/routes';

// styles
import { Error, FullScreen, Form, TitleLogo } from '../../styles/containers/SignUpPage';

const SignUpPage = () => (
  <FullScreen className="container-fluid" style={{ paddingRight: '0', paddingLeft: '0'}}>
    <Header />
    <TitleLogo>Register</TitleLogo>
    <SignUpForm />
  </FullScreen>
);

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  isAdmin: false,
  error: null,
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    event.preventDefault();
    const { username, email, passwordOne} = this.state;
    const displayName = username;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your own accessible Firebase Database too
        this.props.firebase
          .user(authUser.user.uid)
          .set({
            username,
            email,
            displayName,
          })
          .then(() => {
            this.setState({ ...INITIAL_STATE });
            this.props.history.push(ROUTES.HOME);
          })
          .catch(error => {
            this.setState({ error });
          });
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onChangeCheckbox = event => {
    this.setState({ [event.target.name]: event.target.checked });
  };

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      username === '' ||
      email === '';

    return (
      <Form onSubmit={this.onSubmit}>
        <div className="d-flex flex-column p-5">
          <input
            name="username"
            value={username}
            onChange={this.onChange}
            className="form-control w-100 mb-2"
            type="text"
            placeholder="Full Name"
          />
          <input
            name="email"
            value={email}
            onChange={this.onChange}
            className="form-control w-100 mb-2"
            type="text"
            placeholder="Email Address"
          />
          <input
            name="passwordOne"
            value={passwordOne}
            className="form-control w-100 mb-2"
            onChange={this.onChange}
            type="password"
            placeholder="Password"
          />
          <input
            name="passwordTwo"
            value={passwordTwo}
            className="form-control w-100 mb-4"
            onChange={this.onChange}
            type="password"
            placeholder="Confirm Password"
          />
          <button disabled={isInvalid}>
            Sign Up
          </button>
          {error && <Error>{error.message}</Error>}
        </div>
      </Form>
    );
  }
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const SignUpForm = compose(
  withRouter,
  withFirebase,
)(SignUpFormBase);

export default SignUpPage;

export { SignUpForm, SignUpLink };
