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
import { ReactiveBase, ResultCard } from '@appbaseio/reactivesearch';
import * as Users from '../utils/Users';
import PropTypes from 'prop-types';
import Cookie from 'universal-cookie';
import connect from 'react-redux/es/connect/connect';
import profile_pic from '../profile_pic.jpg';
import '../../styles/pageStyles.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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
					<React.Fragment>
						<div className='center'>
							<Card style={{width: '50vh', marginBottom: 15, padding: 15}}>
								<CardTitle className='center'>
									Here are some of our featured Sitters for the day!
								</CardTitle>
								<CardText>
									These sitters are being recognized for the great
									ratings and community involvement.
								</CardText>

								<Card body inverse color='info'>
									<div style={{fontWeight: 'bold'}}>
										Get a $25 coupon when hiring any of these sitters for a job!
									</div>
								</Card>
							</Card>
						</div>

						<ReactiveBase
							app='petfinder-users'
							url='https://rceiwx2ja6:k8akj8q570@yew-1307964.us-east-1.bonsaisearch.net'
						>
							<ResultCard
								componentId='results'
								dataField='Sitters'
								size={5}
								target={'_blank'}
								showResultStats
								pagination
								defaultQuery={this.sitterQuery}
								onData={(res) => {
									return {
										image: profile_pic,
										title: `${res.user.firstName} ${res.user.lastName}`,
										description: (
											<div>
												<div>Email: {res.user.principal}</div>
												<div>Location: {res.user.zip}</div>
												<div>Phone: {res.user.phoneNumber}</div>
												<Button onClick={ (e) => this.handleViewProfile(e, res.user.principal)} color = 'secondary'>
													View Profile
												</Button>
											</div>
										),
									};
								}}
							/>
						</ReactiveBase>
					</React.Fragment>}
				</div>

				<div>
					{_.isDefined(this.props.user) &&
					(_.isEqual(this.props.user.userType, 'Both') ||
					 _.isEqual(this.props.user.userType, 'Sitter')) &&
					<React.Fragment>
						<div className='center'>
							<Card style={{width: '50vh', marginBottom: 15, padding: 15}}>
								<CardTitle>
									Here are some of our featured jobs for the day!
								</CardTitle>
								<CardText>
									These jobs are close their start date and have yet to be picked up!
									We need some great people to pick them up before they expire!
								</CardText>
								<Card body inverse color='danger' className='center'>
									<div style={{fontWeight: 'bold'}}>
										ReFur will pay you an extra 25% for picking up any of these jobs!
									</div>
								</Card>
							</Card>
						</div>

						<ReactiveBase
							app='job-info'
							url='https://rceiwx2ja6:k8akj8q570@yew-1307964.us-east-1.bonsaisearch.net'
						>
							<ResultCard
								componentId='results'
								dataField='Jobs'
								size={5}
								target={'_blank'}
								pagination
								defaultQuery={this.jobQuery}
								onData={(res) => {
									return {
										image: profile_pic,
										title: `Posting by: ${res.ownerPrincipal}`,
										description: (
											<div>
												<div style={{float: 'right'}}>
													<Button size='sm' onClick={ (e) => this.reviewJob(e, res)}>
														View Job Details
													</Button>
												</div>
												<div>Start Date: {res.startDate}</div>
												<div>End Date: {res.endDate}</div>
												<div>Approximate Location: {res.zip}</div>
											</div>
										),
									};
								}}
							/>
						</ReactiveBase>
					</React.Fragment>}
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
