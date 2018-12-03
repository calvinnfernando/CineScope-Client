import React, { Component } from 'react'
import Header from '../../components/Header'
import ItemsCarousel from 'react-items-carousel';
import styled from 'styled-components';
import FriendsList from './FriendsList' //move to component
import { Calendar } from 'react-date-range';
import { Link } from 'react-router-dom';

const WhiteBoxStyle = styled.div`
  margin: 10px 10%;
  background-color: #FFFFFF;
  border-radius: 20px; 
`;

const MoviePlannerStyle = styled.div`
  padding: 2%;
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

const InviteButton = styled.span`
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

const InviteButtonWrapper = styled.div`
    text-align: center;
`;

const TitlePage = styled.h1`
    margin-left: 30px;
`;

const SelectFriendsWrapper = styled.h4`
    margin-left: 30px;
`;

const friends = ["Calvin", "Alissa","Albert","Peter","Wesley","Muhammad","Keven","Antonio","Bethany","Amir"];

const FriendCard = (props) => (
  <div className="friend-card">
  </div>
);


class MoviePlanner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            friends: [],
            activeItemIndex: 0,
            query: 338952
        }
    }

/*
    componentDidMount() {
        MovieService.getRecommendedMovies(this.state.query).then((movies) => {
            this.setState({
                friends: friends,
                activeItemIndex: 0,
                // This query is just a random movie ID. Stays until Server is working
                query: 338952
            });
        });
    }
*/

    handleSelect(date){
        console.log(date); // Momentjs object
    }

    changeActiveItem = (activeItemIndex) => this.setState({ activeItemIndex: activeItemIndex });

    render() {
        const {
            movies,
            activeItemIndex
        } = this.state;

        const friendsArr = friends.map(friend => (<FriendsList friendName={friend} />));

        return (
            <div>
            <Header />
                <WhiteBoxStyle>
                    <MoviePlannerStyle className='container'>
                        <TitlePage>Make a Plan</TitlePage>
                        <div className="row">
                            <MovieLeftStyle className="col-4">
                                <MoviePosterStyle>
                                    <img src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2/x1txcDXkcM65gl7w20PwYSxAYah.jpg`}
                                    alt={this.state.title} onError={(e) => { e.target.src = "https://i.imgur.com/SeLMJwk.png" }} />
                                </MoviePosterStyle>
                            </MovieLeftStyle>
                            <MovieRightStyle className="col-8">
                                <h1>The Incredibles 2</h1>                           
                                <div>
                                    <h4>Choose a date</h4>
                                    <Calendar
                                        onInit={this.handleSelect}
                                        onChange={this.handleSelect}
                                    />
                                </div>
                            </MovieRightStyle>
                        </div>
                        <hr></hr>
                        <SelectFriendsWrapper>Select Friends</SelectFriendsWrapper>
                        <div className="col-sm-12">

                            <ItemsCarousel
                                // Placeholder configurations
                                enablePlaceholder
                                numberOfPlaceholderItems={5}
                                minimumPlaceholderTime={1000}
                                placeholderItem={<div style={{ height: 300, width: 200, background: '#900' }}>Placeholder</div>}

                                // Carousel configurations
                                numberOfCards={4}
                                gutter={12}
                                showSlither={false}
                                firstAndLastGutter={true}
                                freeScrolling={false}

                                // Active item configurations
                                requestToChangeActive={this.changeActiveItem}
                                activeItemIndex={activeItemIndex}
                                activePosition={'center'}

                                chevronWidth={12}
                                rightChevron={<span style={{color: '#000000', size: '20px'}}> &gt; </span>}
                                leftChevron={<span style={{color: '#000000'}}> &lt; </span>}
                                outsideChevron={true}
                            >
                                {friendsArr}
                            </ItemsCarousel>
                        </div>
                        <hr></hr>
                        <InviteButtonWrapper>
                            <InviteButton>
                                Invite
                            </InviteButton>
                        </InviteButtonWrapper>
                    </MoviePlannerStyle>
                </WhiteBoxStyle>
            </div>
        );
    }
}

export default MoviePlanner;