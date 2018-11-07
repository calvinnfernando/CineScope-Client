import React, { Component } from 'react';
import styled from 'styled-components';

import profilepic from '../img/profpic-sponge.webp';

const DropdownContent = styled.div`
    display: none;
    position: absolute;
    background-color: rgb(194, 194, 194);
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    padding: 12px 16px;
    z-index: 1;
`;

const MenuBtnStyle = styled.div`
    position: relative;
    margin: 0px 20px;

    &:hover ${DropdownContent} {
        display: block;
    }

    a {
        display: block;
        text-align: left;
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
        if (this.props.name == "account") {

        }
        return (
            <MenuBtnStyle>
                {/* Creates a link with provided name and link */}
                <a href={this.props.link} >
                    {/* renders text or account icon */
                    this.props.name == "account" ? (<IconContainerStyle>
                        <AccountIcon src={profilepic}/>
                    </IconContainerStyle>) : this.props.name
                    }
                </a>

                {/* Dropdown implemented in simple HTML and CSS */}
                <DropdownContent>
                    <a href="#"> Menu item 1 </a>
                    <a href="#"> Menu item 2 </a>
                    <a href="#"> Menu item 3 </a>
                </DropdownContent>
            </MenuBtnStyle>
        );
      }

}

export default MenuButton;