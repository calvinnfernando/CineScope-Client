import styled from 'styled-components';

const Error = styled.div`
  display: block;
  background-color: rgba(255, 0, 0, 0.2);
  border-radius: 5px;
  text-align: center;
  padding: 5px;
`;

const FullScreen = styled.div`
  height: 100vh;
  width: 100vw;
`;

const Form = styled.form`
  height: 500px;
  width: 500px;
  background-color: rgba(211,211,211,0.5);
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  margin-top: 220px;
`;

const TitleLogo = styled.div`
    text-align: center;
    font-family: 'Lobster', 'Verdana';
    color: #FFFFFF;
    font-size: 5em;
    text-shadow: 2px 4px rgba(66, 31, 107, 0.2);
`;

export { Error, FullScreen, Form, TitleLogo };
