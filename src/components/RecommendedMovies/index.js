import React, { Component } from 'react';
import ItemsCarousel from 'react-items-carousel';
import MovieCard from '../MovieLists/MovieCard';
import MovieService from '../../services/MovieService';
import '../../styles/components/movieCard.css';
import styled from 'styled-components';
import firebase from 'firebase';

const RecommendedText = styled.div`
    font-family: 'Roboto Slab', serif;
    text-align: center;
    color: #FFFFFF;
    margin: 10px;
    h2 {
        font-size: 24px;
    }
`;

class RecommendedMovies extends Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      activeItemIndex: 0,
      query: []
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const favoritesRef = firebase.database().ref().child('users/' + user.uid + '/favoritesList').orderByKey();
        favoritesRef.once('value')
          .then((snapshot) => {
            snapshot.forEach(child => {
              this.setState({
                query: this.state.query.concat([child.val()])
              });
            })
          })
          .then(() => {
            if (this.state.query.length === 0) {
              MovieService.getPopularMovies().then((movies) => {
                this.setState({ movies: movies, activeItemIndex: 0 });
              })
            } else {
              MovieService.getRecommendedMovies(this.state.query[Math.floor((Math.random() * 100) % this.state.query.length)].id).then((movies) => {
                this.setState({
                  movies: movies,
                  activeItemIndex: 0
                });
              });
            }
          });
      } else {
        MovieService.getPopularMovies().then((movies) => {
          this.setState({ movies: movies, activeItemIndex: 0 });
        })
      }
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
              rightChevron={<span style={{ color: '#FFFFFF', fontSize: 60 }}> &#8250; </span>}
              leftChevron={<span style={{ color: '#FFFFFF', fontSize: 60 }}> &#8249; </span>}
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
