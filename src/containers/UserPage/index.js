import React, { Component } from 'react';
import styled from 'styled-components';
import { compose } from 'recompose';
import Header from '../../components/Header';
import wallpaper from './wallpaper-sponge.jpg';
import profilepic from '../../components/img/profile.svg';
import heart from './heart.png';
import friends from './friends.png';
import watchLater from './watch-later.png';
import watched from './watched.png';

// import MovieThumbnail from './MovieThumbnail';
import ActivityFeed from './ActivityFeed';
import FriendsThumbnail from './FriendsThumbnail';
import firebase from 'firebase';
import { withFirebase } from '../../components/Firebase';
import { AuthUserContext, withAuthentication } from '../../components/Sessions';

import '../../styles/components/movieCard.css';
import introicon from './intro-icon.png';

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
      <a href={"/movie/" + parseInt(props.id)}>
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

const NameStyle = styled.h3`
max-width: 30%;
margin-left: 10px;
`;

const EditListButton = styled.button`
  display: ${props => props.hide ? "none": "inline-block"} !important;
  position: absolute;
  right: 40px;
`;

const SmallText = styled.p`
  font-size: 0.8em;
  margin-left: 15px;
  margin-bottom: 5px;
`;


const FriendButton = styled.button`
  display: ${props => props.hide ? "none": "inline-block"} !important;
  position: relative;
  margin-top: 13px;
  height: 50px;
`;

const HighlightsButton = styled.button`
  display: ${props => props.hide ? "none": "inline-block"} !important;
  position: relative;
  margin-top: 13px;
  width: 100px;
  height: 50px;
`;

 const WatchlistsButton = styled.button`
  display: ${props => props.hide ? "none": "inline-block"} !important;
  position: relative;
  margin-top: 13px;
  margin-left: 10px;
  width: 100px;
  height: 50px;
`;

const FriendList = styled.div`
  padding-left: 5%;
`;

const MovieList = styled.div`
`;

const Box = styled.div`
  margin: 7px 0px 7px 0px;
  background-color: #787878;
  border: 1px solid #999999;
  box-sizing: border-box;
  padding: 5px;
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


const UserBodyStyle = styled.div`
  display: flex;
  flex-direction: row;
  @media (max-width: 768px) {
    flex-direction: column;
  }
  min-width: 768px;
