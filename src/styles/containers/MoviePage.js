import styled from 'styled-components';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const WhiteBoxStyle = styled.div`
  margin: 10px 10%;
  background-color: #FFFFFF;
  border-radius: 20px;
`;

const MovieInfoStyle = styled.div`
  padding: 5%;
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

const AddButtonsStyle = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 15px auto;
`;

const AddToFavorites = styled.span`
  margin-right: 8px;
  padding: 8px 12px;
  border-radius: 8px;
  background-color: #FFA500;
  color: #FFFFFF;
  cursor: pointer;
  transition: .2s;

  &:hover {
    background-color: #cc8400;
  }
`;

const AddToWatchList = styled.span`
  margin-right: 8px;
  padding: 8px 12px;
  border-radius: 8px;
  background-color: #e94e67;
  color: #FFFFFF;
  cursor: pointer;
  transition: .2s;

  &:hover {
    background-color: #ba3e52;
  }
`;

const RemoveFromFavorites = styled.span`
  margin-right: 8px;
  padding: 8px 12px;
  border-radius: 8px;
  background-color: #cc8400;
  color: #FFFFFF;
  cursor: pointer;
  transition: .2s;

  &:hover {
    background-color: #cc8400;
  }
`;

const RemoveFromWatchList = styled.span`
  margin-right: 8px;
  padding: 8px 12px;
  border-radius: 8px;
  background-color: #ba3e52;
  color: #FFFFFF;
  cursor: pointer;
  transition: .2s;

  &:hover {
    background-color: #ba3e52;
  }
`;


const TrailerButton = styled.span`
  margin-right: 8px;
  padding: 8px 12px;
  border-radius: 8px;
  background-color: #3997e6;
  color: #FFFFFF;
  cursor: pointer;
  transition: .2s;

  &:hover {
    background-color: #384491;
  }
`;

const CompareButtonStyle = styled.div`
  position: absolute;
  right: 2%;
  bottom: 0px;
  padding: 8px 12px;
  border-radius: 8px;
  background-color: #f78a40;
  color: #FFFFFF;
  cursor: pointer;
  transition: .2s;

  &:hover {
    background-color: #ffd3b5;
  }
`;

const RateStyle = styled.span`
  font-size: 24px;
  margin: 0px 2px;
`;

const SignInNotification = styled.span`
  position: fixed;
  top: 4em;
  left: 50%;
  transform: translate(-50%);
  z-index: 10;
  background-color: #384491;
  padding: 8px 12px;
  border-radius: 8px;
  color: #FFFFFF;
  transition: 0.5s;
  opacity: 0;

  &.show {
    opacity: 1;
  }

  a {
    color: #999;
  }

  a:hover {
    text-decoration: none;
    color: white;
  }
`;

const RateDiv = styled.div`
  margin-top: 15px;
`;

const OverviewP = styled.p`
  margin-bottom: 2rem;
`;

const TextAreaStyle = styled.textarea`
  width: 100%;
  height: 200px;
`;

export { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, WhiteBoxStyle, MovieInfoStyle, 
	MoviePosterStyle, MovieLeftStyle, MovieRightStyle, AddButtonsStyle, AddToFavorites, AddToWatchList,
	RemoveFromFavorites, RemoveFromWatchList, TrailerButton, CompareButtonStyle, RateStyle, SignInNotification,
  RateDiv, OverviewP, TextAreaStyle };