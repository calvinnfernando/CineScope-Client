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

class Reviews extends Component {

    render() {
        const reviews = ['This is not a real review.', 'This review will be replaced.', 'Review needed here.'];
        const reviewsToDisplay = reviews.map(review => { 
            return <div key={review}><p>{review}</p><br></br></div>
        }); 

        return (
            <div>
                <h2>Reviews</h2>
                <ReviewsStyle className="row">
                    {reviewsToDisplay}
                </ReviewsStyle>
            </div>
        )
    }

}

export default Reviews;