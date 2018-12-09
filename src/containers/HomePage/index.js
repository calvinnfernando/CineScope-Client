import React, {Component} from 'react';
import Header from '../../components/Header';
import Carousel from '../../components/Carousel';
import RecommendedMovies from '../../components/RecommendedMovies';
import HomeStyle from '../../styles/containers/HomePage/HomeStyle';

document.body.style = 'background: #232323;';

class HomePage extends Component {

    render() {
        return (
            <HomeStyle>
                <Header/>
                <Carousel/>
                <RecommendedMovies/>
            </HomeStyle>
        );
    }
}

export default HomePage;
