/* Used this website: https://dev.to/willamesoares/how-to-build-an-image-carousel-with-react--24na */

import React, { Component } from 'react';
// Gotta find an easier way to import multiple images
import tmpbanner from './img/tmpbanner.png';
import tmpbanner2 from './img/tmpbanner2.png';

const imgUrls = [tmpbanner, tmpbanner2];

class Carousel extends Component {
	constructor(props){
        super(props);
        
        this.state = {
            currentImageIndex: 0
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
            currentImageIndex: index
        });
    }

    /* As soon as it mounts, start a timer which changes slides periodically */
    componentDidMount() {
        setInterval(
            function() {
                var { currentImageIndex } = this.state;
                this.setSlide(currentImageIndex + 1)
            }
            .bind(this),
            4000);
    }
    
	render(){
		return (
			<div className="carousel">
                <img src={imgUrls[this.state.currentImageIndex]} alt={imgUrls[this.state.currentImageIndex]} />

                {/* TODO: complete carousel navigation */}
	  		</div>
		);
	}
}

export default Carousel;