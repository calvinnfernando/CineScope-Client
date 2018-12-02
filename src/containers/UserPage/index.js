import React, { Component } from 'react';
import styled from 'styled-components';
import { compose } from 'recompose';
import Header from '../../components/Header';
import wallpaper from './wallpaper-sponge.jpg';
import profilepic from './profpic-sponge.webp';
import ironman3 from './ironman3.jpg';
import antman from './antman.jpg';
import heart from './heart.png';
import friends from './friends.png';
import watchLater from './watch-later.png';
import watched from './watched.png';

import MovieThumbnail from './MovieThumbnail';
import ActivityFeed from './ActivityFeed';
import FriendsThumbnail from './FriendsThumbnail';
import Name from '../../components/Name';
import UserDescription from '../../components/UserDescription';
import firebase from 'firebase';
import { withFirebase } from '../../components/Firebase';
import { AuthUserContext, withAuthentication } from '../../components/Sessions';

const ProfileStyle =  styled.div`
  background-color: #232323;
  color: #232323;
`;

const Profile = styled.div`
  border: 1px solid #999999;
  background-color: #787878;
  margin-bottom: 12px;
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
  position: absolute;
  margin-top: 13px;
  right: 145px;
  width: 100px;
  height: 50px;
`;

const WatchlistsButton = styled.button`
  position: absolute;
  margin-top: 13px;
  right: 30px;
  width: 100px;
  height: 50px;
`;

const MovieList = styled.div`

`;

