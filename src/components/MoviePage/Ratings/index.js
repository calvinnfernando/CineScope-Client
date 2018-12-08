import React, { Component } from 'react';
import RatingsStyle from '../../../styles/components/MoviePage/RatingsStyle'
import RottenTomatoesIcon from '../../../styles/components/MoviePage/RottenTomatoesIcon'
import MetacriticIcon from '../../../styles/components/MoviePage/MetacriticIcon'
import ImdbIcon from '../../../styles/components/MoviePage/ImdbIcon'
import RatingStyle from '../../../styles/components/MoviePage/RatingStyle'
import RatingTextStyle from '../../../styles/components/MoviePage/RatingTextStyle'

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
                            {this.props.rottenTomatoes && this.props.rottenTomatoes !== 'N/A' ? (
                            <RatingTextStyle><h4>{this.props.rottenTomatoes + ' liked it'}</h4> </RatingTextStyle> ) :
                            (<RatingTextStyle><h4>{'No rating available'}</h4></RatingTextStyle>
                            )}
                        </RatingStyle>
                    </div>
                    <div className="col-md-4">
                        <h3>Metacritic</h3>
                        <RatingStyle>
                            <MetacriticIcon>{this.props.metacritic}</MetacriticIcon>
                            {this.props.metacritic && this.props.metacritic !== 'N/A' ? (
                            <RatingTextStyle><h4>Metascore</h4></RatingTextStyle> ) :
                            (<RatingTextStyle><h4>{'No Metascore available'}</h4></RatingTextStyle>
                            )}
                        </RatingStyle>
                    </div>
                    <div className="col-md-4">
                        <h3>IMDb</h3>
                        <RatingStyle>
                            <ImdbIcon />
                            {this.props.imdbRating && this.props.imdbRating !== 'N/A' ? (
                            <RatingTextStyle><h4>{this.props.imdbRating}/10 stars</h4></RatingTextStyle> ) :
                            (<RatingTextStyle><h4>{'No rating available'}</h4></RatingTextStyle>
                            )}
                        </RatingStyle>
                    </div>
                </RatingsStyle>
            </div>
        )
    }

}


export default Ratings;
