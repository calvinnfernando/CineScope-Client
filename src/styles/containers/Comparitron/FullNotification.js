import styled from 'styled-components';
const FullNotification = styled.span`
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

export default FullNotification
