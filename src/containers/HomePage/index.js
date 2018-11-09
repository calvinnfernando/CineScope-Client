import React, { Component } from 'react';
import Header from '../../components/Header';
import Carousel from '../../components/Carousel';
import styled from 'styled-components';

const HomeStyle =  styled.div`
  text-align: center;
`;

class HomePage extends Component {
	render(){
		return (
			<HomeStyle>
				<Header />
				<Carousel />
	  		</HomeStyle>
		);
	}
}

export default HomePage;
