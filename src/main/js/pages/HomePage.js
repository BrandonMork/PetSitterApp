import React from 'react';
import { Jumbotron, Container } from 'reactstrap';
import _ from 'lodash';
import connect from 'react-redux/es/connect/connect';
import * as Users from 'js/utils/Users';
import NavigationBar from 'js/components/Navbar';
import Background from 'js/dogs_background.jpg';

const pageStyle = {
	backgroundSize: 'cover',
	backgroundImage: 'url(' + Background + ')',
	backgroundPosition: 'center',
	height: '100%',
};
const pageContent = {
	opacity: '0.8',
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
							<h1 className="display-4">The Best Pet Sitter Matching Service</h1>
							<h4 className="lead">Our job is to seamlessly pair you with qualified pet sitters in your
								area. Join our network of just under 5 users today!</h4>
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
