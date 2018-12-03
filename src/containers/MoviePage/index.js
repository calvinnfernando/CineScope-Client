import React, { Component } from 'react'
import Header from '../../components/Header'
import TrailerModal from '../../components/MoviePage/TrailerModal'
import Ratings from '../../components/MoviePage/Ratings'
import Reviews from '../../components/MoviePage/Reviews'
import RelatedMovies from '../../components/MoviePage/RelatedMovies'
import MovieService from '../../services/MovieService.js'
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

/* STYLES */

import firebase from 'firebase';

const WhiteBoxStyle = styled.div`
  margin: 10px 10%;
  background-color: #FFFFFF;
  border-radius: 20px;
`;

const MovieInfoStyle = styled.div`
  padding: 5%;
`;

const MoviePosterStyle = styled.div`
  img {
    width: 80%;
    box-shadow: 2px 4px 8px rgba(0, 0, 0, .3);
  }
`;

const MovieLeftStyle = styled.div`
  padding: 10px;
  text-align: center;
`;

const MovieRightStyle = styled.div`
  padding: 10px;
  text-align: justify;
  h1, h2 {
    text-align: left;
  }
`;

const AddButtonsStyle = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 15px auto;
`;

const AddToFavorites = styled.span`
  margin-right: 8px;
  padding: 8px 12px;
  border-radius: 8px;
  background-color: #FFA500;
  color: #FFFFFF;
  cursor: pointer;
  transition: .2s;

  &:hover {
    background-color: #cc8400;
  }
`;

const AddToWatchList = styled.span`
  margin-right: 8px;
  padding: 8px 12px;
  border-radius: 8px;
  background-color: #e94e67;
  color: #FFFFFF;
  cursor: pointer;
  transition: .2s;

  &:hover {
    background-color: #ba3e52;
  }
`;

const RemoveFromFavorites = styled.span`
  margin-right: 8px;
  padding: 8px 12px;
  border-radius: 8px;
  background-color: #cc8400;
  color: #FFFFFF;
  cursor: pointer;
  transition: .2s;

  &:hover {
    background-color: #cc8400;
  }
`;

const RemoveFromWatchList = styled.span`
  margin-right: 8px;
  padding: 8px 12px;
  border-radius: 8px;
  background-color: #ba3e52;
  color: #FFFFFF;
  cursor: pointer;
  transition: .2s;

  &:hover {
    background-color: #ba3e52;
  }
`;


const TrailerButton = styled.span`
  margin-right: 8px;
  padding: 8px 12px;
  border-radius: 8px;
  background-color: #3997e6;
  color: #FFFFFF;
  cursor: pointer;
  transition: .2s;

  &:hover {
    background-color: #ba3e52;
  }
`;

const CompareButtonStyle = styled.div`
  position: absolute;
  right: 2%;
  bottom: 0px;
  padding: 8px 12px;
  border-radius: 8px;
  background-color: #f78a40;
  color: #FFFFFF;
  cursor: pointer;
  transition: .2s;

  &:hover {
    background-color: #ffd3b5;
  }
`;

const RateStyle = styled.span`
  font-size: 24px;
  margin: 0px 2px;
