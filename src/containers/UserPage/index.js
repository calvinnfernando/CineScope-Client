import React, { Component } from 'react';
import styled from 'styled-components';
import wallpaper from './wallpaper-sponge.jpg';
import profilepic from './profpic-sponge.webp';
import introicon from './intro-icon.jpeg';
import ironman3 from './ironman3.jpg';
import antman from './antman.jpg';
import heart from './heart.png';

import MovieThumbnail from './MovieThumbnail';
import Post from './Post';

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
`;

const SmallText = styled.p`
  font-size: 0.8em;
  margin-bottom: 0px;
`;

const Icon = styled.img`
  height: 20px;
  width: 20px;
  margin-right: 5px;
`;

const MovieList = styled.div`
  
`;

const mList = [
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

class UserPage extends Component {
  render(){
    const movieList = mList.map((movie) => {
      return <MovieThumbnail movieTitle={movie.title} imgsrc={movie.imgsrc}/>
    });
    const pList = postList.map((post)=> {
      return <Post description={post.description} date={post.date}/>
    })
		return (
      <div className="container-fluid row mx-auto" style={{ backgroundColor: '#F0F0F0'}}>
        <div className="col-2"></div>
        <div className="col-8"> 
          <Profile>
            <div>
              <Banner src={wallpaper} />
              <div className="container-fluid row">
                <Img src={profilepic}/>
                <Name>SepongBob Squarepants</Name>
              </div>
            </div>
          </Profile>

          {/* start of main body */}
          <div className="row">
            <div className="left-div col">
              <Box>
                <Title>
                  <Icon src={introicon} alt='calvin'/>
                  Intro
                </Title>
                <SmallText>Lives in San Diego, California</SmallText>
                <SmallText>Loves action movies</SmallText>
                <SmallText>June 12 1997</SmallText>
              </Box>
              <Box>
                <Title>
                  <Icon src={heart} alt='heart'/>
                  Favourites:
                </Title>
                <MovieList className='row'>
                  {movieList}
                </MovieList>
              </Box>
            </div>
            <div className="right-div col">

              <Box>
                <Title>
                  Posts
                </Title>
                {pList}
              </Box>
            </div>
            
          </div>
          {/* end of main body */}
        </div>
        <div className="col-2"></div>
      </div>
		);
	}
}

export default UserPage;
