import React from 'react';
import connect from 'react-redux/es/connect/connect';
import * as Users from 'js/utils/Users';
import { Col, Row, Button, Form, FormGroup, Label, Input, Card, CardTitle, CardBody} from 'reactstrap';
import NavigationBar from 'js/components/Navbar';
import Background from '../../resources/images/dogs_background.jpg';
import * as ReduxForm from 'redux-form';
import PetList from 'js/components/PetList';
import {postJob} from 'js/utils/Users';

const pageStyle = {
	backgroundSize: 'cover',
	backgroundImage: 'url(' + Background + ')',
	backgroundPosition: 'center',
	backgroundAttachment: 'scroll',
	height: '100%',
};
const pageContent = {
	opacity: '0.8',
};
const center = {
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center'
};

// @Todo Mario make sure the form shows the current user info
class PostJobPage extends React.Component {

	constructor(props) {
		super(props);
		this.state = {};
		this.updatedJob = {};
	}

	handleStartDateChange(date) {
		this.setState({
			startDate: date
		});
	}

	handleEndDateChange(date) {
		this.setState({
			endDate: date
		});
	}

	handleSubmit(e) {
		e.preventDefault();
		this.setState({ updatedJob: {
			pets: e.target.pets.value,
			startDate: e.target.startDate.value,
			endDate: e.target.endDate.value,
			addressLine1: e.target.addressLine1.value,
			addressLine2: e.target.addressLine2.value,
			city: e.target.city.value,
			state: e.target.state.value,
			zip: e.target.zip.value
			}}, function() {
			console.log('Im adding a job!');
			console.log(this.state.updatedJob);
			postJob(this.state.updatedJob);
			// @TODO Brandon post job
			console.log(this.state.newJob);
		});
	}

	render() {
		return (
			<div style={pageStyle}>
				<div className='container padded'>
					<div style={pageContent}>
						<div>
							<NavigationBar/>
						</div>
						<br/>
						<div style={center}>
							<Col md='10'>
								<Card>
									<CardTitle style={center}>Welcome to the job posting page, {this.props.user.principal}!</CardTitle>
								</Card>
							</Col>
						</div>
						<div style={center}>
							<Col md='10'>
								<Card>
									<br/>
									<CardTitle style={center}>Create a job!</CardTitle>
									<CardBody>
										<Form name='form' onSubmit={this.handleSubmit.bind(this)}>
											<p>List of your pets:</p>
											<PetList/>

											<FormGroup>
												<Label for='pets'>Which pet needs sitting?</Label>
												<Input type='text' ref='pets' name='pets' id='pets' placeholder='Pet Name'/>
											</FormGroup>

											<FormGroup>
												<Label for='startDate'>Start Date</Label>
												<Input type='text' ref='startDate' name='startDate' id='startDate' placeholder='YYYY-MM-DD'/>
											</FormGroup>

											<FormGroup>
												<Label for='endDate'>End Date</Label>
												<Input type='text' ref='endDate' name='endDate' id='endDate' placeholder='YYYY-MM-DD'/>
											</FormGroup>

											<h3>Where is the job located? </h3>
											<p>Sitters will only see the approximate area. Location will be shown after you've accepted their bid.</p>
											<FormGroup>
												<Label for='addressLine1'>Address</Label>
												<Input type='text' ref='addressLine1' name='addressLine1' id='addressLine1' placeholder={this.props.user.userAddress1}/>
											</FormGroup>

											<FormGroup>
												<Label for='addressLine2'>Address 2</Label>
												<Input type='text' ref='addressLine2' name='addressLine2' id='addressLine2' placeholder={this.props.user.userAddress2}/>
											</FormGroup>

											<Row form>
												<Col md={6}>
													<FormGroup>
														<Label for='city'>City</Label>
														<Input type='text' ref='city' name='city' id='city' placeholder={this.props.user.city}/>
													</FormGroup>
												</Col>
												<Col md={4}>
													<FormGroup>
														<Label for='state'>State</Label>
														<Input type='text' ref='state' name='state' id='state' placeholder={this.props.user.state}/>
													</FormGroup>
												</Col>
												<Col md={2}>
													<FormGroup>
														<Label for='zip'>Zip</Label>
														<Input type='text' ref='zip' name='zip' id='zip' placeholder={this.props.user.zip}/>
													</FormGroup>
												</Col>
											</Row>

											<br/>
											<Button>Post Job</Button>
										</Form>
									</CardBody>
								</Card>
							</Col>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

PostJobPage = ReduxForm.reduxForm({form: 'register'})(PostJobPage);

//make sure user is logged in
PostJobPage = connect(
	state => ({
		authentication: Users.State.getAuthentication(state),
		user: Users.State.getUser(state)
	}),
	dispatch => ({
		register: user => dispatch(Users.Actions.register(user))
	})
)(PostJobPage);

export default PostJobPage;