`;

/* CLASS */

class MoviePage extends Component {
  /**
   * Constructor
   */
  constructor(props) {
    super(props)

    this.state = {
      rating: 0,
      displayTrailer: false,
      dropdownOpen: false,
      dropdownValue: 0,
      invalidRating: false,
      ratingPostedMessage: false,
      movieInFavorites: false,
      movieInWatched: false,
      movieInWatchLater: false
    }
    this.setMovieRating = this.setMovieRating.bind(this)
    this.rateMovie = this.rateMovie.bind(this)
    this.toggle = this.toggle.bind(this)
    this.openTrailer = this.openTrailer.bind(this)
    this.closeTrailer = this.closeTrailer.bind(this)
    this.handleAddFav = this.handleAddFav.bind(this)
    this.handleAddWatched = this.handleAddWatched.bind(this)
    this.handleAddWatchLater = this.handleAddWatchLater.bind(this)

    //this.firebaseref = firebase.database().ref(`users/${this.props.d}`)
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.firebaseref = firebase.database().ref(`users/${user.uid}`); 
      } else {
        console.log("Not Signed In");
      }
    });
    // console.log(props.firebase.auth.app.firebase_.database().ref('users'));
  }
  // Dropdown stuff
  setMovieRating(rating) {
    this.setState({dropdownValue: rating, invalidRating: false})
  }
  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }
  rateMovie() {
    if(this.state.dropdownValue == 0) {
      this.setState({invalidRating: true});
      return;
    }

    MovieService.getSessionId().then((id) => {
      console.log(id);
      const rating = this.state.dropdownValue;
      const movieID = this.state.movie_id;
      MovieService.postRating(rating,movieID,id).then(()=> {
        this.setState({ratingPostedMessage: true});
      });
    });

  }
  // Trailer stuff
  openTrailer() {
    this.setState({ displayTrailer: true });
  }

  /**
   * This method set display trailer true
   */
  closeTrailer() {
    this.setState({ displayTrailer: false });
  }

  deleteFav(id) {

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('users/' + user.uid + '/favoriteList/' + id);

        console.log('Remove from favorites clicked');
        this.setState({movieInFavorites: false});
        console.log(this.state.movieInFavorites);
        return firebase.database().ref('users/' + user.uid + '/favoriteList/').child(id).remove();
      }
    });

    
  }

  deleteLater(id) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('users/' + user.uid + '/watchLaterList/' + id);
        this.setState({movieInWatchLater: false});
        return firebase.database().ref('users/' + user.uid + '/watchLaterList/').child(id).remove();   
      }
    });

    
  }

  deleteWatched(id) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('users/' + user.uid + '/watchedList/' + id);
        this.setState({movieInWatched: false});
        return firebase.database().ref('users/' + user.uid + '/watchedList/').child(id).remove();
      }
    });

    
  }

  /**
   * This method mounts component initially
   */
  componentDidMount() {
    const { location } = this.props;
    const movieID = parseInt(location.pathname.split('/')[2]);

    /**
     * This method get single movie data from TMDb
     */
    MovieService.getSingleMovie(movieID).then((movie) => {
      const year = movie.release_date.split("-")[0];
      this.setState({
        movie_id: movieID,
        title: movie.title,
        overview: movie.overview,
        poster: movie.poster_path,
        year: year,
        vote_average: movie.vote_average,
        imdb_id: movie.imdb_id
      });

      /**
       * This method get single movie data from OMDb
       */
      MovieService.getSingleMovieOMDb(this.state.imdb_id).then((movie) => {
        const ratings = movie.Ratings;
        var rottenTomatoes = "N/A";
        for (const source of ratings) {
          if (source.Source === "Rotten Tomatoes") {
            rottenTomatoes = source.Value;
          }
        }
        var rated = movie.Rated;
        if (rated === "N/A" || rated === "NOT RATED") {
          rated = "Not yet rated";
        }
        this.setState({
          director: movie.Director,
          actors: movie.Actors,
          runtime: movie.Runtime,
          rated: rated,
          rotten_tomatoes: rottenTomatoes,
          metascore: movie.Metascore,
          imdb_rating: movie.imdbRating
        });
      });
    });

    /**
     * This method get similar movies based on the movie page
     *
     * @param {const} movieID
     */
    MovieService.getSimilarMovies(movieID).then((movies) => {
      const relatedMovies = movies.slice(0, 4);
      this.setState({ relatedMovies: relatedMovies });
    });

    /**
     * This method get movie trailer based on movie id
     *
     * @param {const} movieID
     */
    MovieService.getMovieVideos(movieID).then((videos) => {
      var trailerVideo = "";
      for (const video of videos) {
        if (video.type === "Trailer" && video.site === "YouTube") {
          trailerVideo = video;
          break;
        }
      }
      this.setState({ trailerVideo: trailerVideo });
    })
    /**
     * Gets movie reviews based on movie ID
     */
    MovieService.getMovieReviews(movieID).then((reviews) => {
      const movieReviews = reviews.slice(0, 8);
      this.setState({ reviews: movieReviews });
    });

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const imdb_id = this.state.imdb_id;
        // Checking if movie exist or not
        this.checkIfMovieExist(imdb_id, 'favoriteList').then((exist) => {
          if (exist) {
            this.setState({movieInFavorites:true})
          } else {
          }
        });

        // Checking if movie exist or not
        this.checkIfMovieExist(imdb_id, 'watchedList').then((exist) => {
          if (exist) {
            this.setState({movieInWatched:true})
          } else {
          }
        });

        // Checking if movie exist or not
        this.checkIfMovieExist(imdb_id, 'watchLaterList').then((exist) => {
          if (exist) {
            this.setState({movieInWatchLater:true})
          } else {
          }
        });

      } else {
      }
    });


  } // end componentDidMount

  /**
   * This method handle adding movie to the fav list in database by
   * calling MoviePageService
   *
   * @param {const} movieID
   */
  handleAddFav(event) {
    event.preventDefault();
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const poster = this.state.poster;
        const title = this.state.title;
        const overview = this.state.overview;
        const imdb_id = this.state.imdb_id;
        const id = this.state.movie_id;

        // Checking if movie exist or not
        this.checkIfMovieExist(imdb_id, 'favoriteList').then((exist) => {
          if (exist) {
            alert('Movie is exist, need to change the button appearance');
          } else {
            this.firebaseref.child('favoriteList').child(imdb_id)
              .set({poster: poster, title: title, overview: overview, imdb_id: imdb_id, id: id});
          }
        });

        this.setState({movieInFavorites: true});
        console.log('Movie in Favorite set to true' + this.state.movieInFavorites);

      } else {
        console.log("Not Signed In");
      }
    });
  }

  /**
   * This method handle adding movie to the watched list in database by
   * calling MoviePageService
   *
   * @param {const} movieID
   */
  handleAddWatched(event) {
    event.preventDefault();
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const poster = this.state.poster;
        const title = this.state.title;
        const overview = this.state.overview;
        const imdb_id = this.state.imdb_id;
        const id = this.state.movie_id;

        // Checking if movie exist or not
        this.checkIfMovieExist(imdb_id, 'watchedList').then((exist) => {
          if (exist) {
            alert('Movie is exist, need to change the button appearance');
          } else {
            this.firebaseref.child('watchedList').child(imdb_id)
              .set({poster: poster, title: title, overview: overview, imdb_id: imdb_id, id: id});
          }
        });

        this.setState({movieInWatched: true});

      } else {
        console.log("Not Signed In");
      }
    });
  }

  /**
   * This method handle adding movie to the watch later list in database by
   * calling MoviePageService
   *
   * @param {const} movieID
   */
  handleAddWatchLater(event) {
    event.preventDefault();

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const poster = this.state.poster;
        const title = this.state.title;
        const overview = this.state.overview;
        const imdb_id = this.state.imdb_id;
        const id = this.state.movie_id;

        // Checking if movie exist or not
        this.checkIfMovieExist(imdb_id, 'watchLaterList').then((exist) => {
          if (exist) {
            alert('Movie is exist, need to change the button appearance');
          } else {
            this.firebaseref.child('watchLaterList').child(imdb_id)
              .set({poster: poster, title: title, overview: overview, imdb_id: imdb_id, id: id});
          }
        });

        this.setState({movieInWatchLater: true});

      } else {
        console.log("Not Signed In");
      }
    });
  }

  /**
   * This method check if the movie exist in a list
   */
  checkIfMovieExist = async(movie_id, type) => {
    return this.firebaseref.child(type).child(movie_id).once('value')
      .then(snapshot => snapshot.exists() );
  }

  render() {
    console.log(this.state.movieInFavorites);

    return (
      <div>
        <Header />
        <WhiteBoxStyle>
          <MovieInfoStyle className="container">
            <div className="row">
              <MovieLeftStyle className="col-md-4">
                <MoviePosterStyle>
                  <img src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${this.state.poster}`}
                    alt={this.state.title} onError={(e) => { e.target.src = "https://i.imgur.com/SeLMJwk.png" }} />
                </MoviePosterStyle>
                <div style={{ marginTop: 15 }}>
                <h4>Average rating: {this.state.vote_average}/10</h4>
                  <RateStyle>Rate This Movie: </RateStyle>
                  <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                    <DropdownToggle caret>{this.state.dropdownValue == 0 ? '-' : this.state.dropdownValue}</DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem onClick={() => this.setMovieRating(1)}>1</DropdownItem>
                      <DropdownItem onClick={() => this.setMovieRating(2)}>2</DropdownItem>
                      <DropdownItem onClick={() => this.setMovieRating(3)}>3</DropdownItem>
                      <DropdownItem onClick={() => this.setMovieRating(4)}>4</DropdownItem>
                      <DropdownItem onClick={() => this.setMovieRating(5)}>5</DropdownItem>
                      <DropdownItem onClick={() => this.setMovieRating(6)}>6</DropdownItem>
                      <DropdownItem onClick={() => this.setMovieRating(7)}>7</DropdownItem>
                      <DropdownItem onClick={() => this.setMovieRating(8)}>8</DropdownItem>
                      <DropdownItem onClick={() => this.setMovieRating(9)}>9</DropdownItem>
                      <DropdownItem onClick={() => this.setMovieRating(10)}>10</DropdownItem>
                    </DropdownMenu>
                  </ButtonDropdown>
                  <br/>
                  <button onClick={this.rateMovie}>Submit</button>
                  <br/>
                  {this.state.invalidRating && 'Please select a rating.'}
                  {this.state.ratingPostedMessage && 'Your rating has been posted!'}
                </div>
              </MovieLeftStyle>
              <MovieRightStyle className="col-md-8">
                <h1>{this.state.title}</h1>
                <h3>{this.state.year} | {this.state.rated} | {this.state.runtime}</h3>
                <AddButtonsStyle>
                  {this.state.movieInFavorites ?
                  
                  <RemoveFromFavorites onClick={this.deleteFav(this.state.imdb_id)}>
                    + Remove from Favorites
                    </RemoveFromFavorites>

                  :

                  <AddToFavorites onClick={this.handleAddFav}>
                    + Add to Favorites
                    </AddToFavorites>
                
                }

                {this.state.movieInWatched ?
                <RemoveFromWatchList onClick={this.deleteWatched(this.state.imdb_id)}>
                + Remove from Watched
                </RemoveFromWatchList>
              :
              <AddToWatchList onClick={this.handleAddWatched}>
                    + Add to Watched
                    </AddToWatchList>
              }
                  
                    
                  {this.state.movieInWatchLater ?
                  <RemoveFromWatchList onClick={this.deleteLater(this.state.imdb_id)}>
                  + Remove from Watch Later
                  </RemoveFromWatchList>
                  :
                  <AddToWatchList onClick={this.handleAddWatchLater}>
                  + Add to Watch Later
                  </AddToWatchList>
                }
                    
                  
                    
                  <TrailerButton onClick={this.openTrailer}>
                    &#9658; Watch Trailer
                    </TrailerButton>
                </AddButtonsStyle>
                <small>Director: {this.state.director} | Actors: {this.state.actors} </small>
                <p style={{marginBottom: "2rem"}}>{this.state.overview}</p>

                <Link to="/Comparitron">
                  <CompareButtonStyle>
                    Open Movie in Comparitron
                    </CompareButtonStyle>
                </Link>
              </MovieRightStyle>
            </div>
            <hr></hr>
            {/* Must replace the props with real data */}
            <Ratings rottenTomatoes={this.state.rotten_tomatoes} metacritic={this.state.metascore} imdbRating={this.state.imdb_rating} />
            <hr></hr>
            <Reviews reviews={this.state.reviews} />
            <hr></hr>
            <RelatedMovies movies={this.state.relatedMovies} />
          </MovieInfoStyle>
        </WhiteBoxStyle>
        {this.state.displayTrailer && <TrailerModal closeTrailer={this.closeTrailer} video={this.state.trailerVideo} />}

      </div>
    );
  }
}

export default MoviePage;
