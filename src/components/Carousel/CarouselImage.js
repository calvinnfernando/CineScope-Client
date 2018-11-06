import React, { Component } from 'react';

// while this goes against styling conventions, this was the only way I could get the carousel to slide properly
const style = {
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: -1000,
    backgroundColor: '#FFFEF4'
};

class CarouselImage extends React.Component {
    render() {    
        return <img src={this.props.image} style={style} />;
    }
  }
  export default CarouselImage;