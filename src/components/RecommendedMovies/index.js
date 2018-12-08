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
      query: []
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const favoritesRef = firebase.database().ref().child('users/' + user.uid + '/favoriteList').orderByKey();
        favoritesRef.once('value')
          .then((snapshot) => {
            snapshot.forEach(child => {
              if (child.val()) {
                this.setState({query: this.state.query.concat([child.val().id])});
              }
            });
          })
          .then(() => {
            console.log(this.state.query.length);
            if (this.state.query.length == 0) {
              MovieService.getPopularMovies().then((movies) => {
                this.setState({ movies: movies, activeItemIndex: 0 });
              })
            } else {
              this.setState({ movies: [], activeItemIndex: 0 });
              var eachElementSize = Math.ceil( 10 / this.state.query.length );
              for (var i = 0; i < this.state.query.length; i += 1) {
                MovieService.getRecommendedMovies(this.state.query[i]).then((movies) => {
                  this.setState({
                    movies: this.state.movies.concat(movies.slice(0,eachElementSize)),
                    activeItemIndex: 0
                  });
                });
              }
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
              // Placeholder configurations
              enablePlaceholder
              numberOfPlaceholderItems={5}
              minimumPlaceholderTime={1000}
              placeholderItem={<div style={{ height: 300, width: 200, background: '#343a40' }}></div>}

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
              rightChevron={<span style={{ color: '#FFFFFF' }}> &gt; </span>}
              leftChevron={<span style={{ color: '#FFFFFF' }}> &lt; </span>}
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