`;

const UserPageBtn = styled.div``;

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

    // parse the path of profile
    const { location } = this.props;

    this.state = {
      displayHighlights: (props.location.state) ? props.location.state.highlights : true,
      editFav: false,
      editLater: false,
      editWatched: false,
      favoriteList: [],
      laterList: [],
      watchedList: [],

      // public related profile
      profileId: location.pathname.split('/')[2],
      user: {},
      userIsOwner: false, // by default the page should be public
      isFriend: false,
    };

    this.deleteFav = this.deleteFav.bind(this);
    this.deleteLater = this.deleteLater.bind(this);
    this.deleteWatched = this.deleteWatched.bind(this);
    this.addOrRemoveFriend = this.addOrRemoveFriend.bind(this);
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

  componentWillReceiveProps(props) {
    const {location} = props;
    this.setState({profileId: location.pathname.split('/')[2]});
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        
        // is the user visiting the owner of the profile page?
        const owner = (this.state.profileId) ? user.uid === this.state.profileId : true;
        const profId = this.state.profileId;
        const userDetails = firebase.database().ref().child('users/' + profId);
        this.setState({
          userIsOwner: owner,
          profileId: (!this.state.profileId) ? user.uid : this.state.profileId,
        });

        this.setState({
          isFriend: (owner) ? false : ( (firebase.database().ref().child('users/' + user.uid + '/friends/')) ? !!firebase.database().ref().child('users/' + user.uid + '/friends/').child(this.state.profileId) : false ),
        });

        userDetails.once('value').then((snap) => {
          if(snap.val()) {
            this.setState({user: snap.val()});
          }
        });
        const watchedRef = firebase.database().ref().child('users/' + profId + '/watchedList').orderByKey();
        watchedRef.once('value').then((snapshot) => {
          snapshot.forEach(child => {
            if (child.val()) {
              this.setState({
                watchedList: (this.state.watchedList.find((el) => { return el.id === child.val().id })) ? this.state.watchedList : this.state.watchedList.concat([child.val()]),
              });
            }
          });
        });
        const favoritesRef = firebase.database().ref().child('users/' + profId + '/favoriteList').orderByKey();
        favoritesRef.once('value').then((snapshot) => {
          snapshot.forEach(child=> {
            if (child.val()) {
              this.setState({
                favoriteList: (this.state.favoriteList.find((el) => { return el.id === child.val().id })) ? this.state.favoriteList : this.state.favoriteList.concat([child.val()]),
              });
            }
    
          });
        });
        const laterRef = firebase.database().ref().child('users/' + profId + '/watchLaterList').orderByKey();
        laterRef.once('value').then((snapshot) => {
          snapshot.forEach(child=> {
            if (child.val()) {
              this.setState({
                laterList: (this.state.laterList.find((el) => { return el.id === child.val().id })) ? this.state.laterList : this.state.laterList.concat([child.val()]),
              });
            }
          });
        });
      }
    });
  }

  componentWillMount() {
    // Authentication Stuff
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // is the user visiting the owner of the profile page?
        const owner = (this.state.profileId) ? user.uid === this.state.profileId : true;
        const profId = this.state.profileId;
        const userDetails = firebase.database().ref().child('users/' + profId);
        this.setState({
          userIsOwner: owner,
          profileId: (!this.state.profileId) ? user.uid : this.state.profileId,
          favoriteList: [],
          laterList: [],
          watchedList: [],
        });

        this.setState({
          isFriend: (owner) ? false : ( (firebase.database().ref().child('users/' + user.uid + '/friends/')) ? !!firebase.database().ref().child('users/' + user.uid + '/friends/').child(this.state.profileId) : false ),
        });

        userDetails.once('value').then((snap) => {
          if(snap.val()) {
            this.setState({user: snap.val()});
          }
        })
        const watchedRef = firebase.database().ref().child('users/' + profId + '/watchedList').orderByKey();
        watchedRef.once('value').then((snapshot) => {
          snapshot.forEach(child => {
            console.log(child.val());
            if (child.val()) {
              this.setState({
                watchedList: (this.state.watchedList.find((el) => { return el.id === child.val().id })) ? this.state.watchedList : this.state.watchedList.concat([child.val()]),
              });
            }
          });
        });
        const favoritesRef = firebase.database().ref().child('users/' + profId + '/favoriteList').orderByKey();
        favoritesRef.once('value').then((snapshot) => {
          snapshot.forEach(child => {
            console.log(child.val());
            if (child.val()) {
              this.setState({
                favoriteList: (this.state.favoriteList.find((el) => { return el.id === child.val().id })) ? this.state.favoriteList : this.state.favoriteList.concat([child.val()]),
              });
            }
    
          });
        });
        const laterRef = firebase.database().ref().child('users/' + profId + '/watchLaterList').orderByKey();
        laterRef.once('value').then((snapshot) => {
          snapshot.forEach(child => {
            console.log(child.val());
            if (child.val()) {
              this.setState({
                laterList: (this.state.laterList.find((el) => { return el.id === child.val().id })) ? this.state.laterList : this.state.laterList.concat([child.val()]),
              });
            }
          });
        });
      }
    });
  }

  //Testing out removing firebase data
  /*handleRemove(movieKey) {
    firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      let key = movieKey
      return firebase.database().ref('users/' + user.uid + '/watchedList' + key).remove();
    }
  }*/

  /*    old render functions
  let wList = this.state.watchedList.map((movie, count) => {
        if (this.state.editWatched){
          return <MovieThumbnail key={movie.title + count.toString()} movieTitle={movie.title} onEdit={true} count={count} deleteMovie={this.deleteWatched} imgsrc={movie.imgsrc}/>
        } else {
          return <MovieThumbnail key={movie.title + count.toString()} movieTitle={movie.title} onEdit={false} count={count} deleteMovie={this.deleteWatched} imgsrc={movie.imgsrc}/>
        }
      });
      let favList = this.state.favoriteList.map((movie, count) => {
        if (this.state.editFav){
          return <MovieThumbnail key={movie.title + count.toString()} movieTitle={movie.title} onEdit={true} count={count} deleteMovie={this.deleteFav} imgsrc={movie.imgsrc}/>
        } else {
          return <MovieThumbnail key={movie.title + count.toString()} movieTitle={movie.title} onEdit={false} count={count} deleteMovie={this.deleteFav} imgsrc={movie.imgsrc}/>
        }
      });
      let wlList = this.state.laterList.map((movie, count) => {
        if (this.state.editLater){
          return <MovieThumbnail key={movie.title + count.toString()} movieTitle={movie.title} onEdit={true} count={count} deleteMovie={this.deleteLater} imgsrc={movie.imgsrc}/>
        } else {
          return <MovieThumbnail key={movie.title + count.toString()} movieTitle={movie.title} onEdit={false} count={count} deleteMovie={this.deleteLater} imgsrc={movie.imgsrc}/>
        }
      });
      */


  /**
   * Add friend will add the friend 
   */
  addOrRemoveFriend(loggedInUserId) {
    const userDetails = firebase.database().ref().child('users/' + loggedInUserId);
    let dispName, emailAddress, uName = '';
    userDetails.child('displayName').once('value').then(snapshot => dispName = snapshot.val())
    userDetails.child('email').once('value').then(snapshot => emailAddress = snapshot.val())
    userDetails.child('username').once('value').then(snapshot => uName = snapshot.val())
    this.checkFriend(userDetails, this.state.profileId).then((exist) => {
      // if it does exist, then we are removing
      if (exist) {
        this.setState({ isFriend: false });
        firebase.database().ref('users/' + this.state.profileId + '/friends/').child(loggedInUserId).remove();
        firebase.database().ref('users/' + loggedInUserId + '/friends/').child(this.state.profileId).remove();
      } else {
        // if it doesn't exist, we add it to the database
        this.setState({ isFriend: true });
        firebase.database().ref('users/' + loggedInUserId).child('friends').child(this.state.profileId)
          .set({uid: this.state.profileId, displayName: this.state.user.displayName, email: this.state.user.email, username: this.state.user.username});
        firebase.database().ref('users/' + this.state.profileId).child('friends').child(loggedInUserId)
          .set({uid: loggedInUserId, displayName: dispName, email: emailAddress, username: uName});
      }
    });
  }

  /**
   * Check if friend is already in the friends list.
   */
  checkFriend = async(user, fid) => {
    return user.child('friends').child(fid).once('value')
      .then(snapshot => snapshot.exists() );
  }

  fList = [];

  render() {

    const pList = postList.map((post, count) => {
      return <ActivityFeed key={post.title + count.toString()} description={post.description} date={post.date} />
    });

    const friendRef = firebase.database().ref('users/' + this.state.profileId + '/friends/').orderByKey();
    if (!!friendRef){
      friendRef.once('value').then((snapshot) => {
        snapshot.forEach((friend) => {
          if (friend.val()){
            if (this.fList.find(el => { return friend.val().uid === el.key })) {
            } else {
              this.fList.push(<FriendsThumbnail key={friend.val().uid} friendName={friend.val().displayName} />);
            }
          }
        });
      });
    }

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

    const {displayName, liveIn, birthday, bio} = this.state.user;
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
                        <NameStyle>
                          {displayName}
                        </NameStyle>
                        <FriendButton hide={this.state.userIsOwner} type="button" className="btn btn-dark" onClick={() => this.addOrRemoveFriend(authUser.uid)}>
                          {(this.state.isFriend) ? "Remove Friend" : "Add Friend"}
                        </FriendButton>

                        <HighlightsButton hide={!this.state.userIsOwner} type="button" className="btn btn-dark" onClick={() => {
                            this.setState({ displayHighlights: true });
                          }}>
                             Highlights
                        </HighlightsButton>
                        <WatchlistsButton hide={!this.state.userIsOwner} type="button" className="btn btn-dark" onClick={() => {
                            this.setState({ displayHighlights: false });
                          }}>
                              Watchlists
                        </WatchlistsButton>
                      </div>
                    </div>
                  </Profile>

                  {/* start of main body */}
                  <UserBodyStyle>
                    {/* INTRO */}
                    <div className="col-md-6">
                      <Box>
                        <Title>
                          <Icon src={introicon} alt='intro'/>
                          Intro
                        </Title>
                        <SmallText>Lives {liveIn}</SmallText>
                        <SmallText>{bio}</SmallText>
                        <SmallText>{birthday}</SmallText>
                      </Box>
                      <Box>
                        <Title>
                          <Icon src={friends} alt='friends'/>
                          Friends
                        </Title>
                        <FriendList className="row">
                          { this.fList }
                        </FriendList>
                      </Box>
                    </div>

                    {/* ACTIVITY FEED */}
                    <div className="col-md-6">
                      <Box>
                        <Title>
                          Activity Feed
                        </Title>
                        {pList}
                      </Box>
                    </div>
                  </UserBodyStyle>

                    ) : (

                        <div className="row">
                          <div className="left-div col">
                            <Box>
                              <Title>
                                <Icon src={heart} alt='heart' />
                                Favorites:
                  <EditListButton hide={!this.state.userIsOwner} type="button" className="btn btn-dark btn-sm" onClick={() => {
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
                  <EditListButton hide={!this.state.userIsOwner} type="button" className="btn btn-dark btn-sm" onClick={() => {
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
                  <EditListButton hide={!this.state.userIsOwner} type="button" className="btn btn-dark btn-sm" onClick={() => {
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

              :
              (<ErrorMessage>
                  Please <a href="/register">create an account</a> to view your profile.
                </ErrorMessage>)

          }
        </AuthUserContext.Consumer>


      </ProfileStyle>

    );
  }
}

export default compose(withAuthentication)(UserPage);
