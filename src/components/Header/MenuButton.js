import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import SignOutButton from '../SignOut';

import profilepic from '../img/profile.svg';

const MenuBtnStyle = styled.div`
    position: relative;
    margin: 0px 20px;
    font-size: 20px;
    a {
        display: block;
        text-align: left;
        color: #777;
    }

    a:hover {
        text-decoration: none;
        color: #f4c542;
    }
`;

const AccountIcon = styled.img`
    border: 3px solid white;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    position: absolute;
    top: 0;
    left: 0;
`;

const IconContainerStyle = styled.div`
    cursor: pointer;
    position: relative;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    margin: auto;

    &:after {
        content: "";
        border-radius: inherit;
        display: block;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: none;
        transition: all 300ms linear;
    }
    &:hover:after {
        background: rgba(255,255,255, 0.5);
      }
`;

const WrapperDropdown = styled.div`
    /* Size and position */
    position: relative; 
    width: 200px;
    padding: 10px;
    margin: 0 auto;

    /* Styles */
    color: #fff;
    outline: none;
`;

const Dropdown = styled.ul`
    /* Size & position */
    position: relative;

    /* Styles */
    background: #fff;
    font-weight: normal; /* Overwrites previous font-weight: bold; */

    /* Hiding */
    opacity: 0;
    pointer-events: none;

    &:active {
        opacity: 1;
        pointer-events: auto;
    }
`;

const ItemMenu = styled.li`
    display: block;
    text-decoration: none;
    color: #9e9e9e;
    padding: 10px 20px;

    &:hover {
        background: #f3f8f8;
    }
`;

class MenuButton extends Component {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        alert("tes");
    }

    render() {
        return (
            <MenuBtnStyle>
                <WrapperDropdown >
                    {   /* renders text or account icon */
                        this.props.name === "account" ? (<IconContainerStyle onClick={this.handleClick}>
                            <AccountIcon src={profilepic} />
                        </IconContainerStyle>) : this.props.name
                    }
                    <Dropdown>
                        <ItemMenu><Link to={{ pathname: '/profile', state: { highlights: true } }}>User Page</Link></ItemMenu>
                        <ItemMenu><SignOutButton /></ItemMenu>
                    </Dropdown>
                </WrapperDropdown>
            </MenuBtnStyle>
        );
    }

}

export default MenuButton;
