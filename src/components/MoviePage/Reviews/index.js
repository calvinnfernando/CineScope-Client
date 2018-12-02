import React, { Component } from 'react';
import styled from 'styled-components'

const ReviewsStyle = styled.div`
    text-align: center;

    a, a:hover {
        text-decoration: none;
        color: #777;
    }

    p {
        margin: 10px;
    }

`;

const Review = styled.div`
    width: 100%;
    margin: auto;
`;

const ReviewAuthor = styled.p`
    text-align: left;
`;

const ReviewText = styled.p`
    text-align: justify;
`;

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
            return (<Review key={review.id}>
                <hr />
                <ReviewAuthor>Reviewed by <b>{review.author}</b></ReviewAuthor>
                <ReviewText>{review.content}</ReviewText>

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