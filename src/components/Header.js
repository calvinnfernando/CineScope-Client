import React, { Component } from 'react';
import MenuButton from './MenuButton.js';

class Header extends Component {

	render(){
        // This code borrowed from Codecademy. Maps links to their pages
        const pages = ['Home', 'Movies', 'New Releases', 'Comparitron'];
        const navLinks = pages.map(page => {
            return <MenuButton name={page} link={'/'+page} />
        });

		return (
            // uses Bootstrap classes
			<header class="container-fluid">
                <div class = "row">
                    <h1 class="col-sm-4">
                        <a href=""><img src="" alt="Cinescope Logo" /></a>
                    </h1>
                    <nav class="col-sm-8" id="menu">
                        {navLinks}
                    </nav>
                </div>
            </header>
		);
	}
}

export default Header;