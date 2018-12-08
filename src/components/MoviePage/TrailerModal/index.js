import React, { Component } from 'react';
import {Overlay, OverlayContent} from '../../../styles/components/MoviePage/TrailerModalStyles'

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
