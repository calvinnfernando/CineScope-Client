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
import logo from '../img/logo.svg';
import { AuthUserContext } from '../Sessions';
import {LogoStyle, AccountIconStyle} from '../../styles/components/Header/HeaderStyles'
import HeaderStylesInline from '../../styles/components/Header/HeaderStylesInline'


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
                <Navbar style={HeaderStylesInline.background} light expand="md">
                    {/*Logo; redirects back to main page*/}
                    <LogoStyle className="col-md-2">
                        <a href="/"><img src={logo} alt='CineScope' /></a>
                    </LogoStyle>
                    {/*Compresses navbar buttons into a toggler if the window is too small*/}
                    <NavbarToggler onClick={this.toggle} />
                    {/*Navbar contents*/}
                    <Collapse className="col-md-8" isOpen={this.state.isOpen} navbar>
                        <Nav className="mr-auto" navbar>
                            <NavItem style={HeaderStylesInline.nav}>
                                <NavLink href="/">Home</NavLink>
                            </NavItem>
                            <NavItem style={HeaderStylesInline.nav}>
                                <NavLink href="/all-movies">All Movies</NavLink>
                            </NavItem>
                            <NavItem style={HeaderStylesInline.nav}>
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
