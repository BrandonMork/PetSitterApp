import _ from 'lodash';
import React from 'react';
import {
	Jumbotron,
	Container,
	CardTitle,
	CardText,
	Button,
	Card,
	Row,
	Col,
} from 'reactstrap';
import * as Users from '../utils/Users';
import PropTypes from 'prop-types';
import Cookie from 'universal-cookie';
import connect from 'react-redux/es/connect/connect';
import '../../styles/pageStyles.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import FeaturedJobs from 'js/components/FeaturedJobs';
import FeaturedSitters from 'js/components/FeaturedSitters';

class HomePage extends React.Component {

	reviewJob = (e, res) => {
		e.preventDefault();

		Users.getJob(res.jobID)
			.then(function (response) {
				const myCookie = new Cookie();
				myCookie.set('currentJob', response, {path: '/'});
				window.location.href = '/#/accept-job-page';
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	handleViewProfile = (e, principal) => {
		e.preventDefault();
		const myCookie = new Cookie();
		Users.getSitterInfo(principal)
			.then(function (response) {
				myCookie.set('sitterProfile', response, {path: '/'});
				window.location.href = '/#/view-sitter-page';
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	sitterQuery = () => {
		return {
			'bool': {
				'should': [
					{
						'match': {
							'user.userType': 'Sitter'
						}
					},
					{
						'multi_match': {
							'query': 'Both',
							'fields': [
								'user.userType'
							]
						}
					}
				],
				'minimum_should_match': '1'
			}
		};
	};

	jobQuery = () => {
		return {
			'match': {
				'accepted': 'no'
			}
		};
	};

	render() {
		return (
			<div style={{marginTop: 80}}>
				<Jumbotron>
					<Container fluid>
						<h2 className='display-4'>Refurring you to the best sitters in your area!</h2>
						<h4 className='lead'>Our job is to seamlessly pair you with qualified pet sitters in your
							area. Join our massive network of just under 5 users today!</h4>
						<br/>

						{!_.isDefined(this.props.user) &&
						<div>
							<Row>
								<Col md={6} sm={6} xs={12} style={{marginBottom: 10}}>
									<Card body>
										<CardTitle>Join Now!</CardTitle>
										<CardText>Sign up for the best pet sitting service!</CardText>
										<Button onClick={() => this.context.router.history.push('/register')}>Register</Button>
									</Card>
								</Col>
								<Col md={6} sm={6} xs={12}>
									<Card body>
										<CardTitle>Already a member?</CardTitle>
										<CardText>Log in to get back to it!</CardText>
										<Button onClick={() => this.context.router.history.push('/login')}>Login</Button>
									</Card>
								</Col>
							</Row>
						</div>
						}

						{_.isDefined(this.props.user) &&
						<div>
							<Row className='center'>
								<Col md='6' sm='10'>
									<Card body>
										<CardTitle>Welcome back, {this.props.user.principal}</CardTitle>
										<CardText>
											We're glad you're back!
										</CardText>

										{(_.isEqual(this.props.user.userType, 'Owner') ||
										  _.isEqual(this.props.user.userType, 'Both')) &&
										<React.Fragment>
											<Row style={{marginBottom: 10}}>
												<Col>
													<Button onClick={() => this.context.router.history.push('/post-job')}>Post Job</Button>
												</Col>
											</Row>
											<Row style={{marginBottom: 10}}>
												<Col>
													<Button onClick={() => this.context.router.history.push('/find-sitter')}>Browse Sitters</Button>
												</Col>
											</Row>
										</React.Fragment>
										}

										{(_.isEqual(this.props.user.userType, 'Sitter') ||
										  _.isEqual(this.props.user.userType, 'Both')) &&
										<React.Fragment>
											<Row>
												<Col>
													<Button onClick={() => this.context.router.history.push('/search-job')}>Browse Jobs</Button>
												</Col>
											</Row>
										</React.Fragment>
										}

									</Card>
								</Col>
							</Row>
						</div>
						}
					</Container>
				</Jumbotron>

				<div>
					{_.isDefined(this.props.user) &&
					(_.isEqual(this.props.user.userType, 'Both') ||
						_.isEqual(this.props.user.userType, 'Owner')) &&
					<FeaturedSitters/>}
				</div>

				<div>
					{_.isDefined(this.props.user) &&
					(_.isEqual(this.props.user.userType, 'Both') ||
					 _.isEqual(this.props.user.userType, 'Sitter')) &&
					<FeaturedJobs/>}
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
