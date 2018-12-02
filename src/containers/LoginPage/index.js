import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import styled from 'styled-components';

import { withFirebase } from '../../components/Firebase';
import * as ROUTES from '../../constants/routes';
import { SignUpLink } from '../SignUpPage';

const FullScreen = styled.div`
  height: 100vh;
  width: 100vw;
`;

const Form = styled.form`
  height: 500px;
  width: 500px;
  background-color: rgba(211,211,211,0.5);

  position: absolute;
  top:0;
  bottom: 0;
  left: 0;
  right: 0;

  margin: auto;
`;

const Error = styled.div`
  display: block;
  background-color: rgba(255, 0, 0, 0.2);
  border-radius: 5px;
  text-align: center;
  padding: 5px;
`;

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