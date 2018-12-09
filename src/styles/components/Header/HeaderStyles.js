import styled from 'styled-components';

const LogoStyle = styled.div`
margin: 10px auto;
img {
    height: 60px;
    max-width: 100%;
}
`;

const AccountIconStyle = styled.div`
padding: 10px;
font-size: 22px;
font-family: 'Roboto Slab';
a {
    color: #555;
}
a:hover {
    color: #222;
    text-decoration: none;
}
`;

export {LogoStyle, AccountIconStyle}
