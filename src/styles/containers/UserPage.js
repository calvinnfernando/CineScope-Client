import styled from 'styled-components';

const ProfileStyle = styled.div`
  background-color: #232323;
  color: #232323;
`;

const Profile = styled.div`
  border: 1px solid #999999;
  background-color: #e9ecef;
  margin-bottom: 12px;
  min-width: 768px;
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
  margin-left: 20px;
  margin-bottom: 15px;
  border: 5px solid #787878;
`;

const EditListButton = styled.button`
  position: relative;
  float: right;
  margin: 0px 15px;
`;

const MovieList = styled.div`
  padding: 5px 15px;
`;

const Box = styled.div`
  margin: 7px 0px 10px 0px;
  background-color: #e9ecef;
  border: 1px solid #999999;
  box-sizing: border-box;
  padding: 5px;
  min-width: 768px;
`;

const Title = styled.div`
  font-size: 1.1em;
  margin-left: 15px;
  margin-top: 10px;
`;

const Icon = styled.img`
  height: 20px;
  width: 20px;
  margin-right: 5px;
`;

const ErrorMessage = styled.div`
  text-align: center;
  margin: auto;
  font-size: 2em;
  margin-top: 2em;
  color: #ddd;

  a {
    color: #999;
  }

  a:hover {
    text-decoration: none;
    color: white;
  }
`;

const ListTitle = styled.span`
  text-align: center;
  font-Weight: bold;
  color: #222;
  font-family: 'Roboto';
`;

const NoMovies = styled.div`
  text-align: center;
  font-Weight: bold;
  color: #888;
  font-family: 'Roboto';
`;

export { Profile, ProfileStyle, Banner, Img, EditListButton, MovieList, Box, Title, Icon, ErrorMessage, ListTitle, NoMovies };
