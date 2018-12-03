import React, { Component } from 'react';
import styled from 'styled-components';
import { compose } from 'recompose';
import Header from '../../components/Header';
import wallpaper from './banner.jpg';
import profilepic from '../../components/img/profile.svg';
import heart from './heart.png';
import watchLater from './watch-later.png';
import watched from './watched.png';


import Name from '../../components/Name';
import UserDescription from '../../components/UserDescription';
import firebase from 'firebase';
import { withFirebase } from '../../components/Firebase';
import { AuthUserContext, withAuthentication } from '../../components/Sessions';

import '../../styles/components/movieCard.css';

const Btn = styled.button`
  border-radius: 200px;
  background-color: firebrick;
  color: white;
  position: absolute;
  top: -10px;
  right: 0px;
  font-size: 15px;
  font-weight: bold;
  padding-top: -5px;
  padding-right: -5px;
`;

const MovieCardStyle = styled.div`
  position: relative;
`;

const MovieCard = (props) => (
  <MovieCardStyle>
    <div className="movie-card card">
      <img className="card-img-top movie-img"
        src={"http://image.tmdb.org/t/p/w185" + props.poster}
        onError={(e) => { e.target.src = "https://i.imgur.com/SeLMJwk.png" }} alt="" width="200" height="298" />
      <a href={"/movie/" + parseInt(props.movie_id)}>
        <div className="card-img-overlay movie-description">
          <p className="card-text">{props.movie_title}</p>
        </div>
      </a>
    </div>
    {
      (props.onEdit) && (
        <div>
          <Btn type="button" onClick={() => {
            props.deleteMovie(props.count);
          }}>
            &times;
            </Btn>
        </div>
      )
    }
  </MovieCardStyle>
);

const ProfileStyle = styled.div`
  background-color: #232323;
  color: #232323;
`;

const Profile = styled.div`
  border: 1px solid #999999;
  background-color: #787878;
  margin-bottom: 12px;
  min-width: 768px;
`;

const Banner = styled.img`
  width: 100%;
  max-height: 300px;
  overflow: hidden;
`;

const Img = styled.img`
  border-radius: 100px;
  width: 168px;
  height: 168px;
  position: relative;
  margin-top: -100px;
  border: 5px solid #787878;
`;


const EditListButton = styled.button`
  position: absolute;
  right: 40px;
`;

const SmallText = styled.p`
  font-size: 0.8em;
  margin-left: 15px;
  margin-bottom: 5px;
`;


const HighlightsButton = styled.button`
  position: relative;
  margin-top: 13px;
  width: 100px;
  height: 50px;
`;

const WatchlistsButton = styled.button`
  position: relative;
  margin-top: 13px;
  margin-left: 10px;
  width: 100px;
  height: 50px;
`;

const MovieList = styled.div`
`;

const Box = styled.div`
  margin: 7px 0px 7px 0px;
  background-color: #787878;
  border: 1px solid #999999;
  box-sizing: border-box;
  padding: 5px;
  min-width: 768px;
`;

const Title = styled.p`
  font-size: 1.1em;
  margin-left: 15px;
  margin-top: 10px;
`;

const Icon = styled.img`
  height: 20px;
  width: 20px;
  margin-right: 5px;
`;

const ErrorMessage = styled.div`
  text-align: center;
  margin: auto;
  font-size: 2em;
  margin-top: 2em;
  color: #ddd;

  a {
    color: #999;
  }

  a:hover {
    text-decoration: none;
    color: white;
  }

`;

const postList = [
  { title: "a post", description: "Just watched Ant Man", date: 'Oct 31 2018' },
  { title: "a post", description: "Just watched Iron Man 3", date: 'Nov 2 2018' },
  { title: "a post", description: "Just watched Fast and Furious 12", date: 'Nov 3 2018' },
  { title: "a post", description: "Just watched Beauty and The Beast", date: 'Nov 4 2018' },
];

class UserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayHighlights: (props.location.state) ? props.location.state.highlights : true,
      editFav: false,
      editLater: false,
      editWatched: false,
      favoriteList: [],
      laterList: [],
      watchedList: [],
    };

    this.deleteFav = this.deleteFav.bind(this);
    this.deleteLater = this.deleteLater.bind(this);
    this.deleteWatched = this.deleteWatched.bind(this);
  }

  deleteFav(id, i) {

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('users/' + user.uid + '/favoriteList/' + id);
        return firebase.database().ref('users/' + user.uid + '/favoriteList/').child(id).remove();
      }
    });
    this.state.favoriteList.splice(i, 1);
    let newFavList = this.state.favoriteList;
    this.setState({ favoriteList: newFavList });
  }

  deleteLater(id, i) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('users/' + user.uid + '/watchLaterList/' + id);
        return firebase.database().ref('users/' + user.uid + '/watchLaterList/').child(id).remove();
      }
    });
    this.state.laterList.splice(i, 1);
    let newLaterList = this.state.laterList;
    this.setState({ laterList: newLaterList });
  }

  deleteWatched(id, i) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('users/' + user.uid + '/watchedList/' + id);
        return firebase.database().ref('users/' + user.uid + '/watchedList/').child(id).remove();
      }
    });
    this.state.watchedList.splice(i, 1);
    let newWatchedList = this.state.watchedList;
    this.setState({ watchedList: newWatchedList });
  }

  componentWillMount() {
    // Authentication Stuff
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const watchedRef = firebase.database().ref().child('users/' + user.uid + '/watchedList').orderByKey();
        watchedRef.once('value').then((snapshot) => {
          snapshot.forEach(child => {
            console.log(child.val());
            if (child.val()) {
              this.setState({
                watchedList: this.state.watchedList.concat([child.val()]),
              });
            }
          });
        });
        const favoritesRef = firebase.database().ref().child('users/' + user.uid + '/favoriteList').orderByKey();
        favoritesRef.once('value').then((snapshot) => {
          snapshot.forEach(child => {
            console.log(child.val());
            if (child.val()) {
              this.setState({
                favoriteList: this.state.favoriteList.concat([child.val()]),
              });
            }

          });
        });
        const laterRef = firebase.database().ref().child('users/' + user.uid + '/watchLaterList').orderByKey();
        laterRef.once('value').then((snapshot) => {
          snapshot.forEach(child => {
            console.log(child.val());
            if (child.val()) {
              this.setState({
                laterList: this.state.laterList.concat([child.val()]),
              });
            }
          });
        });
      }
    });
  }

  render() {

    /* const pList = postList.map((post, count) => {
      return <ActivityFeed key={post.title + count.toString()} description={post.description} date={post.date} />
    }); */

    const favoriteMovies = this.state.favoriteList.map((movieData, count) => {
      return <MovieCard key={movieData.id} poster={movieData.poster} movie_title={movieData.title} id={movieData.id} deleteMovie={() => this.deleteFav(movieData.imdb_id, count)} onEdit={this.state.editFav} />
    })
    const watchedMovies = this.state.watchedList.map((movieData, count) => {
      return <MovieCard key={movieData.id} poster={movieData.poster} movie_title={movieData.title} id={movieData.id} deleteMovie={() => this.deleteWatched(movieData.imdb_id, count)} onEdit={this.state.editWatched} />
    })
    const watchLaterMovies = this.state.laterList.map((movieData, count) => {
      return <MovieCard key={movieData.id} poster={movieData.poster} movie_title={movieData.title} id={movieData.id} deleteMovie={() => this.deleteLater(movieData.imdb_id, count)} onEdit={this.state.editLater} />
    })

    console.log(this.state.watchedList);

    return (
      <ProfileStyle>
        <Header />

        <AuthUserContext.Consumer>
          {
            authUser => authUser ?

              (<div className="container-fluid row mx-auto">
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
                          <Icon src={heart} alt='heart' />
                          Favorites:
                          <EditListButton type="button" className="btn btn-dark btn-sm" onClick={() => {
                            this.setState({ editFav: (this.state.editFav) ? false : true });
                          }}>
                            {(this.state.editFav) ? "Done" : "Edit"}
                          </EditListButton>
                        </Title>
                        <MovieList className='row'>
                          {favoriteMovies}
                        </MovieList>
                      </Box>

                      <Box>
                        <Title>
                          <Icon src={watchLater} alt='watchLater' />
                          Watch Later:
                          <EditListButton type="button" className="btn btn-dark btn-sm" onClick={() => {
                            this.setState({ editLater: (this.state.editLater) ? false : true });
                          }}>
                            {(this.state.editLater) ? "Done" : "Edit"}
                          </EditListButton>
                        </Title>
                        <MovieList className='row'>
                          {watchLaterMovies}
                        </MovieList>
                      </Box>

                      <Box>
                        <Title>
                          <Icon src={watched} alt='watched' />
                          Watched:
                          <EditListButton type="button" className="btn btn-dark btn-sm" onClick={() => {
                            this.setState({ editWatched: (this.state.editWatched) ? false : true });
                          }}>
                            {(this.state.editWatched) ? "Done" : "Edit"}
                          </EditListButton>
                        </Title>
                        <MovieList className='row'>
                          {watchedMovies}
                        </MovieList>
                      </Box>
                    </div>
                  </div>

                  )}

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
