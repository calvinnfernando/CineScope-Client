import React, { Component } from 'react';
import MenuButton from './MenuButton.js';
import styled from 'styled-components';

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

const AccountIconStyle = styled.div`
    padding: 10px;
`;


class Header extends Component {

    render(){
        // This code borrowed from Codecademy. Maps links to their pages
        const pages = ['Home', 'Movies', 'New Releases', 'Comparitron'];
        const navLinks = pages.map(page => {
            return <MenuButton key={page} name={page} link={'/'+page} />
        });

        return (
            // uses Bootstrap classes
            <HeaderContainerStyle className="container-fluid">
                <div className="row">
                    <h1 className="col-sm-4">
                        <a href=""><img src="" alt="Cinescope Logo" /></a>
                    </h1>
                    <MenuItemsStyle className="col-sm-6">
                        {navLinks}
                    </MenuItemsStyle>
                    <AccountIconStyle className="col-sm-2">
                        {/* NOTE: the link to this must be set to user profile */}
                        <MenuButton name={"account"} />
                    </AccountIconStyle>
                </div>
            </HeaderContainerStyle>
        );
    }
}

export default Header;