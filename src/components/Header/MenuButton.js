import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import SignOutButton from '../SignOut';
import profilepic from '../img/profile.svg';

import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

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
    constructor() {
        super();

        this.state = {
            dropdownOpen: false
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    render() {
        return (
            <MenuBtnStyle>
                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                    <DropdownToggle
                        tag="span"
                        onClick={this.toggle}
                        data-toggle="dropdown"
                        aria-expanded={this.state.dropdownOpen}
                    >
                        {   /* renders text or account icon */
                            this.props.name === "account" ? (<IconContainerStyle onClick={this.handleClick}>
                                <AccountIcon src={profilepic} />
                            </IconContainerStyle>) : this.props.name
                        }
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem><Link to={{ pathname: '/profile', state: { highlights: true } }}>User Page</Link></DropdownItem>
                        <DropdownItem><SignOutButton /></DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </MenuBtnStyle>
        );
    }
}

export default MenuButton;
