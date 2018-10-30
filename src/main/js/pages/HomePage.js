import React from 'react';
import { Jumbotron, Container } from 'reactstrap';
import connect from 'react-redux/es/connect/connect';
import * as Users from 'js/utils/Users';
import NavigationBar from 'js/components/Navbar';
import '../../styles/pageStyles.css';

class HomePage extends React.Component {
	render() {
		return (
			<div className="pageContainer">
				<div className="container padded pageContent">
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
