import styled from 'styled-components';

const MovieCardStyle = styled.div`
margin: 15px auto;
width: 60%;
position: relative;
text-align: center;

img {
  width: 100%;
  height: auto;
}
`;

const MovieCardOverlay = styled.div`
background: rgba(0,0,0,0.5);
opacity: 0;
position: absolute;
top: 0px;
left: 0px;
width: 100%;
height: 100%;
&:hover {
  opacity: 1
}
`;

const MovieCardText = styled.p`
z-index: 5;
margin-top: 25%;
color: white;
`;

export {
	MovieCardStyle, MovieCardOverlay, MovieCardText
};
