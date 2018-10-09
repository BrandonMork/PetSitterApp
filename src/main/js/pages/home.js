import React from 'react';
import { Link } from 'react-router-dom';
import NavigationBar from 'js/components/navbar';
import { Jumbotron, Container } from 'reactstrap';
import _ from 'lodash';
import connect from 'react-redux/es/connect/connect';
import * as Users from 'js/users';

class HomePage extends React.Component {
	render() {
		return (
			<div className="container padded">

				<NavigationBar/>

				<Jumbotron fluid>
					<Container fluid>
						<h1 className="display-4">Pet Sitter Matching Service</h1>
						<p className="lead">Our job is to seamlessly pair you with qualified pet sitters in your area.</p>
						<p>We want to give you quick, reliable, and simple matches.</p>
					</Container>
				</Jumbotron>

				{ _.isDefined(this.props.user) &&
				<h1>Welcome, {this.props.user.principal}!</h1>
				}
			</div>
		);
	}
}

HomePage = connect(
	state => ({
		authentication: Users.State.getAuthentication(state),
		user: Users.State.getUser(state)
	})
)(HomePage);

export default HomePage;
