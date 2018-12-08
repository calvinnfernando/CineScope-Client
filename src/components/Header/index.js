import React from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap';

import MenuButton from './MenuButton.js';
import styled from 'styled-components';
import logo from '../img/logo.svg';
import { AuthUserContext } from '../Sessions';

const LogoStyle = styled.div`
margin: 10px auto;
img {
    height: 60px;
    max-width: 100%;
}
`;

const AccountIconStyle = styled.div`
padding: 10px;
font-size: 24px;
font-family: 'Roboto Slab';
a {
    color: #555;
}
a:hover {
    color: #222;
    text-decoration: none;
}
`;

class Header extends React.Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return (
            <div>
                {/* Setting the color and setting display adjustments */}
                <Navbar style={{backgroundColor: '#ffcc5c'}} light expand="md">
                    {/*Logo; redirects back to main page*/}
                    <LogoStyle>
                        <a href="/"><img src={logo} alt='CineScope' /></a>
                    </LogoStyle>
                    {/*Compresses navbar buttons into a toggler if the window is too small*/}
                    <NavbarToggler onClick={this.toggle} />
                    {/*Navbar contents*/}
                    <Collapse className="col-md-8" isOpen={this.state.isOpen} navbar>
                        <Nav className="mr-auto" navbar>
                            <NavItem style={{ fontFamily: 'Roboto Slab', fontSize: 30, fontWeight: 'bold' }}>
                                <NavLink href="/">Home</NavLink>
                            </NavItem>
                            <NavItem style={{ fontFamily: 'Roboto Slab', fontSize: 30, fontWeight: 'bold' }}>
                                <NavLink href="/all-movies">All Movies</NavLink>
                            </NavItem>
                            <NavItem style={{ fontFamily: 'Roboto Slab', fontSize: 30, fontWeight: 'bold' }}>
                                <NavLink href="/Comparitron">Comparitron</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                    {/*User profile picture*/}
                    <AuthUserContext.Consumer>
                        {
                            authUser => authUser
                                ? <AccountIconStyle className="col-md-2">
                                    <MenuButton name={"account"} username={authUser.username} />
                                </AccountIconStyle>
                                : <AccountIconStyle className="col-md-2"><a href="/login">Login</a></AccountIconStyle>
                        }
                    </AuthUserContext.Consumer>

                </Navbar>
            </div>
        );
    }
}

export default Header;
