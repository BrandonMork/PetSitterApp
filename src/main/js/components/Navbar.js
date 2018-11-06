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
import PropTypes from 'prop-types';

library.add(faPaw);

// @TODO Completely jank. Logout doesn't redirect properly. Have to logout at homepage. Need to fix.
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
        if (myCookie.get('user') && myCookie.get('user').type === 'Owner') {
            return <React.Fragment>

                <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                        Ratings
                    </DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem tag={Link} to="/rating-page">
                            Rate Sitters
                        </DropdownItem>
                        <DropdownItem tag={Link} to="/report-page">
                            Report a Sitter
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
                <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                        Jobs
                    </DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem tag={Link} to="/post-job">
                            Post Jobs
                        </DropdownItem>
                        <DropdownItem tag={Link} to="/find-sitter">
                            Find Sitter
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
                <NavItem>
                    <NavLink tag={Link} to="/add-pet">Pets</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} to="/profile">Profile</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink onClick={NavigationBar.logout} href="#">Logout</NavLink>
                </NavItem>

            </React.Fragment>;
        } else if (myCookie.get('user') && myCookie.get('user').type === 'Sitter') {
            return <React.Fragment>

                <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                        Jobs
                    </DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem tag={Link} to="/search-job">
                            Search Jobs
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