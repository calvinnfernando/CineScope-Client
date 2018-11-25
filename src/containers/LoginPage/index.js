import React, { Component } from 'react';
import styled from 'styled-components';

const Login = styled.div`
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

class LoginPage extends Component {
	render(){
		return (
      <Login className="container-fluid">
        <Form>
          <div className="d-flex flex-column p-5">
            <input type="text" className="form-control w-100 mb-2" placeholder="Enter your username"/>
            <input type="password" className="form-control w-100 mb-2" placeholder="Enter your password"/>
            <input type="submit" className="form-control w-100 mb-4" value="Log in"/>
            <button type="button" className="btn btn-primary btn-md btn-block">Login with Facebook</button>
            <button type="button" className="btn btn-md btn-block text-white" style={{backgroundColor: "purple"}}>Login with Instagram</button>
            <button type="button" className="btn btn-md btn-block" style={{backgroundColor: "lightblue"}}>Login with Twitter</button>
          </div>
        </Form>
      </Login>
		);
	}
}

export default LoginPage;