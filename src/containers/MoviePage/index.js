import React, { Component } from 'react'
import Header from '../../components/Header'
import TrailerModal from '../../components/MoviePage/TrailerModal'
import Ratings from '../../components/MoviePage/Ratings'
import Reviews from '../../components/MoviePage/Reviews'
import RelatedMovies from '../../components/MoviePage/RelatedMovies'
import MovieService from '../../services/MovieService.js'
import styled from 'styled-components'
import ThumbsUp from './thumbsup.png'
import ThumbsDown from './thumbsdown.png'
import { Link } from 'react-router-dom';

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
    background-color: #fdbcc6;
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
    background-color: #a3d2fa;
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

const MoviePlannerButtonStyle = styled.div`
  position: absolute;
  right: 36%;
  bottom: 0px;
  padding: 8px 12px;
  border-radius: 8px;
  background-color: #228B22;
  color: #FFFFFF;
  cursor: pointer;
  transition: .2s;

  &:hover {
    background-color: #98FB98;
  }
`;

class MoviePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rating: 0,
      displayTrailer: false
    }
    this.handleThumbsUp = this.handleThumbsUp.bind(this)
    this.handleThumbsDown = this.handleThumbsDown.bind(this)
    this.openTrailer = this.openTrailer.bind(this)
    this.closeTrailer = this.closeTrailer.bind(this)
  }
  handleThumbsUp() {
    this.setState(state => ({
      rating: 1
    }))
  }
  handleThumbsDown() {
    this.setState(state => ({
      rating: -1
    }))
  }
  openTrailer() {
    this.setState({ displayTrailer: true });
  }
  closeTrailer() {
    this.setState({ displayTrailer: false });
  }
  componentDidMount() {
    const { location } = this.props;
    const movieID = parseInt(location.pathname.split('/')[2]);
    MovieService.getSingleMovie(movieID).then((movie) => {
      const year = movie.release_date.split("-")[0];
      this.setState({
        title: movie.title,
        overview: movie.overview,
        poster: movie.poster_path,
        year: year,
        vote_average: movie.vote_average,
        imdb_id: movie.imdb_id
      });
      MovieService.getSingleMovieOMDb(this.state.imdb_id).then((movie) => {
        const ratings = movie.Ratings;
        var rottenTomatoes = "N/A";
        for (const source of ratings) {
          if (source.Source === "Rotten Tomatoes") {
            rottenTomatoes = source.Value;
          }
        }
        var rated = movie.Rated;
        if (rated === "N/A") {
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
    MovieService.getSimilarMovies(movieID).then((movies) => {
      const relatedMovies = movies.slice(0, 4);
      this.setState({ relatedMovies: relatedMovies });
    })
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
                  <button onClick={this.handleThumbsUp} style={{ border: "none", cursor: "pointer", backgroundColor: "Transparent" }}><img src={ThumbsUp} alt='' /></button>
                  <button onClick={this.handleThumbsDown} style={{ border: "none", cursor: "pointer", backgroundColor: "Transparent" }}><img src={ThumbsDown} alt='' /></button>
                  <h4>Average rating: {this.state.vote_average}/10</h4>
                </div>
              </MovieLeftStyle>
              <MovieRightStyle className="col-md-8">
                <h1>{this.state.title}</h1>
                <h3>{this.state.year} | {this.state.rated} | {this.state.runtime}</h3>
                <AddButtonsStyle>
                  <AddToFavorites>
                    Star button here
                    </AddToFavorites>
                  <AddToWatchList>
                    + Add to Watched
                    </AddToWatchList>
                  <AddToWatchList>
                    + Add to Watch Later
                    </AddToWatchList>
                  <TrailerButton onClick={this.openTrailer}>
                    &#9658; Watch Trailer
                    </TrailerButton>
                </AddButtonsStyle>
                <small>Director: {this.state.director} | Actors: {this.state.actors} </small>
                <p>{this.state.overview}</p>
                <Link to = {"/movie-planner"}>
                  <MoviePlannerButtonStyle>
                    Watch this movie with a friend
                  </MoviePlannerButtonStyle>
                </Link>
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
            <Reviews />
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