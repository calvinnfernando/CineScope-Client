import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SignOutButton from '../SignOut';
import profilepic from '../img/profile.svg';
import {MenuBtnStyle, AccountIcon, IconContainerStyle} from '../../styles/components/Header/MenuButton'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';


class MenuButton extends Component {
  constructor(props) {
    super(props);

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
            <DropdownItem header>{this.props.username}</DropdownItem>
            <DropdownItem divider/>
            <DropdownItem><Link to={{ pathname: '/profile', state: { highlights: true } }}>User Page</Link></DropdownItem>
            <DropdownItem><SignOutButton /></DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </MenuBtnStyle>
    );
  }
}

export default MenuButton;
