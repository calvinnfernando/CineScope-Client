import React, {Component} from 'react';
import Header from '../../components/Header';
import Carousel from '../../components/Carousel';
import styled from 'styled-components';

const HomeStyle = styled.div`
  text-align: center;
`;

document.body.style = 'background: #232323;';

class HomePage extends Component {
    render() {
        return (
            <div style={{backgroundColor: '#232323'}}>
                <HomeStyle>
                    <Header/>
                    <Carousel/>
                </HomeStyle>
            </div>
        );
    }
}

export default HomePage;
