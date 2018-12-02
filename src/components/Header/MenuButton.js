import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

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
            </MenuBtnStyle>
        );
      }

}

export default MenuButton;
