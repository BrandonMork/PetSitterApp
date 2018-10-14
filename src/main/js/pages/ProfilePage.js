import React from 'react';
import connect from 'react-redux/es/connect/connect';
import * as Users from 'js/utils/Users';
import AvailabilityForm from 'js/components/AvailabilityForm';
import { Col, Row, Button, Form, FormGroup, Label, Input, Card, CardTitle, CardBody, CardText} from 'reactstrap';
import NavigationBar from 'js/components/Navbar';
import Background from '../../resources/images/dogs_background.jpg';
import {register} from 'js/utils/Users';
import * as ReduxForm from 'redux-form';
import {updateUser} from 'js/utils/Users';

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

class ProfilePage extends React.Component {

	constructor() {
		super();
		this.state = {
			updatedUserProfile: {}
		};
	}

	handleSubmit(e) {
		e.preventDefault();
		this.setState({ updatedUserProfile: {
				principal: e.target.principal.value,
				firstName: e.target.firstName.value,
				middleName: e.target.middleName.value,
				lastName: e.target.lastName.value,
			}}, function() {
			console.log(this.state.updatedUserProfile);
			updateUser(this.state.updatedUserProfile);
		});
	}

	render() {
		return (
			<div style={pageStyle}>
				<div className="container padded">
					<div style={pageContent}>
						<div>
							<NavigationBar/>
						</div>
						<br/>
						<div style={center}>
							<Col md="10">
								<Card>
									<CardTitle style={center}>Welcome to your profile {this.props.user.principal}!</CardTitle>
									<div>
										Add possible availabilities
										<AvailabilityForm />
									</div>
								</Card>
							</Col>
						</div>
						<div style={center}>
							<Col md="10">
								<Card>
									<br/>
									<CardTitle style={center}>Submit any changes below.</CardTitle>
									<CardBody>
										<Form name="form" onSubmit={this.handleSubmit.bind(this)}>
											<Row form>
												<Col md={12}>
													<FormGroup>
														<Label for="principal">Email</Label>
														<Input type="principal" ref="principal" name="principal" id="principal" placeholder={this.props.user.principal} />
													</FormGroup>
												</Col>
											</Row>
											<Row>
												<Col md={4}>
													<FormGroup>
														<Label for="firstName">First Name</Label>
														<Input type="text" ref="firstName" name="firstName" id="firstName" placeholder={this.props.user.firstName}  />
													</FormGroup>
												</Col>
												<Col md={4}>
													<FormGroup>
														<Label for="middleName">Middle Name</Label>
														<Input type="text" ref="firstName" name="middleName" id="middleName" placeholder={this.props.user.middleName}/>
													</FormGroup>
												</Col>
												<Col md={4}>
													<FormGroup>
														<Label for="lastName">Last Name</Label>
														<Input type="text" ref="lastName" name="lastName" id="lastName" placeholder={this.props.user.lastName}  />
													</FormGroup>
												</Col>
											</Row>

											<FormGroup>
												<Label for="addressLine1">Address</Label>
												<Input type="text" ref="addressLine1" name="addressLine1" id="addressLine1" placeholder={this.props.user.userAddress1}/>
											</FormGroup>

											<FormGroup>
												<Label for="addressLine2">Address 2</Label>
												<Input type="text" ref="addressLine2" name="addressLine2" id="addressLine2" placeholder={this.props.user.userAddress2}/>
											</FormGroup>

											<Row form>
												<Col md={6}>
													<FormGroup>
														<Label for="city">City</Label>
														<Input type="text" ref="city" name="city" id="city" placeholder={this.props.user.city}/>
													</FormGroup>
												</Col>
												<Col md={4}>
													<FormGroup>
														<Label for="state">State</Label>
														<Input type="text" ref="state" name="state" id="state" placeholder={this.props.user.state}/>
													</FormGroup>
												</Col>
												<Col md={2}>
													<FormGroup>
														<Label for="zip">Zip</Label>
														<Input type="text" ref="zip" name="zip" id="zip" placeholder={this.props.user.zip}/>
													</FormGroup>
												</Col>
											</Row>

											<FormGroup>
												<Label for="phoneNumber">Phone Number</Label>
												<Input type="text" ref="phoneNumber" name="phoneNumber" id="phoneNumber" placeholder={this.props.user.phoneNumber}/>
											</FormGroup>

											<FormGroup>
												<Label for="type">User Type</Label>
												<Input type="text" ref="type" name="type" id="type" placeholder={this.props.user.type}/>
											</FormGroup>

											<br/>
											<Button>Submit Changes</Button>
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

ProfilePage = ReduxForm.reduxForm({form: 'register'})(ProfilePage);

//make sure user is logged in
ProfilePage = connect(
	state => ({
		authentication: Users.State.getAuthentication(state),
		user: Users.State.getUser(state)
	}),
	dispatch => ({
		register: user => dispatch(Users.Actions.register(user))
	})
)(ProfilePage);

export default ProfilePage;
