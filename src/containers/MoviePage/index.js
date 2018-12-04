import React, { Component } from 'react'
import Header from '../../components/Header'
import TrailerModal from '../../components/MoviePage/TrailerModal'
import Ratings from '../../components/MoviePage/Ratings'
import Reviews from '../../components/MoviePage/Reviews'
import RelatedMovies from '../../components/MoviePage/RelatedMovies'

// services
import MoviePageService from '../../services/MoviePageService'

import styled from 'styled-components'
import { Link } from 'react-router-dom';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

/* STYLES */

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

const SignInNotification = styled.span`
  position: fixed;
  top: 4em;
  left: 50%;
  transform: translate(-50%);
  z-index: 10;
  background-color: #384491;
  padding: 8px 12px;
  border-radius: 8px;
  color: #FFFFFF;
  transition: 0.5s;
  opacity: 0;

  &.show {
    opacity: 1;
  }

  a {
    color: #999;
  }

  a:hover {
    text-decoration: none;
    color: white;
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
      reviews: [],
      reviewText: "",
      currentUser: "",
      displayName: "",
      emptyReview: false,
      reviewSubmitted: false,
      movieInFavorites: false,
      movieInWatched: false,
      movieInWatchLater: false,
      signInNotification: false,
      signInNotificationFade: false,
    }
    this.setMovieRating = this.setMovieRating.bind(this)
    this.rateMovie = this.rateMovie.bind(this)
    this.toggle = this.toggle.bind(this)
    this.openTrailer = this.openTrailer.bind(this)
    this.closeTrailer = this.closeTrailer.bind(this)
    this.handleReviewChange = this.handleReviewChange.bind(this)
    this.uploadReview = this.uploadReview.bind(this)
    this.toggleFav = this.toggleFav.bind(this)
    this.toggleWatched = this.toggleWatched.bind(this)
    this.toggleWatchLater = this.toggleWatchLater.bind(this)
    this.signInNotification = this.signInNotification.bind(this)

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
    MoviePageService.rateMovie(this);
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

    MoviePageService.getCurrentUser(this);

    const { location } = this.props;
    const movieID = parseInt(location.pathname.split('/')[2]);

    MoviePageService.setUpMovieData(this, movieID);
  }

  toggleFav() {
    MoviePageService.toggleWatchList(this, 'favoritesList', this.state.movie_id, this.state.poster, this.state.title, this.state.overview, this.state.imdb_id);
  }

  toggleWatched() {
    MoviePageService.toggleWatchList(this, 'watchedList', this.state.movie_id, this.state.poster, this.state.title, this.state.overview, this.state.imdb_id);
  }

  toggleWatchLater() {
    MoviePageService.toggleWatchList(this, 'watchLaterList', this.state.movie_id, this.state.poster, this.state.title, this.state.overview, this.state.imdb_id);
  }

  handleReviewChange(event) {
    this.setState({ reviewText: event.target.value })
  }

  /**
   * This method is called when the user tries to perform an action where an account is needed but is not signed in.
   */
  signInNotification() {
    this.setState({ signInNotification: true });
    this.setState({ signInNotificationFade: true });
    var refToThis = this;
    setTimeout(function(){
      refToThis.setState({signInNotificationFade: false});
      setTimeout(function(){
        refToThis.setState({signInNotification: false});
      },500);
    },1000);
  }

  uploadReview() {
    MoviePageService.uploadReview(this);
  }

  render() {
    return (
      <div>
        <Header />
        {this.state.signInNotification && <SignInNotification className={this.state.signInNotificationFade ? 'show' : 'none'}><a href='/login'>Sign in</a> or <a href='/register'>create an account</a> to enjoy user functionality!</SignInNotification>}
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
              <textarea type="text" textmode="MultiLine" value={this.state.reviewText} onChange={this.handleReviewChange} style={{ width: '100%', height: 200 }} />
              <button type="button" onClick={this.uploadReview}>Submit</button>
            </form>
            {this.state.emptyReview && 'Review cannot be empty.'}
            {this.state.reviewSubmitted && 'Your review has been posted!'}
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
