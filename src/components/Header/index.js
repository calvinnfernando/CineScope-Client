"Used template from https://reactstrap.github.io/components/navbar/"
import React, {Component} from 'react';
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
import SignOutButton from '../SignOut';
import { AuthUserContext } from '../Sessions';

const LogoStyle = styled.div`
margin: 10px auto;
img {
	height: 60px;
}
`;

const AccountIconStyle = styled.div`
padding: 10px;
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
                <Navbar color="warning" light expand="md">
                    {/*Logo; redirects back to main page*/}
                    <LogoStyle className="col-sm-2">
                        <a href="/"><img src={logo}/></a>
                    </LogoStyle>
                    {/*Compresses navbar buttons into a toggler if the window is too small*/}
                    <NavbarToggler onClick={this.toggle}/>
                    {/*Navbar contents*/}
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="mr-auto" navbar>
                            <NavItem style={{fontSize: 20, fontWeight: 'bold'}}>
                                <NavLink href="/">Home</NavLink>
                            </NavItem>
                            <NavItem style={{fontSize: 20, fontWeight: 'bold'}}>
                                <NavLink href="/Movies">Movies</NavLink>
                            </NavItem>
                            <NavItem style={{fontSize: 20, fontWeight: 'bold'}}>
                                <NavLink href="/New_Releases">New Releases</NavLink>
                            </NavItem>
                            <NavItem style={{fontSize: 20, fontWeight: 'bold'}}>
                                <NavLink href="/Comparitron">Comparitron</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                    {/*User profile picture*/}
                    
                    <AuthUserContext.Consumer>
                    {
                        authUser => authUser
                            ? <AccountIconStyle>
                                {authUser.username} logged in <br/>
                                <SignOutButton/>
                              </AccountIconStyle>
                            : <AccountIconStyle><a href="/login">Login</a></AccountIconStyle>
                    }
                    </AuthUserContext.Consumer>
                </Navbar>
            </div>
        );
    }
}

export default Header;
