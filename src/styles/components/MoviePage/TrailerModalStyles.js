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

export {Overlay, OverlayContent}
