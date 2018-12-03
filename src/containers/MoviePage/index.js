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
    background-color: #384491;
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

const SignInNotification = styled.div`
  position: absolute;
  top: 8em;
  left: 50%;
  transform: translate(-50%);
  z-index: 10;
  background-color: #384491;
  padding: 8px 12px;
  border-radius: 8px;
  color: #FFFFFF;
  transition: 1s;
  opacity: 0;

  &.show {
    opacity: 1;
  }
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
      reviewText: "",
      currentUser: "",
      displayName: "",
      reviewSubmitted: false,
      movieInFavorites: false,
      movieInWatched: false,
      movieInWatchLater: false,
      signInNotification: false
    }
    this.setMovieRating = this.setMovieRating.bind(this)
    this.rateMovie = this.rateMovie.bind(this)
    this.toggle = this.toggle.bind(this)
    this.openTrailer = this.openTrailer.bind(this)
    this.closeTrailer = this.closeTrailer.bind(this)
    this.handleAddFav = this.handleAddFav.bind(this)
    // this.handleAddWatched = this.handleAddWatched.bind(this)
    // this.handleAddWatchLater = this.handleAddWatchLater.bind(this)
    this.handleReviewChange = this.handleReviewChange.bind(this)
    this.uploadReview = this.uploadReview.bind(this)
    this.getFirebaseReviews = this.getFirebaseReviews.bind(this)
    this.toggleFav = this.toggleFav.bind(this)
    this.toggleWatched = this.toggleWatched.bind(this)
    this.toggleWatchLater = this.toggleWatchLater.bind(this)
    this.signInNotification = this.signInNotification.bind(this)

    //this.firebaseref = firebase.database().ref(`users/${this.props.d}`)
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.firebaseref = firebase.database().ref(`users/${user.uid}`);
        this.setState({currentUser: user.uid})
      } else {
        console.log("Not Signed In");
      }
    });
    console.log(props.firebase.auth.app.firebase_.database().ref('users'));
    //console.log(firebase.database().ref('users').child('A5VVmWlzyjfCkgFCd9OQmSY5QJn2'));
    //this.props.db.database().ref("users");

  }
  // Dropdown stuff
  setMovieRating(rating) {
    this.setState({ dropdownValue: rating, invalidRating: false })
  }
  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }
  rateMovie() {
    if (this.state.dropdownValue == 0) {
      this.setState({ invalidRating: true });
      return;
    }

    var rating = this.state.dropdownValue;
    this.setState({ ratingPostedMessage: true });

    /*MovieService.getSessionId().then((id) => {
      console.log(id);
      const rating = this.state.dropdownValue;
      const movieID = this.state.movie_id;
      MovieService.postRating(rating, movieID, id).then(() => {
        this.setState({ ratingPostedMessage: true });
      });
    });*/

    var ratingRef = firebase.database().ref('movies/' + this.state.movie_id);
    var newNumberOfRatings = 0;
    var newSumOfRatings = 0;
    ratingRef.on('value', function (snapshot) {
      var firebaseRating = snapshot.val();
      if (firebaseRating) {
        if (firebaseRating.numberOfRatings) {
          newNumberOfRatings = firebaseRating.numberOfRatings;
        }
        else {
          newNumberOfRatings = 0;
        }
        if (firebaseRating.sumOfRatings) {
          newSumOfRatings = firebaseRating.sumOfRatings;
        }
        else {
          newSumOfRatings = 0;
        }
      }
    });

    // increase the number of ratings so far
    newNumberOfRatings = newNumberOfRatings + 1;
    newSumOfRatings = newSumOfRatings + rating;

    var newRating = Math.round(newSumOfRatings / newNumberOfRatings*10)/10; // https://stackoverflow.com/questions/661562/how-to-format-a-float-in-javascript

    firebase.database().ref('movies/' + this.state.movie_id).set({
      sumOfRatings: newSumOfRatings,
      rating: newRating,
      numberOfRatings: newNumberOfRatings
    });

    firebase.database().ref('movies/' + this.state.movie_id).on('value', function (snapshot) {
      console.log(snapshot.val());
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
    this.getFirebaseReviews(movieID)
    MovieService.getMovieReviews(movieID).then((reviews) => {
      const movieReviews = reviews.slice(0, 8);
      console.log(movieReviews)
      this.setState({ reviews: movieReviews });
    });

    var ratingRef = firebase.database().ref('movies/' + movieID);
    var refToThis = this;
    ratingRef.on('value', function (snapshot) {
      var firebaseRating = snapshot.val();
      if (firebaseRating) {
        refToThis.setState({vote_average: firebaseRating.rating});
      }
    });
  }

  /**
   * This method handle adding movie to the fav list in database by
   * calling MoviePageService
   *
   * @param {const} movieID
   */

  handleAddFav(event) {

    /**
     * Gets movie reviews based on movie ID
     */
    MovieService.getMovieReviews(this.state.movie_id).then((reviews) => {
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
  }

  toggleFav() {
    var refToThis = this;
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const poster = this.state.poster;
        const title = this.state.title;
        const overview = this.state.overview;
        const imdb_id = this.state.imdb_id;
        const id = this.state.movie_id;

        // Checking if movie exist or not
        this.checkIfMovieExist(imdb_id, 'favoriteList').then((exist) => {
          // if it does exist, then we are removing
          if (exist) {
            refToThis.setState({movieInFavorites: false});
            return firebase.database().ref('users/' + user.uid + '/favoriteList/').child(imdb_id).remove();
          } else {
            // if it doesn't exist, we add it to the database
            this.firebaseref.child('favoriteList').child(imdb_id)
              .set({poster: poster, title: title, overview: overview, imdb_id: imdb_id, id: id});
              refToThis.setState({movieInFavorites: true});
          }
        });

      } else {
        this.signInNotification();
      }
    });
  }

  toggleWatched() {
    var refToThis = this;
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const poster = this.state.poster;
        const title = this.state.title;
        const overview = this.state.overview;
        const imdb_id = this.state.imdb_id;
        const id = this.state.movie_id;

        // Checking if movie exist or not
        this.checkIfMovieExist(imdb_id, 'watchedList').then((exist) => {
          // if it does exist, then we are removing
          if (exist) {
            refToThis.setState({movieInWatched: false});
            return firebase.database().ref('users/' + user.uid + '/watchedList/').child(imdb_id).remove();
          } else {
            // if it doesn't exist, we add it to the database
            this.firebaseref.child('watchedList').child(imdb_id)
              .set({poster: poster, title: title, overview: overview, imdb_id: imdb_id, id: id});
              refToThis.setState({movieInWatched: true});
          }
        });

        //this.setState({movieInFavorites: true});
        //    console.log('Movie in Favorite set to true' + this.state.movieInFavorites);

        this.firebaseref.child('watchedList').child(imdb_id)
          .set({ poster: poster, title: title, overview: overview, imdb_id: imdb_id });
      } else {
        this.signInNotification();
      }
    });
  }

  toggleWatchLater() {
    var refToThis = this;
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const poster = this.state.poster;
        const title = this.state.title;
        const overview = this.state.overview;
        const imdb_id = this.state.imdb_id;
        const id = this.state.movie_id;

        // Checking if movie exist or not
        this.checkIfMovieExist(imdb_id, 'watchLaterList').then((exist) => {
          // if it does exist, then we are removing
          if (exist) {
            refToThis.setState({movieInWatchLater: false});
            return firebase.database().ref('users/' + user.uid + '/watchLaterList/').child(imdb_id).remove();
          } else {
            // if it doesn't exist, we add it to the database
            this.firebaseref.child('watchLaterList').child(imdb_id)
              .set({poster: poster, title: title, overview: overview, imdb_id: imdb_id, id: id});
              refToThis.setState({movieInWatchLater: true});
          }
        });
      } else {
        this.signInNotification();
      }
    });
  }

  handleReviewChange(event) {
    this.setState({reviewText: event.target.value})
  }
  signInNotification() {
    console.log('Sign in');
    this.setState({signInNotification: true});
    var refToThis = this;
    setTimeout(function(){
      refToThis.setState({signInNotification: false});
      console.log('Sign in gone');
    },3000);
  }

  /**
   * This method check if the movie exist in a list
   */
  checkIfMovieExist = async(movie_id, type) => {
    return this.firebaseref.child(type).child(movie_id).once('value')
      .then(snapshot => snapshot.exists() );
  }

  uploadReview(event){
    // console.log(this.state.reviewText)
    var displayName = ""
    return firebase.database().ref('/users/' + this.state.currentUser).once('value').then((snapshot) => {
      displayName = (snapshot.val() && snapshot.val().displayName) || 'Anonymous';
      this.setState({displayName: displayName})
      this.setState({ reviewSubmitted: true });
      console.log('review submtitted');
      console.log(this.state.reviewSubmitted);
    }).then(displayName => {
      firebase.database().ref('movies/' + this.state.movie_id).child('reviews/' + this.state.displayName).set({
        review: this.state.reviewText
      });
    });
    this.getFirebaseReviews(this.state.movie_id)

      //window.location.reload();
  }

  //get firebase reviews
  getFirebaseReviews(movieID){
    console.log('here')
    var reviewRef =  firebase.database().ref().child('/movies/' + movieID + '/reviews').once('value').then((snapshot) => {
      var tempReviews = []
      snapshot.forEach((child) => {
        console.log(child.key)
        console.log(child.val())
        tempReviews.push({
          author: child.key,
          content: child.val().review
        })
        console.log(tempReviews)
      });
      var newReviews = this.state.reviews.concat(tempReviews)
      this.setState({reviews: newReviews})
      this.forceUpdate()
    })
  }

  render() {
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
                  <br />
                  <button onClick={this.rateMovie}>Submit</button>
                  <br />
                  {this.state.invalidRating && 'Please select a rating.'}
                  {this.state.ratingPostedMessage && 'Your rating has been posted!'}
                </div>
              </MovieLeftStyle>
              <MovieRightStyle className="col-md-8">
                <h1>{this.state.title}</h1>
                <h3>{this.state.year} | {this.state.rated} | {this.state.runtime}</h3>
                <AddButtonsStyle>
                  {this.state.movieInFavorites ?

                  <RemoveFromFavorites onClick={this.toggleFav}>
                    + Remove from Favorites
                    </RemoveFromFavorites>

                  :
                  <AddToFavorites onClick={this.toggleFav}>
                    + Add to Favorites
                    </AddToFavorites>

                }


                {this.state.movieInWatched ?
                <RemoveFromWatchList onClick={this.toggleWatched}>
                + Remove from Watched
                </RemoveFromWatchList>
              :
              <AddToWatchList onClick={this.toggleWatched}>
                    + Add to Watched
                    </AddToWatchList>
              }


                  {this.state.movieInWatchLater ?
                  <RemoveFromWatchList onClick={this.toggleWatchLater}>
                  + Remove from Watch Later
                  </RemoveFromWatchList>
                  :
                  <AddToWatchList onClick={this.toggleWatchLater}>
                  + Add to Watch Later
                  </AddToWatchList>
                }



                  <TrailerButton onClick={this.openTrailer}>
                    &#9658; Watch Trailer
                    </TrailerButton>
                </AddButtonsStyle>
                <small>Director: {this.state.director} | Actors: {this.state.actors} </small>
                <p style={{ marginBottom: "2rem" }}>{this.state.overview}</p>

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
            <h1>Write a Review</h1>
            <form>
              <textarea type="text" textmode="MultiLine" value={this.state.reviewText} onChange={this.handleReviewChange} style={{width: '100%', height: 200}}/>
              <button type="button" onClick={this.uploadReview}>Submit</button>
            </form>
            {this.state.reviewSubmitted && 'Your review has been posted!'}
            <hr></hr>
            <RelatedMovies movies={this.state.relatedMovies} />
          </MovieInfoStyle>
        </WhiteBoxStyle>
        {this.state.displayTrailer && <TrailerModal closeTrailer={this.closeTrailer} video={this.state.trailerVideo} />}
        <SignInNotification className={this.state.signInNotification ? 'show' : 'none'}>Sign in or create an account to enjoy user functionality!</SignInNotification>}

      </div>
    );
  }
}

export default MoviePage;
