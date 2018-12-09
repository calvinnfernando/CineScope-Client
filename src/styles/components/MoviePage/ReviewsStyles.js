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

export {ReviewsStyle, Review, ReviewAuthor, ReviewText}
