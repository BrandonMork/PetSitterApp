import React from 'react';
import _, {isEqual} from 'lodash';
import {Jumbotron, Container, Row, Col, Card, CardTitle, CardText, Button} from 'reactstrap';
import connect from 'react-redux/es/connect/connect';
import * as Users from 'js/utils/Users';
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
			<div style={{marginTop: 120}}>
				<Jumbotron>
					<Container fluid>
						<h2 className="display-4">Refurring you to the best sitters in your area!</h2>
						<h4 className="lead">Our job is to seamlessly pair you with qualified pet sitters in your
							area. Join our network of just under 5 users today!</h4>

						<br/>

						{!_.isDefined(this.props.authentication) &&
						!_.isDefined(this.props.user) &&
						<div>
							<Row>
								<Col md={6} sm={6} xs={12} style={{marginBottom: 10}}>
									<Card body>
										<CardTitle>Join Now!</CardTitle>
										<CardText>Sign up for the best pet sitting service!</CardText>
										<Button onClick={this.register}>Register</Button>
									</Card>
								</Col>
								<Col md={6} sm={6} xs={12}>
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
								<Col md="6" sm="10">
									<Card body>
										<CardTitle>Welcome back, {this.props.user.principal}</CardTitle>
										<CardText>
											We're glad you're back!
										</CardText>

										{(isEqual(this.props.user.userType, 'Owner') ||
											isEqual(this.props.user.userType, 'Both')) &&
										<Container>
											<Row style={{marginBottom: 10}}>
												<Col>
													<Button>Post Job</Button>
												</Col>
											</Row>
											<Row style={{marginBottom: 10}}>
												<Col>
													<Button>Browse Sitters</Button>
												</Col>
											</Row>
										</Container>
										}

										{(isEqual(this.props.user.userType, 'Sitter') ||
											isEqual(this.props.user.userType, 'Both')) &&
										<Container>
											<Row>
												<Col>
													<Button>Browse Job</Button>
												</Col>
											</Row>
										</Container>
										}

									</Card>
								</Col>
							</Row>
						</div>
						}
					</Container>
				</Jumbotron>
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
