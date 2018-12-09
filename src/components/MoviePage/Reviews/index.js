import React, { Component } from 'react';
import {ReviewsStyle, Review, ReviewAuthor, ReviewText} from '../../../styles/components/MoviePage/ReviewsStyles'

class Reviews extends Component {

    render() {
        const reviews = this.props.reviews;
        if (!reviews) {
            return (
                <div>
                    <h2>Reviews</h2>
                    <p>This movie has not been reviewed.</p>
                </div>
            );
        }
        const reviewsToDisplay = reviews.map(review => {
            return (<Review key={review.author}>
                <hr />
                <ReviewAuthor>Reviewed by <b>{review.author}</b></ReviewAuthor>
                <ReviewText dangerouslySetInnerHTML={{__html: review.content}} />

            </Review>);
        });

        return (
            <div>
                <h2>User Reviews</h2>
                <ReviewsStyle className="container">
                    {reviewsToDisplay}
                </ReviewsStyle>
            </div>
        )
    }

}

export default Reviews;