const FriendList = styled.div`
  padding-left: 12%;
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

// let favoriteList = [
//   {title: 'Iron Man 3', imgsrc: ironman3},
//   {title: 'Ant Man', imgsrc: antman},
//   {title: 'Ant Man', imgsrc: antman},
// ];

// let laterList = [
//   {title: 'Iron Man 3', imgsrc: ironman3},
//   {title: 'Ant Man', imgsrc: antman},
//   {title: 'Iron Man 3', imgsrc: ironman3},
// ];

// let watchedList = [
//   {title: 'Iron Man 3', imgsrc: ironman3},
//   {title: 'Ant Man', imgsrc: antman},
//   {title: 'Ant Man', imgsrc: antman},
//   {title: 'Iron Man 3', imgsrc: ironman3},
// ];

const postList = [
  {title: "a post", description:"Just watched Ant Man", date:'Oct 31 2018'},
  {title: "a post", description:"Just watched Iron Man 3", date:'Nov 2 2018'},
  {title: "a post", description:"Just watched Fast and Furious 12", date:'Nov 3 2018'},
  {title: "a post", description:"Just watched Beauty and The Beast", date:'Nov 4 2018'},
];

const friendsList = [
  {name: 'Patrick Star'},
  {name: 'Spongebob'},
  {name: 'Spongebob'},
  {name: 'Patrick Star'},
  {name: 'Spongebob'},
  {name: 'Patrick Star'},
];

class UserPage extends Component {
  constructor(props){
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

  deleteFav(i){
    this.state.favoriteList.splice(i, 1);
    let newFavList = this.state.favoriteList;
    this.setState({ favoriteList: newFavList });
  }

  deleteLater(i){
    this.state.laterList.splice(i, 1);
    let newLaterList = this.state.laterList;
    this.setState({ laterList: newLaterList });
  }

  deleteWatched(i){
    this.state.watchedList.splice(i, 1);
    let newWatchedList = this.state.watchedList;
    this.setState({ watchedList: newWatchedList });
  }

  componentWillMount(){
    // Authentication Stuff
    firebase.auth().onAuthStateChanged((user) => {
    if (user) {
    const watchedRef = firebase.database().ref().child('users/' + user.uid + '/watchedList').orderByKey();
    watchedRef.once('value').then((snapshot) => {
      snapshot.forEach(child => {
        console.log(child.val().poster);
        this.setState({
          watchedList: this.state.watchedList.concat([child.val().poster]),
        });
      });
    });
    const favoritesRef = firebase.database().ref().child('users/' + user.uid + '/favoriteList').orderByKey();
    favoritesRef.once('value').then((snapshot) => {
      snapshot.forEach(child => {
        console.log(child.val().poster);
        this.setState({
          favoriteList: this.state.favoriteList.concat([child.val().poster]),
        });
      });
    });
    const laterRef = firebase.database().ref().child('users/' + user.uid + '/watchLaterList').orderByKey();
    laterRef.once('value').then((snapshot) => {
      snapshot.forEach(child => {
        console.log(child.val().poster);
        this.setState({
          laterList: this.state.laterList.concat([child.val().poster]),
        });
      });
    });
  }
});
}

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

  render(){

    const pList = postList.map((post, count)=> {
      return <ActivityFeed key={post.title + count.toString()} description={post.description} date={post.date}/>
    });
    const fList = friendsList.map((friend, count)=> {
      return <FriendsThumbnail key={friend.name + count.toString()} friendName={friend.name}/>
    });

		return (
      <ProfileStyle>
        <Header />
        <div className="container-fluid row mx-auto">
          <div className="col-2"></div>
          <div className="col-8">
            <Profile>
              <div>
                <Banner src={wallpaper} />
                <div className="container-fluid row">
                  <Img src={profilepic}/>
                  <Name/>
                  <HighlightsButton type="button" className="btn btn-dark" onClick={() => {
                    this.setState({ displayHighlights: true });
                  }}>
                    Highlights
                  </HighlightsButton>
                  <WatchlistsButton type="button" className="btn btn-dark" onClick={() => {
                    this.setState({ displayHighlights: false });
                  }}>
                    Watchlists
                  </WatchlistsButton>
                </div>
              </div>
            </Profile>

            {/* start of main body */}
            <div>

            {this.state.displayHighlights ? (

              <div className="row">
                <div className="left-div col">
                  <UserDescription/>
                  <Box>
                    <Title>
                      <Icon src={friends} alt='friends'/>
                      Friends:
                    </Title>
                    <FriendList className="row">
                      {fList}
                    </FriendList>
                  </Box>
                </div>

                <div className="right-div col">
                  <Box>
                    <Title>
                      Activity Feed
                    </Title>
                    {pList}
                  </Box>
                </div>
              </div>

            ) : (

              <div className="row">
                <div className="left-div col">
                  <Box>
                    <Title>
                      <Icon src={heart} alt='heart'/>
                      Favorites:
                      <EditListButton type="button" className="btn btn-dark btn-sm" onClick={() => {
                        this.setState({ editFav: (this.state.editFav) ? false : true });
                      }}>
                        { (this.state.editFav) ? "Done" : "Edit" }
                      </EditListButton>
                    </Title>
                    <MovieList className='row'>
                    <img src={"http://image.tmdb.org/t/p/w185"+this.state.favoriteList[0]}
                    onError={(e) => {e.target.src="https://i.imgur.com/SeLMJwk.png"}} alt="" width="200" height="298"/>
                    <img src={"http://image.tmdb.org/t/p/w185"+this.state.favoriteList[1]}
                    onError={(e) => {e.target.src="https://i.imgur.com/SeLMJwk.png"}} alt="" width="200" height="298"/>
                    <img src={"http://image.tmdb.org/t/p/w185"+this.state.favoriteList[2]}
                    onError={(e) => {e.target.src="https://i.imgur.com/SeLMJwk.png"}} alt="" width="200" height="298"/>
                    <img src={"http://image.tmdb.org/t/p/w185"+this.state.favoriteList[3]}
                    onError={(e) => {e.target.src="https://i.imgur.com/SeLMJwk.png"}} alt="" width="200" height="298"/>
                    <img src={"http://image.tmdb.org/t/p/w185"+this.state.favoriteList[4]}
                    onError={(e) => {e.target.src="https://i.imgur.com/SeLMJwk.png"}} alt="" width="200" height="298"/>
                    </MovieList>
                  </Box>

                  <Box>
                    <Title>
                      <Icon src={watchLater} alt='watchLater'/>
                      Watch Later:
                      <EditListButton type="button" className="btn btn-dark btn-sm" onClick={() => {
                        this.setState({ editLater: (this.state.editLater) ? false : true });
                      }}>
                        { (this.state.editLater) ? "Done" : "Edit" }
                      </EditListButton>
                    </Title>
                    <MovieList className='row'>
                    <img src={"http://image.tmdb.org/t/p/w185"+this.state.laterList[0]}
                    onError={(e) => {e.target.src="https://i.imgur.com/SeLMJwk.png"}} alt="" width="200" height="298"/>
                    <img src={"http://image.tmdb.org/t/p/w185"+this.state.laterList[1]}
                    onError={(e) => {e.target.src="https://i.imgur.com/SeLMJwk.png"}} alt="" width="200" height="298"/>
                    <img src={"http://image.tmdb.org/t/p/w185"+this.state.laterList[2]}
                    onError={(e) => {e.target.src="https://i.imgur.com/SeLMJwk.png"}} alt="" width="200" height="298"/>
                    <img src={"http://image.tmdb.org/t/p/w185"+this.state.laterList[3]}
                    onError={(e) => {e.target.src="https://i.imgur.com/SeLMJwk.png"}} alt="" width="200" height="298"/>
                    <img src={"http://image.tmdb.org/t/p/w185"+this.state.laterList[4]}
                    onError={(e) => {e.target.src="https://i.imgur.com/SeLMJwk.png"}} alt="" width="200" height="298"/>
                    </MovieList>
                  </Box>

                  <Box>
                    <Title>
                      <Icon src={watched} alt='watched'/>
                      Watched:
                      <EditListButton type="button" className="btn btn-dark btn-sm" onClick={() => {
                        this.setState({ editWatched: (this.state.editWatched) ? false : true });
                      }}>
                        { (this.state.editWatched) ? "Done" : "Edit" }
                      </EditListButton>
                    </Title>
                    <MovieList className='row'>
                    <img src={"http://image.tmdb.org/t/p/w185"+this.state.watchedList[0]}
                    onError={(e) => {e.target.src="https://i.imgur.com/SeLMJwk.png"}} alt="" width="200" height="298"/>
                    <img src={"http://image.tmdb.org/t/p/w185"+this.state.watchedList[1]}
                    onError={(e) => {e.target.src="https://i.imgur.com/SeLMJwk.png"}} alt="" width="200" height="298"/>
                    <img src={"http://image.tmdb.org/t/p/w185"+this.state.watchedList[2]}
                    onError={(e) => {e.target.src="https://i.imgur.com/SeLMJwk.png"}} alt="" width="200" height="298"/>
                    <img src={"http://image.tmdb.org/t/p/w185"+this.state.watchedList[3]}
                    onError={(e) => {e.target.src="https://i.imgur.com/SeLMJwk.png"}} alt="" width="200" height="298"/>
                    <img src={"http://image.tmdb.org/t/p/w185"+this.state.watchedList[4]}
                    onError={(e) => {e.target.src="https://i.imgur.com/SeLMJwk.png"}} alt="" width="200" height="298"/>
                    </MovieList>
                  </Box>
                </div>
              </div>

            )}

            </div>
            {/* end of main body */}
          </div>
          <div className="col-2"></div>
        </div>
      </ProfileStyle>
		);
	}
}

export default compose(withAuthentication)(UserPage);
