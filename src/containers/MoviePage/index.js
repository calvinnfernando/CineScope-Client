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
    const ghettoID = parseInt(location.pathname.split('/')[2]);
    //const movieID = parseInt(this.props.match.params.id);
    // replace id with movieID
    MovieService.getSingleMovie(ghettoID).then((movie) => {
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
        this.setState({
          rated: movie.Rated,
          rotten_tomatoes: rottenTomatoes,
          metascore: movie.Metascore,
          imdb_rating: movie.imdbRating
        });
      });
    });
    
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
                  alt={this.state.title} onError={(e) => {e.target.src="https://i.imgur.com/SeLMJwk.png"}} />
                </MoviePosterStyle>
                <div style={{ marginTop: 15 }}>
                  <button onClick={this.handleThumbsUp} style={{ border: "none", cursor: "pointer", backgroundColor: "Transparent" }}><img src={ThumbsUp} alt='' /></button>
                  <button onClick={this.handleThumbsDown} style={{ border: "none", cursor: "pointer", backgroundColor: "Transparent" }}><img src={ThumbsDown} alt='' /></button>
                  <h4>Average rating: {this.state.vote_average}/10</h4>
                </div>
              </MovieLeftStyle>
              <MovieRightStyle className="col-md-8">
                <h1>{this.state.title}</h1>
                <h3>{this.state.year} | {this.state.rated}</h3>
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
                <p>{this.state.overview}</p>

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
            <RelatedMovies />
          </MovieInfoStyle>
        </WhiteBoxStyle>
        {this.state.displayTrailer && <TrailerModal closeTrailer={this.closeTrailer} />}

      </div>
    );
  }
}

export default MoviePage;