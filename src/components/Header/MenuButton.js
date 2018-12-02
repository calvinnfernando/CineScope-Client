import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import profilepic from '../img/profpic-sponge.webp';

const DropdownContent = styled.div`
    display: none;
    position: absolute;
    background-color: #FFF;
    min-width: 160px;
    box-shadow: 2px 4px 8px 0px rgba(0,0,0,0.3);
    padding: 12px 16px;
    z-index: 1;
`;

const MenuBtnStyle = styled.div`
    position: relative;
    margin: 0px 20px;
    font-size: 20px;

    &:hover ${DropdownContent} {
        display: block;
    }

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

class MenuButton extends Component {

    render() {
        return (
            <MenuBtnStyle>
                {/* Creates a link with provided name and link */}
                <Link to={{ pathname: '/profile', state: { highlights: true } }}>
                    {/* renders text or account icon */
                    this.props.name === "account" ? (<IconContainerStyle>
                        <AccountIcon src={profilepic}/>
                    </IconContainerStyle>) : this.props.name
                    }
                </Link>

                {/* Dropdown implemented in simple HTML and CSS */}
                <DropdownContent>
                    <Link to={{ pathname: '/profile', state: { highlights: true } }}>Highlights</Link>
                    <Link to={{ pathname: '/profile', state: { highlights: false } }}>Watchlists</Link>
                    {/* <a href="#"> Menu item 3 </a> */}
                </DropdownContent>
            </MenuBtnStyle>
        );
      }

}

export default MenuButton;