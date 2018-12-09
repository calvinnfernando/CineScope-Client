import React, { Component } from 'react';
import { compose } from 'recompose';
import Header from '../../components/Header';
import wallpaper from './banner.jpg';
import profilepic from '../../components/img/profile.svg';
import heart from './heart.png';
import watchLater from './watch-later.png';
import watched from './watched.png';


import Name from '../../components/Name';
import MovieCard from '../../components/UserPage/MovieCard';

// services
import UserPageService from '../../services/UserPageService';

import { AuthUserContext, withAuthentication } from '../../components/Sessions';

import { Profile, ProfileStyle, Banner, Img, EditListButton, MovieList, Box, Title, Icon, ErrorMessage, ListTitle, NoMovies } from '../../styles/containers/UserPage.js'

class UserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayHighlights: (props.location.state) ? props.location.state.highlights : true,
      editFav: false,
      editLater: false,
      editWatched: false,
      favoritesList: [],
      laterList: [],
      watchedList: [],
    };

    this.deleteFav = this.deleteFav.bind(this);
    this.deleteLater = this.deleteLater.bind(this);
    this.deleteWatched = this.deleteWatched.bind(this);
  }

  deleteFav(movieID, i) {
    UserPageService.deleteWatchList(this, 'favoritesList', movieID, i);
  }

  deleteLater(movieID, i) {
    UserPageService.deleteWatchList(this, 'watchLaterList', movieID, i);
  }

  deleteWatched(movieID, i) {
    UserPageService.deleteWatchList(this, 'watchedList', movieID, i);
  }

  componentWillMount() {
    UserPageService.getCurrentUser(this);
    UserPageService.setUserWatchLists(this);
  }

  render() {

    const favoriteMovies = this.state.favoritesList.map((movieData, count) => {
      return <MovieCard key={movieData.id} poster={movieData.poster} movie_title={movieData.title} id={movieData.id} deleteMovie={() => this.deleteFav(movieData.id, count)} onEdit={this.state.editFav} />
    })
    const watchedMovies = this.state.watchedList.map((movieData, count) => {
      return <MovieCard key={movieData.id} poster={movieData.poster} movie_title={movieData.title} id={movieData.id} deleteMovie={() => this.deleteWatched(movieData.id, count)} onEdit={this.state.editWatched} />
    })
    const watchLaterMovies = this.state.laterList.map((movieData, count) => {
      return <MovieCard key={movieData.id} poster={movieData.poster} movie_title={movieData.title} id={movieData.id} deleteMovie={() => this.deleteLater(movieData.id, count)} onEdit={this.state.editLater} />
    })

    return (
      <ProfileStyle>
        <Header />

        <AuthUserContext.Consumer>
          {
            authUser => authUser ?

              (
                <div className="container-fluid row mx-auto">
                  <div className="col-2"></div>
                  <div className="col-8">
                    <Profile>
                      <div>
                        <Banner src={wallpaper} />
                        <div className="container-fluid row">
                          <Img src={profilepic} />
                          <Name />
                        </div>
                      </div>
                    </Profile>

                    {/* start of main body */}
                    <div className="row">
                      <div className="left-div col">
                        <Box>
                          <Title>
                            <span><Icon src={heart} alt='favorites' /></span>
                            <ListTitle>Favorites:</ListTitle>
                            <EditListButton type="button" className="btn btn-dark btn-sm" onClick={() => {
                              this.setState({ editFav: (this.state.editFav) ? false : true });
                            }}>
                              {(this.state.editFav) ? "Done" : "Edit"}
                            </EditListButton>
                          </Title>
                          {favoriteMovies.length !== 0 ?
                            <MovieList className='row text-center'>
                              {favoriteMovies}
                            </MovieList> :
                            <NoMovies>No movies in Favorites list</NoMovies>
                          }
                        </Box>

                        <Box>
                          <Title>
                            <span><Icon src={watchLater} alt='watched' /></span>
                            <ListTitle>Watch Later:</ListTitle>
                            <EditListButton type="button" className="btn btn-dark btn-sm" onClick={() => {
                              this.setState({ editLater: (this.state.editLater) ? false : true });
                            }}>
                              {(this.state.editLater) ? "Done" : "Edit"}
                            </EditListButton>
                          </Title>
                          {watchLaterMovies.length !== 0 ?
                            <MovieList className='row text-center'>
                              {watchLaterMovies}
                            </MovieList> :
                            <NoMovies>No movies in Watch Later list</NoMovies>
                          }
                        </Box>

                        <Box>
                          <Title>
                            <span><Icon src={watched} alt='watched' /></span>
                            <ListTitle>Watched:</ListTitle>
                            <EditListButton type="button" className="btn btn-dark btn-sm" onClick={() => {
                              this.setState({ editWatched: (this.state.editWatched) ? false : true });
                            }}>{(this.state.editWatched) ? "Done" : "Edit"}
                            </EditListButton>

                          </Title>
                          {watchedMovies.length !== 0 ?
                            <MovieList className='row text-center'>
                              {watchedMovies}
                            </MovieList> :
                            <NoMovies>No movies in Watched list</NoMovies>
                          }
                        </Box>
                      </div>
                    </div>

                  </div>
                  {/* end of main body */}
                  <div className="col-2"></div>
                </div>)

              : (<ErrorMessage>
                Please <a href="/register">create an account</a> to view your profile.
                </ErrorMessage>)

          }
        </AuthUserContext.Consumer>
      </ProfileStyle>
    );
  }
}

export default compose(withAuthentication)(UserPage);
