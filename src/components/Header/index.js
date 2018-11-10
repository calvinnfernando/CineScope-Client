import React, { Component } from 'react';
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem } from 'reactstrap';

import MenuButton from './MenuButton.js';
import styled from 'styled-components';
import logo from '../img/logo.svg';



const HeaderContainerStyle = styled.header`
background-color: rgb(238, 99, 56);
a {
	color: white;
	font-size: 20px;
}

a:hover {
	text-decoration: none;
	color: rgb(255, 206, 199);
}
`;

const MenuItemsStyle = styled.nav`
display: flex;
flex-wrap: wrap;
align-items: center;
`;

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
			<Navbar color="light" light expand="md">
			<LogoStyle className="col-sm-4">
			<a href="/"><img src={logo}/></a>
			</LogoStyle>
			<NavbarToggler onClick={this.toggle} />
			<Collapse isOpen={this.state.isOpen} navbar>
			<Nav className="mr-auto" navbar>
			<NavItem style={{fontSize: 20}}>
			<NavLink href="/">Home</NavLink>
			</NavItem>
			<NavItem style={{fontSize: 20}}>
			<NavLink href="/Movies">Movies</NavLink>
			</NavItem>
			<NavItem style={{fontSize: 20}}>
			<NavLink href="/New_Releases">New Releases</NavLink>
			</NavItem>
			<NavItem style={{fontSize: 20}}>
			<NavLink href="/Comparitron">Comparitron</NavLink>
			</NavItem>
			<UncontrolledDropdown nav inNavbar>
			<DropdownToggle style={{fontSize: 20}} nav caret>
			Options
			</DropdownToggle>
			<DropdownMenu right>
			<DropdownItem>
			Option 1
			</DropdownItem>
			<DropdownItem>
			Option 2
			</DropdownItem>
			<DropdownItem divider />
			<DropdownItem>
			Reset
			</DropdownItem>
			</DropdownMenu>
			</UncontrolledDropdown>
			</Nav>
			</Collapse>
		    <AccountIconStyle className="col-sm-2">
			{/* NOTE: the link to this must be set to user profile */}
			<a href="/profile"><MenuButton name={"account"} /></a>
		    </AccountIconStyle>
			</Navbar>
			</div>
		);
		// This code borrowed from Codecademy. Maps links to their pages
		/*const pages = ['Home', 'Movies', 'New Releases', 'Comparitron'];
	const navLinks = pages.map(page => {
	    return <MenuButton key={page} name={page} link={'/'+page} />
	});

	return (
		// uses Bootstrap classes
	    <HeaderContainerStyle className="container-fluid">
		<div className="row">
		    <LogoStyle className="col-sm-4">
			<a href=""><img src={logo} alt="Cinescope Logo" /></a>
		    </LogoStyle>
		    <MenuItemsStyle className="col-sm-6">
			{navLinks}
		    </MenuItemsStyle>
		    <AccountIconStyle className="col-sm-2">
		// NOTE: the link to this must be set to user profile
			<a href="/profile"><MenuButton name={"account"} /></a>
		    </AccountIconStyle>
		</div>
	    </HeaderContainerStyle>
	);*/
	}
}

export default Header;
