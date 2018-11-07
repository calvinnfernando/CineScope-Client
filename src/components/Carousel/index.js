/* Used this website: https://dev.to/willamesoares/how-to-build-an-image-carousel-with-react--24na */

import React, { Component } from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'; // animation wrapper
import CarouselImage from './CarouselImage';
// Gotta find an easier way to import multiple images
import tmpbanner from '../img/tmpbanner.png';
import tmpbanner2 from '../img/tmpbanner2.png';

import styled from 'styled-components';

const imgUrls = [tmpbanner, tmpbanner2];

// Styling
const CarouselContainer = styled.div`
    height: 500px;
    position: relative;
    overflow: hidden;
`;

const Animations = styled.div`
    .carousel-enter {
        transform: translate(100%);
    }
    .carousel-enter.carousel-enter-active {
        transform: translate(0%);
        transition: transform 500ms ease-in-out;
    }
    .carousel-leave {
        transform: translate(0%);
    }
    .carousel-leave.carousel-leave-active {
        transform: translate(-100%);
        transition: transform 500ms ease-in-out;
    }

`;

const CarouselNavStyle = styled.div`
    position: absolute;
    display: block;
    left: 50%;
    transform: translate(-50%);
    bottom: 10px;
    margin: 0 auto;
`;

const Dot = styled.span`
    cursor: pointer;    
    height: 12px;
    width: 12px;
    border-radius: 50%;
    margin: 10px 6px;
    background-color: #FFF;
    display: inline-block;
    transition: background-color 0.6s ease;

    &:hover {
        background-color: #686585;
    }
`;

var interval;

class Carousel extends Component {
	constructor(props){
        super(props);
        
        this.state = {
            currentImageIndex: 0,
            sliding: false
        };

        this.setSlide = this.setSlide.bind(this);
    }
    
    /* Sets the current slide based on index */
    setSlide (index) {
        // checks if the slide index goes out of bounds
        const lastIndex = imgUrls.length - 1;
        const firstIndex = 0;
        if (index > lastIndex) {
            index = firstIndex;
        } 
        else if (index < firstIndex) {
            index = lastIndex;
        }

        this.setState({
            currentImageIndex: index,
            sliding: true
        });

        // timer which prevents changing while sliding
        setTimeout(() => {
            this.setState({
               sliding: false
             })
           }, 500)

    }

    /* As soon as it mounts, start a timer which changes slides periodically */
    componentDidMount() {
        interval = setInterval(
            function() {
                var { currentImageIndex } = this.state;
                this.setSlide(currentImageIndex + 1)
            }
            .bind(this),
            4000);
    }
    
	render(){
        const dots = imgUrls.map((url, index) => {
            return <Dot key={url} onClick={() => {
                // only sets slide if it's not currently sliding
                if(!this.state.sliding) {
                    this.setSlide(index);
                    // start over auto timer
                    clearInterval(interval);
                    interval = setInterval(
                        function() {
                            var { currentImageIndex } = this.state;
                            this.setSlide(currentImageIndex + 1)
                        }
                        .bind(this),
                        4000);
                }
            }} />;
        });

		return (
			<CarouselContainer>
                <Animations>
                <CSSTransitionGroup
                    transitionName="carousel"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}
                    component="div"
                    transitionAppear={true} 
                    transitionAppearTimeout={1000}>
                    
                    <CarouselImage image={imgUrls[this.state.currentImageIndex]} key={this.state.currentImageIndex} />
                </CSSTransitionGroup>
                </Animations>

                {/* TODO: complete carousel navigation */}
                <CarouselNavStyle>
                    {dots}
                </CarouselNavStyle>
            </CarouselContainer>
		);
	}
}

export default Carousel;