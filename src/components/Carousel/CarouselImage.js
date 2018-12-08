import React, { Component } from 'react';
import CarouselImageStyle from '../../styles/components/Carousel/carousel';
// while this goes against styling conventions, this was the only way I could get the carousel to slide properly


class CarouselImage extends React.Component {
    render() {
        return <img src={this.props.image} style={CarouselImageStyle.style} />;
    }
  }
  export default CarouselImage;
