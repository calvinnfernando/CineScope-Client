import React, { Component } from 'react';
import styled from 'styled-components'

const RatingsStyle = styled.div`
    text-align: center;

    a {
        text-decoration: none;
        color: black;
    }

    a:hover {
        text-decoration: none;
        color: #777;
    }
`;

const RottenTomatoesIcon = styled.div`
    display: inline-block;
    background: url(https://www.rottentomatoes.com/assets/pizza-pie/images/icons/global/new-fresh-lg.12e316e31d2.png);
    background-size: cover;
    height: 48px;
    width: 48px;
`;

const MetacriticIcon = styled.div`
    display: inline-block;
    background-color: #6c3;
    color: #fff;
    border-radius: 3px;
    padding: 5px 0px;
    vertical-align: middle;
    text-align: center;
    font-family: Arial,Helvetica,sans-serif;
    font-size: 24px;
    font-weight: bold;
    height: 48px;
    width: 48px;
`;

const ImdbIcon = styled.div`
    display: inline-block;
    background: url(https://m.media-amazon.com/images/G/01/imdb/images/title/title_overview_sprite-1705639977._V_.png);
    background-position: -15px -118px;
    height: 40px;
    width: 40px;
`;

const RatingStyle = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const RatingTextStyle = styled.div`
    margin: auto 10px;
`;

class Ratings extends Component {

    render() {
        return (
            <div>
                <h2>Ratings</h2>
                <RatingsStyle className="row">

                    <div className="col-md-4">
                        <h3>Rotten Tomatoes</h3>
                        <RatingStyle>
                            <RottenTomatoesIcon />
                            <RatingTextStyle><h4>{this.props.rottenTomatoes}% liked it</h4></RatingTextStyle>
                        </RatingStyle>
                    </div>
                    <div className="col-md-4">
                        <h3>Metacritic</h3>
                        <RatingStyle>
                            <MetacriticIcon>{this.props.metacritic}</MetacriticIcon>
                            <RatingTextStyle><h4>Metascore</h4></RatingTextStyle>
                        </RatingStyle>
                    </div>
                    <div className="col-md-4">
                        <h3>IMDb</h3>
                        <RatingStyle>
                            <ImdbIcon />
                            <RatingTextStyle><h4>{this.props.imdbRating}/10 stars</h4></RatingTextStyle>
                        </RatingStyle>
                    </div>
                </RatingsStyle>
            </div>
        )
    }

}


export default Ratings;