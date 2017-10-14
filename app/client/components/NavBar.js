/**
 *
 *  Component for the navbar, which is always visible for any logged in user
 *
**/


import React from 'react';
import { browserHistory } from 'react-router';
import { Glyphicon, Nav, Navbar, NavItem } from 'react-bootstrap';


const NavBar = props => {
	
	let selectLink = (path, e) => {
		e.preventDefault();
		browserHistory.push(path);
	};

	let logout = e => {
		e.preventDefault();

		props.logout();
		props.clearExpenses();
		props.clearProjects();

		browserHistory.push('/');
	};

	
	return (
		<div>
			<Navbar bsStyle='inverse'>
				<Nav>
					<NavItem onClick={ selectLink.bind(this, '/') } style={ { 'fontSize': '20px', 'fontWeight': 'bold', 'color': 'white' } }>
						Dashboard
					</NavItem>
					
					<NavItem onClick={ selectLink.bind(this, '/projects') } style={ { 'fontSize': '15px', 'color': 'white' } }>
						Projects
					</NavItem>
				</Nav>

				<Nav pullRight>
					<NavItem onClick={ selectLink.bind(this, '/settings') } style={ { 'fontSize': '15px', 'color': 'white' } }>
						<Glyphicon glyph='cog'/>
					</NavItem>
					
					<NavItem onClick={ logout } style={ { 'fontSize': '15px', 'color': 'white' } }>
						Logout
					</NavItem>
				</Nav>
			</Navbar>
		</div>
	);
};


export default NavBar;

