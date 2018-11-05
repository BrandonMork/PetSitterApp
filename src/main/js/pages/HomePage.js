import React from 'react';
import _ from 'lodash';
import {Jumbotron, Container, Row, Col, Card, CardTitle, CardText, Button} from 'reactstrap';
import connect from 'react-redux/es/connect/connect';
import * as Users from 'js/utils/Users';
import NavigationBar from 'js/components/Navbar';
import '../../styles/pageStyles.css';
import PropTypes from 'prop-types';

class HomePage extends React.Component {

	login = () => {
		return this.context.router.history.push('/login');
	};

	register = () => {
		return this.context.router.history.push('/register');
	};

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

					{!_.isDefined(this.props.authentication) &&
					!_.isDefined(this.props.user) &&
					<div>
						<Row>
							<Col sm="6">
								<Card body>
									<CardTitle>Join Now!</CardTitle>
									<CardText>Sign up for the best pet sitting service!</CardText>
									<Button onClick={this.register}>Register</Button>
								</Card>
							</Col>
							<Col sm="6">
								<Card body>
									<CardTitle>Already a member?</CardTitle>
									<CardText>Log in to get back to it!</CardText>
									<Button onClick={this.login}>Login</Button>

								</Card>
							</Col>
						</Row>
					</div>
					}

					{_.isDefined(this.props.authentication) &&
					_.isDefined(this.props.user) &&
					<div>
						<Row className="center">
							<Col sm="6">
								<Card body>
									<CardTitle>Welcome back, {this.props.user.principal}</CardTitle>
									<CardText>We're glad you're back!</CardText>
								</Card>
							</Col>
						</Row>
					</div>
					}
				</div>
			</div>
		);
	}
}

HomePage.contextTypes = {
	router: PropTypes.object.isRequired,
};

HomePage = connect(
	state => ({
		authentication: Users.State.getAuthentication(state),
		user: Users.State.getUser(state)
	})
)(HomePage);

export default HomePage;
