import React from 'react';
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownItem,
	DropdownMenu,
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
			return <React.Fragment>

				<NavItem>
					<NavLink tag={Link} to="/find-sitter">Find Sitter</NavLink>
				</NavItem>
				<NavItem>
					<NavLink tag={Link} to="/post-job">Post Job</NavLink>
				</NavItem>
				<UncontrolledDropdown nav inNavbar>
					<DropdownToggle nav caret>
						Pets
					</DropdownToggle>
					<DropdownMenu right>
						<DropdownItem tag={Link} to="/add-pet">
							View Pets
						</DropdownItem>
						<DropdownItem tag={Link} to="/add-pet">
							Add Pets
						</DropdownItem>
						<DropdownItem tag={Link} to="/add-pet">
							Edit Pets
						</DropdownItem>
					</DropdownMenu>
				</UncontrolledDropdown>
				<NavItem>
					<NavLink tag={Link} to="/profile">Profile</NavLink>
				</NavItem>
				<NavItem>
					<NavLink onClick={NavigationBar.logout} href="#">Logout</NavLink>
				</NavItem>

			</React.Fragment>;
		} else {
			return 	<React.Fragment>
				<NavItem>
					<NavLink tag={Link} to="/login">Login</NavLink>
				</NavItem>
				<NavItem>
					<NavLink tag={Link} to="/register">Register</NavLink>
				</NavItem>
			</React.Fragment>;
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