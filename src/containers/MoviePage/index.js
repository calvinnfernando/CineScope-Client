import React, { Component } from 'react'
import Header from '../../components/Header'
import TrailerModal from '../../components/TrailerModal'
import styled from 'styled-components'
import TestImage from './ironman3.jpg'
import ThumbsUp from './thumbsup.png'
import ThumbsDown from './thumbsdown.png'
import { Link } from 'react-router-dom';

const WhiteBoxStyle = styled.div`
  margin: 10px 10%;
  background-color: #FFFFFF;
  border-radius: 20px; 

`;

const MovieInfoStyle = styled.div`
  padding: 5%;
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
  margin: 15px auto;
`;

const AddToFavorites = styled.div`
  margin-right: 8px;
`;

const AddToWatchList = styled.div`
  margin-right: 8px;
  padding: 8px 12px;
  border-radius: 8px;
  background-color: #e94e67;
  color: #FFFFFF;
  cursor: pointer;
  transition: .2s;

  &:hover {
    background-color: #fdbcc6;
  }
`;

const TrailerButton = styled.div`
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

const CompareButtonStyle = styled.div`
  position: absolute;
  right: 0px;
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



class MoviePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rating: 0,
      displayTrailer: false
    }
    this.handleThumbsUp = this.handleThumbsUp.bind(this)
    this.handleThumbsDown = this.handleThumbsDown.bind(this)
    this.openTrailer = this.openTrailer.bind(this)
    this.closeTrailer = this.closeTrailer.bind(this)
  }
  handleThumbsUp() {
    this.setState(state => ({
      rating: 1
    }))
  }
  handleThumbsDown() {
    this.setState(state => ({
      rating: -1
    }))
  }
  openTrailer() {
    this.setState({ displayTrailer: true });
  }
  closeTrailer() {
    this.setState({ displayTrailer: false });
  }
  render() {
    return (
      <div>
        <Header />
        <WhiteBoxStyle>
          <MovieInfoStyle className="container">
            <div className="row">
              <MovieLeftStyle className="col-4">
                <img src={TestImage} alt='test' style={{ width: 300 }} />
                <div style={{ marginTop: 15 }}>
                  <button onClick={this.handleThumbsUp} style={{ border: "none", cursor: "pointer", backgroundColor: "Transparent" }}><img src={ThumbsUp} alt='' /></button>
                  <button onClick={this.handleThumbsDown} style={{ border: "none", cursor: "pointer", backgroundColor: "Transparent" }}><img src={ThumbsDown} alt='' /></button>
                  <h4>Average rating: 7/10</h4>
                </div>
              </MovieLeftStyle>
              <MovieRightStyle className="col-8">
                <h1>Iron Man 3</h1>
                <h2>2013</h2>
                <AddButtonsStyle>
                  <AddToFavorites>
                    Star button here
                    </AddToFavorites>
                  <AddToWatchList>
                    + Add to Watched
                    </AddToWatchList>
                  <AddToWatchList>
                    + Add to Watch Later
                    </AddToWatchList>
                  <TrailerButton onClick={this.openTrailer}>
                    &#9658; Watch Trailer
                    </TrailerButton>
                </AddButtonsStyle>
                <p>This is a dummy description of the movie. Plagued with worry and insomnia since saving New York from destruction, Tony Stark (Robert Downey Jr.), now, is more dependent on the suits that give him his Iron Man persona -- so much so that every aspect of his life is affected, including his relationship with Pepper (Gwyneth Paltrow). After a malevolent enemy known as the Mandarin (Ben Kingsley) reduces his personal world to rubble, Tony must rely solely on instinct and ingenuity to avenge his losses and protect the people he loves.</p>

                <Link to="/Comparitron">
                  <CompareButtonStyle>
                    Open Movie in Comparitron
                    </CompareButtonStyle>
                </Link>
              </MovieRightStyle>
            </div>
          </MovieInfoStyle>
        </WhiteBoxStyle>
        {this.state.displayTrailer && <TrailerModal closeTrailer={this.closeTrailer} />}

      </div>
    );
  }
}

export default MoviePage;