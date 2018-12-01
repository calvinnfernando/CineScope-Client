import React, { Component } from 'react';
import styled from 'styled-components'

const Overlay = styled.div`
    height: 100%;
    width: 100%;
    position: fixed; 
    z-index: 1;
    left: 0;
    top: 0;
    background-color: rgb(0,0,0); 
    background-color: rgba(0,0,0, 0.8); 
    overflow-x: hidden;
`;

const OverlayContent = styled.div`
    position: relative;
    top: 10%;
    width: 680px;
    height: 520px;
    padding: 20px;
    text-align: center; 
    margin: 30px auto 0px; 
    background-color: #767676; 
    box-shadow: 2px 8px 10px rgba(0, 0, 0, .3);
    color: white;
`;

class TrailerModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasVideo: true
        }
    }

    componentDidMount() {
        if (!this.props.video || this.props.video === '') {
            this.setState({ hasVideo: false });
        }
    }

    render() {
        return (
            <Overlay onClick={this.props.closeTrailer}>
                <OverlayContent>
                    {this.state.hasVideo ? (
                        <iframe height="480" width="640" title="Trailer"
                            src={`https://www.youtube.com/embed/${this.props.video.key}`}>
                        </iframe>
                    ) : (
                        <div>A trailer is not available for this movie.</div>
                    )}
                </OverlayContent>
            </Overlay>
        )
    }

}


export default TrailerModal;