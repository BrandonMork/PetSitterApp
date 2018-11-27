import _ from 'lodash';
import React from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, UncontrolledDropdown, DropdownToggle, DropdownItem, DropdownMenu, NavLink } from 'reactstrap';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPaw } from '@fortawesome/free-solid-svg-icons';
import { Helmet } from 'react-helmet';
import Cookie from 'universal-cookie';
import logo from '../logo.png';
import Favicon from 'react-favicon';
import connect from 'react-redux/es/connect/connect';
import notificationBell from '../notificationUnread.png';
import * as Users from 'js/utils/Users';
import '../../styles/pageStyles.css';

library.add(faPaw);

// @TODO Set isOpen state to false when link is clicked (user is redirected) Maybe? Consider it.
class NavigationBar extends React.Component {

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

	reloadComponent = () => {
		this.setState(this.state);
	};

	static logout() {
		const myCookie = new Cookie();
		myCookie.remove('authentication', {path: '/'});
		myCookie.remove('user', {path: '/'});
		window.location.reload();
	}

	static checkUserStatus() {
		const myCookie = new Cookie();
		if (myCookie.get('user') && myCookie.get('user').userType === 'Owner') {
			return <React.Fragment>
				<UncontrolledDropdown nav inNavbar>
					<DropdownToggle nav caret>
						Ratings
					</DropdownToggle>
					<DropdownMenu right>
						<DropdownItem href="#/rating-page">
							Rate Sitters
						</DropdownItem>
						<DropdownItem href="#/report-page">
							Report a Sitter
						</DropdownItem>
					</DropdownMenu>
				</UncontrolledDropdown>
				<UncontrolledDropdown nav inNavbar>
					<DropdownToggle nav caret>
						Jobs
					</DropdownToggle>
					<DropdownMenu right>
						<DropdownItem href="#/post-job">
							Post Jobs
						</DropdownItem>
						<DropdownItem href="#/find-sitter">
							Find Sitter
						</DropdownItem>
					</DropdownMenu>
				</UncontrolledDropdown>
				<NavItem>
					<NavLink href="#/add-pet">Pets</NavLink>
				</NavItem>
				<NavItem>
					<NavLink href="#/profile">Profile</NavLink>
				</NavItem>
				<NavItem>
					<NavLink onClick={NavigationBar.logout} href="#">Logout</NavLink>
				</NavItem>

			</React.Fragment>;
		} else if (myCookie.get('user') && myCookie.get('user').userType === 'Sitter') {
			return <React.Fragment>

				<UncontrolledDropdown nav inNavbar>
					<DropdownToggle nav caret>
						Jobs
					</DropdownToggle>
					<DropdownMenu right>
						<DropdownItem href="#/search-job">
							Search Jobs
						</DropdownItem>
					</DropdownMenu>
				</UncontrolledDropdown>
				<NavItem>
					<NavLink href="#/profile">Profile</NavLink>
				</NavItem>
				<NavItem>
					<NavLink onClick={NavigationBar.logout} href="#">Logout</NavLink>
				</NavItem>

			</React.Fragment>;

		} else if (myCookie.get('user') && myCookie.get('user').userType === 'Both') {
			return <React.Fragment>

				<UncontrolledDropdown nav inNavbar>
					<DropdownToggle nav caret>
						Ratings
					</DropdownToggle>
					<DropdownMenu right>
						<DropdownItem href="#/rating-page">
							Rate Sitters
						</DropdownItem>
						<DropdownItem href="#/report-page">
							Report a Sitter
						</DropdownItem>
					</DropdownMenu>
				</UncontrolledDropdown>
				<UncontrolledDropdown nav inNavbar>
					<DropdownToggle nav caret>
						Jobs
					</DropdownToggle>
					<DropdownMenu right>
						<DropdownItem href="#/post-job">
							Post Jobs
						</DropdownItem>
						<DropdownItem href="#/find-sitter">
							Find Sitter
						</DropdownItem>
						<DropdownItem href="#/search-job">
							Search Jobs
						</DropdownItem>
					</DropdownMenu>
				</UncontrolledDropdown>

				<UncontrolledDropdown nav inNavbar>
					<DropdownToggle nav caret>
						User
					</DropdownToggle>
					<DropdownMenu right>
						<DropdownItem href="#/profile">
							My Profile
						</DropdownItem>
						<DropdownItem href="#/add-pet">
							My Pets
						</DropdownItem>
					</DropdownMenu>
				</UncontrolledDropdown>

				<NavItem>
					<NavLink onClick={NavigationBar.logout} href="#">Logout</NavLink>
				</NavItem>

			</React.Fragment>;
		}
		else {
			return 	<React.Fragment>
				<NavItem>
					<NavLink href="#/login">Login</NavLink>
				</NavItem>
				<NavItem>
					<NavLink href="#/register">Register</NavLink>
				</NavItem>
			</React.Fragment>;
		}
	}

	render() {
		return (
			<Navbar fixed="top" color="dark" dark expand="md" style={{listStyleType: 'none'}}>
				<Favicon url="https://imgur.com/AzPIQVM.png" />
				<Helmet>
					<title>ReFur</title>
				</Helmet>

				<NavbarBrand href="/">
					<img src={logo} />&nbsp;
					ReFur
				</NavbarBrand>

				<NavbarToggler onClick={this.toggle} />
				<Collapse isOpen={this.state.isOpen} navbar>
					<Nav className="ml-auto" navbar>
						{NavigationBar.checkUserStatus()}
					</Nav>
				</Collapse>

				{_.isDefined(this.props.user) &&
				<React.Fragment>
					<UncontrolledDropdown nav inNavbar>
						<DropdownToggle nav>
							<img src={notificationBell}/>
						</DropdownToggle>

						{/* @TODO BRANDON Do your notification stuff here */}
						<DropdownMenu>
							<DropdownItem href="">
								{this.props.user.principal}
							</DropdownItem>
							<DropdownItem href="">
								Notification 2
							</DropdownItem>
							<DropdownItem href="">
								Notification 3
							</DropdownItem>
							<DropdownItem href="">
								Notification 4
							</DropdownItem>
							<DropdownItem href="">
								Notification 5
							</DropdownItem>
						</DropdownMenu>
					</UncontrolledDropdown>
				</React.Fragment>
				}
			</Navbar>
		);
	}
}

NavigationBar = connect(
	state => ({
		authentication: Users.State.getAuthentication(state),
		user: Users.State.getUser(state)
	})
)(NavigationBar);

export default NavigationBar;