import React, { Component } from 'react'
// import Header from '../../components/Header'
// import Carousel from '../../components/Carousel'
// import styled from 'styled-components'
import TestImage from './ironman3.jpg'
import ThumbsUp from './thumbsup.png'
import ThumbsDown from './thumbsdown.png'

class MoviePage extends Component {
  constructor (props) {
    super(props)
    this.state = { rating: 0 }
    this.handleThumbsUp = this.handleThumbsUp.bind(this)
    this.handleThumbsDown = this.handleThumbsDown.bind(this)
  }
  handleThumbsUp () {
    this.setState(state => ({
      rating: 1
    }))
  }
  handleThumbsDown () {
    this.setState(state => ({
      rating: -1
    }))
  }
  render () {
    return (
      <div style={{paddingLeft: 100, display: "flex", alignItems: "center", flexDirection:"row"}}>
        <div style={{display: "inline-block", verticalAlign: "top"}}>
          <div style={{display: "flex", alignItems: "center", flexDirection:"column"}}>
            <h1>Iron Man 3</h1>
            <h2>2013</h2>
            <img src={TestImage} alt='test' style={{width: 300}}/>
            <div style={{justifyContent: "center"}}>
              <button onClick={this.handleThumbsUp} style={{border: "none", cursor: "pointer", backgroundColor: "Transparent"}}><img src={ThumbsUp} alt=''/></button>
              <button onClick={this.handleThumbsDown} style={{border: "none", cursor: "pointer", backgroundColor: "Transparent"}}><img src={ThumbsDown} alt=''/></button>
            </div>
            <h4>Average rating: 7/10</h4>
          </div>
        </div>
        <div style={{display: "inline-block", paddingLeft: 50}}>
          <iframe height="480" width="640"
            src="https://www.youtube.com/embed/oYSD2VQagc4">
          </iframe>
          <p>This is a description of the movie</p>
        </div>
        <div style = {{display: "inline-block", paddingRight: 100}}>
          <button style={{cursor: "pointer", backgroundColor: "Transparent"}}>Compare</button>
        </div>
      </div>
    )
  }
}

export default MoviePage
