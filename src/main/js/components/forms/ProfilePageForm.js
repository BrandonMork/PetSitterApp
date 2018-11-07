import React from 'react';
import * as ReduxForm from 'redux-form';
import connect from 'react-redux/es/connect/connect';
import * as Users from 'js/utils/Users';
import {updateUser} from 'js/utils/Users';
import {
	Form,
	Col,
	Row,
	FormGroup,
	Label,
	Input,
	Button
} from 'reactstrap';

// @TODO This is completely broken and doesn't do what we want it to
class ProfilePageForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			updatedUserProfile: {}
		};

		this.props.getUserDetails();
		setTimeout(this.forceUpdate(),1000);
	}

	// @TODO MARIO DON'T TOUCH THIS SH** BRANDON WILL FIX IT!!!!!
	handleSubmit(e) {
		e.preventDefault();
		this.setState({
				updatedUserProfile: {
					user: {
						principal: e.target.principal.value,
						firstName: e.target.firstName.value,
						middleName: e.target.middleName.value,
						lastName: e.target.lastName.value,
						addressLine1: e.target.addressLine1.value,
						addressLine2: e.target.addressLine2.value,
						city: e.target.city.value,
						state: e.target.state.value,
						zip: e.target.zip.value,
						phoneNumber: e.target.phoneNumber.value,
						pets: [],
						roles: [
							'ROLE_USER',
						],
						userType: e.target.userType.value,
						momento: e.target.principal.value,
						password: e.target.password.value,
					},
				}},
			function() {
				console.log('this is what goes to the update user');
				console.log(this.state.updatedUserProfile.user);
				//console.log(this.state.updatedUserProfile);
				updateUser(this.state.updatedUserProfile.user)
					.then( () => {
						this.props.getUserDetails();
					});
			}
		);
	}

	render () {
		console.log(this.props.user);
		return (
			<React.Fragment>
				<Form name="form" onSubmit={this.handleSubmit.bind(this)}>
					<Row form>
						<Col md={12}>
							<FormGroup>
								<Label for="principal">Email</Label>
								<Input type="text" name="principal"
									   placeholder={this.props.user.principal} defaultValue={this.props.user.principal} />
							</FormGroup>
						</Col>
					</Row>
					<Row>
						<Col md={4}>
							<FormGroup>
								<Label for="firstName">First Name</Label>
								<Input type="text" name="firstName"
									   placeholder={this.props.user.firstName}  defaultValue={this.props.user.firstName}/>
							</FormGroup>
						</Col>
						<Col md={4}>
							<FormGroup>
								<Label for="middleName">Middle Name</Label>
								<Input type="text" name="middleName"
									   placeholder={this.props.user.middleName} defaultValue={this.props.user.middleName}/>
							</FormGroup>
						</Col>
						<Col md={4}>
							<FormGroup>
								<Label for="lastName">Last Name</Label>
								<Input type="text" name="lastName"
									   placeholder={this.props.user.lastName} defaultValue={this.props.user.lastName}/>
							</FormGroup>
						</Col>
					</Row>
					<FormGroup>
						<Label for="addressLine1">Address</Label>
						<Input type="text" name="addressLine1"
							   placeholder={this.props.user.addressLine1} defaultValue={this.props.user.addressLine1}/>
					</FormGroup>

					<FormGroup>
						<Label for="addressLine2">Address Line 2</Label>
						<Input type="text" name="addressLine2"
							   placeholder={this.props.user.addressLine2} defaultValue={this.props.user.addressLine2}/>
					</FormGroup>

					<Row form>
						<Col md={6}>
							<FormGroup>
								<Label for="city">City</Label>
								<Input type="text" name="city"
									   placeholder={this.props.user.city} defaultValue={this.props.user.city}/>
							</FormGroup>
						</Col>
						<Col md={4}>
							<FormGroup>
								<Label for="state">State</Label>
								<Input type="text" name="state"
									   placeholder={this.props.user.state} defaultValue={this.props.user.state}/>
							</FormGroup>
						</Col>
						<Col md={2}>
							<FormGroup>
								<Label for="zip">Zip</Label>
								<Input type="text" name="zip"
									   placeholder={this.props.user.zip} defaultValue={this.props.user.zip}/>
							</FormGroup>
						</Col>
					</Row>
					
					<FormGroup>
						<Label for="phoneNumber">Phone Number</Label>
						<Input type="text" name="phoneNumber"
							   placeholder={this.props.user.phoneNumber} defaultValue={this.props.user.phoneNumber}/>
					</FormGroup>

					<FormGroup>
						<Label for="userType">User Type</Label>
						<Input type="text" name="userType"
							   placeholder={this.props.user.userType} defaultValue={this.props.user.userType}/>
					</FormGroup>

					<FormGroup>
						<Label for="password">Password</Label>
						<Input type="password" name="password" />
					</FormGroup>

					<br/>
					<Button>Submit Changes</Button>
				</Form>
			</React.Fragment>
		);
	}
}

ProfilePageForm = ReduxForm.reduxForm({form: 'profile'})(ProfilePageForm);

ProfilePageForm = connect(
	state => ({
		authentication: Users.State.getAuthentication(state),
		user: Users.State.getUser(state)
	}),
	dispatch => ({
		register: user => dispatch(Users.Actions.register(user)),
		getUserDetails: () => dispatch(Users.Actions.getUserDetails())
	})
)(ProfilePageForm);

export default ProfilePageForm;