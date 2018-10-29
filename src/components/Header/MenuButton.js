import React, { Component } from 'react';
import styled from 'styled-components';

const DropdownContent = styled.div`
    display: none;
    position: absolute;
    background-color: rgb(194, 194, 194);
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    padding: 12px 16px;
    z-index: 1;
`;

const MenuBtnStyle = styled.span`
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

class MenuButton extends Component {

    render() {
        return (
            <MenuBtnStyle>
                {/* Creates a link with provided name and link */}
                <a href={this.props.link} >
                    {this.props.name}
                </a>

                {/* Dropdown implemented in simple HTML and CSS */}
                <DropdownContent>
                    <a href=""> Menu item 1 </a>
                    <a href=""> Menu item 2 </a>
                    <a href=""> Menu item 3 </a>
                </DropdownContent>
            </MenuBtnStyle>
        );
      }

}

export default MenuButton;