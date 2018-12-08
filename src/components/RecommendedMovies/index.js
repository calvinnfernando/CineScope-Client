import React, { Component } from 'react';
import ItemsCarousel from 'react-items-carousel';
import MovieCard from '../MovieLists/MovieCard';
import MovieService from '../../services/MovieService';
import '../../styles/components/movieCard.css';
import RecommendedText from '../../styles/components/RecommendedMovies/RecommendedText'

class RecommendedMovies extends Component {
    constructor() {
        super();

        this.state = {
            movies: [],
            activeItemIndex: 0,
            query: 338952 // Needs to be changed
        };
    }

    componentDidMount() {
        MovieService.getRecommendedMovies(this.state.query).then((movies) => {
            this.setState({
                movies: movies,
                activeItemIndex: 0,
                // This query is just a random movie ID. Stays until Server is working
                query: 338952
            });
        });
    }

    changeActiveItem = (activeItemIndex) => this.setState({ activeItemIndex });

    render() {
        const {
            movies,
            activeItemIndex
        } = this.state;

        const moviesArray = movies.map(movie => (<MovieCard key={movie.id} movie={movie} />));

        return (
            <div className="container">
                <RecommendedText><h2>Recommended Movies</h2></RecommendedText>
                <div className="d-flex flex-row mt-2">
                    <div className="col-sm-12">
                        <ItemsCarousel
                            // Carousel configurations
                            numberOfCards={4}
                            gutter={12}
                            showSlither={true}
                            firstAndLastGutter={true}
                            freeScrolling={false}

                            // Active item configurations
                            requestToChangeActive={this.changeActiveItem}
                            activeItemIndex={activeItemIndex}
                            activePosition={'center'}

                            chevronWidth={24}
                            rightChevron={<span style={{color: '#FFFFFF'}}> &gt; </span>}
                            leftChevron={<span style={{color: '#FFFFFF'}}> &lt; </span>}
                            outsideChevron={false}
                        >
                            {moviesArray}
                        </ItemsCarousel>
                    </div>
                </div>
            </div>
        );
    }
}

export default RecommendedMovies;
