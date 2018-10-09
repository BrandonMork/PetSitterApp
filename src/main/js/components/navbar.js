import React from 'react';
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink} from 'reactstrap';
import Link from 'react-router-dom/es/Link';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPaw } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Cookie from 'universal-cookie';

library.add(faPaw);

export default class NavigationBar extends React.Component {

	constructor(props) {
		super(props);

		this.toggle = this.toggle.bind(this);
		this.state = {
			isOpen: false
		};
	}

	toggle() {
		this.setState({
			isOpen: !this.state.isOpen
		});
	}

	static logout() {
		const myCookie = new Cookie();
		myCookie.remove('authentication', {path: '/'});
		myCookie.remove('user', {path: '/'});
		window.location.reload();
	}

	static checkUserStatus() {
		const myCookie = new Cookie();

		if (myCookie.get('user')) {
			return <div>
				<NavItem>
					<NavLink onClick={NavigationBar.logout} href="#">Logout</NavLink>
				</NavItem>
			</div>;
		} else {
			return 	<div>
				<NavItem>
					<NavLink tag={Link} to="/login">Login</NavLink>
				</NavItem>

				<NavItem>
					<NavLink tag={Link} to="/register">Register</NavLink>
				</NavItem>
			</div>;
		}
	}

	render() {
		return (
			<div>
				<Navbar color="light" light expand="md">
					<NavbarBrand href="/"> <FontAwesomeIcon icon="paw"/> Tempetūrs</NavbarBrand>
					<NavbarToggler onClick={this.toggle} />
					<Collapse isOpen={this.state.isOpen} navbar>
						<Nav className="ml-auto" navbar>

							{NavigationBar.checkUserStatus()}

						</Nav>
					</Collapse>
				</Navbar>
			</div>
		);
	}
}