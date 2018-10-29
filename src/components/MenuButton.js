import React, { Component } from 'react';

class MenuButton extends Component {

    render() {
        return (
            <span className="menubutton">
                {/* Creates a link with provided name and link */}
                <a href={this.props.link} >
                    {this.props.name}
                </a>

                {/* Dropdown implemented in simple HTML and CSS */}
                <div className="dropdown-content">
                    <a href=""> Menu item 1 </a>
                    <a href=""> Menu item 2 </a>
                    <a href=""> Menu item 3 </a>
                </div>
            </span>
        );
      }

}

export default MenuButton;