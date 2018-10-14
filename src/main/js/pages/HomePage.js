import React from 'react';
import { Jumbotron, Container } from 'reactstrap';
import _ from 'lodash';
import connect from 'react-redux/es/connect/connect';
import * as Users from 'js/utils/Users';
import Background from '../../resources/images/dogs_background.jpg';
import NavigationBar from 'js/components/Navbar';

const pageStyle = {
	backgroundSize: 'cover',
	backgroundPosition: 'center',
	backgroundImage: 'url(' + Background + ')',
	overflow: 'hidden',
	height: '100%',
};
const pageContent = {
	opacity: '0.9',
};

class HomePage extends React.Component {

	render() {
		return (
			<div style={pageStyle}>
				<div className="container padded" style={pageContent}>

					<div>
						<NavigationBar/>
					</div>

					<Jumbotron fluid>
						<Container fluid>
							<h1 className="display-4">Pet Sitter Matching Service REDEFINED</h1>
							<p className="lead">Our job is to seamlessly pair you with qualified pet sitters in your area.</p>
							<p>We want to give you quick, reliable, and simple matches.</p>
						</Container>
					</Jumbotron>

					{ _.isDefined(this.props.user) &&
					<h1>Welcome, {this.props.user.principal}!</h1>

					}

				</div>
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
