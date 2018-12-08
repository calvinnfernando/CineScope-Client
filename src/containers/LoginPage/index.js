import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../../components/Firebase';
import * as ROUTES from '../../constants/routes';
import { SignUpLink } from '../SignUpPage';
import FullScreen from '../../styles/containers/Login/FullScreen'
import Form from '../../styles/containers/Login/Form'
import Error from '../../styles/containers/Login/Error'

const LoginPage = () => (
  <FullScreen className="container-fluid">
    <SignInForm />
  </FullScreen>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;
    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

	render(){
    const error = this.state.error;
		return (
      <Form onSubmit={this.onSubmit}>
        <div className="d-flex flex-column p-5">
          <input
            type="text"
            className="form-control w-100 mb-2"
            name="email"
            onChange={this.onChange}
            placeholder="Enter your email"
            />
          <input
            type="password"
            name="password"
            onChange={this.onChange}
            className="form-control w-100 mb-2"
            placeholder="Enter your password"
            />
          <input
            type="submit"
            className="form-control w-100 mb-4"
            value="Log in"
            />
          {SignUpLink()}
          {
            error && <Error>Email or password you enter does not match our record. Please retry.</Error>
          }
        </div>
      </Form>
		);
	}
}

const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);

export default LoginPage;

export { SignInForm, FullScreen, Form };
