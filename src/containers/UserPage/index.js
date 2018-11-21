import React, { Component } from 'react';
import styled from 'styled-components';
import Header from '../../components/Header';
import wallpaper from './wallpaper-sponge.jpg';
import profilepic from './profpic-sponge.webp';
import introicon from './intro-icon.jpeg';
import ironman3 from './ironman3.jpg';
import antman from './antman.jpg';
import heart from './heart.png';
import friends from './friends.png';
import watchLater from './watch-later.png';
import watched from './watched.png';

import MovieThumbnail from './MovieThumbnail';
import ActivityFeed from './ActivityFeed';
import FriendsThumbnail from './FriendsThumbnail';

const ProfileStyle =  styled.div`
  background-color: #F0F0F0;
`;

const Profile = styled.div`
  border: 1px solid #dddfe2;
  background-color: white;  
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
  border: 5px solid white;
`;

const Name = styled.h3`
  max-width: 30%;
  margin-left: 10px;
`;

const Box = styled.div`
  margin: 7px 0px 7px 0px;
  background-color: white;
  border: 1px solid #dddfe2;
  box-sizing: border-box;
  padding: 5px;
`;

const Title = styled.p`
  font-size: 1.1em;
  margin-left: 15px;
  margin-top: 10px;
`;

const SmallText = styled.p`
  font-size: 0.8em;
  margin-left: 15px;
  margin-bottom: 5px;
`;

const Icon = styled.img`
  height: 20px;
  width: 20px;
  margin-right: 5px;
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

const movieList = [
  {title: 'Iron Man 3', imgsrc: ironman3},
  {title: 'Ant Man', imgsrc: antman},
  {title: 'Ant Man', imgsrc: antman},
  {title: 'Iron Man 3', imgsrc: ironman3},
];

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
      displayHighlights: props.location.state.highlights,
    };
  }

  render(){
    const mList = movieList.map((movie, count) => {
      return <MovieThumbnail key={movie.title + count.toString()} movieTitle={movie.title} imgsrc={movie.imgsrc}/>
    });
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
                  <Name>SpongeBob Squarepants</Name>
                  <HighlightsButton type="button" className="btn btn-light" onClick={() => {
                    this.setState({ displayHighlights: true });
                  }}>
                    Highlights
                  </HighlightsButton>
                  <WatchlistsButton type="button" className="btn btn-light" onClick={() => {
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
                  <Box>
                    <Title>
                      <Icon src={introicon} alt='into'/>
                      Intro
                    </Title>
                    <SmallText>Lives in San Diego, California</SmallText>
                    <SmallText>Loves action movies</SmallText>
                    <SmallText>June 12 1997</SmallText>
                  </Box>
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
                      Favourites:
                    </Title>
                    <MovieList className='row'>
                      {mList}
                    </MovieList>
                  </Box>
                  
                  <Box>
                    <Title>
                      <Icon src={watchLater} alt='watchLater'/>
                      Watch Later:
                    </Title>
                    <MovieList className='row'>
                      {mList}
                    </MovieList>
                  </Box>

                  <Box>
                    <Title>
                      <Icon src={watched} alt='watched'/>
                      Watched:
                    </Title>
                    <MovieList className='row'>
                      {mList}
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

export default UserPage;
