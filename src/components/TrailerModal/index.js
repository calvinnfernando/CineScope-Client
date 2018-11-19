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
`;

class TrailerModal extends Component {

    render() {
        return (
            <Overlay onClick={this.props.closeTrailer}>
                <OverlayContent>
                    <iframe height="480" width="640"
                        src="https://www.youtube.com/embed/oYSD2VQagc4">
                    </iframe>
                </OverlayContent>
            </Overlay>
        )
    }

}


export default TrailerModal;