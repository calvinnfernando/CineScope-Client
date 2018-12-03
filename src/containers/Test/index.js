import React, {Component} from 'react';
import { AuthUserContext } from '../../components/Sessions';
import styled from 'styled-components';

const TestDiv = styled.div`
  background: white;
`;

const Test = () => (
  <AuthUserContext.Consumer>
  {
    authUser => authUser ? <TestBase authUser={authUser}/>
      :  <Loader/>
  }
  </AuthUserContext.Consumer>
);

const Loader = () => (
  <TestDiv>
    Loading
  </TestDiv>
);

class TestBase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: null,
      noUser: (props.authUser) ? false : true,
    }
  }

  componentDidMount() {
    // Do something about authenticated user here
    console.log(this.props.authUser);
  }

  render() {
    return(
      <TestDiv>{this.props.authUser.uid}</TestDiv>
    );
  }
}

// const Test = (props) => (
//   <AuthUserContext.Consumer>
//   {
//     authUser => authUser ? <TestDiv>{authUser.uid}</TestDiv>
//       : <TestDiv>No ID</TestDiv>
//   }
//   </AuthUserContext.Consumer>

// );

export default Test