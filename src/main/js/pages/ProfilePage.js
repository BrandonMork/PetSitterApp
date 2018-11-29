import React from 'react';
import {
	Col,
	Card,
	CardTitle,
	CardBody,
	Row,
	Container,
	Form,
	FormGroup,
	Label,
	Input,
	Button
} from 'reactstrap';
import { updateUser } from '../utils/Users';
import * as Users from '../utils/Users';
import connect from 'react-redux/es/connect/connect';
import '../../styles/pageStyles.css';

import * as ReduxForm from 'redux-form';
import notification from 'js/notification';

class ProfilePage extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			updatedUserProfile: {},
			value: null,
			label: null
		};

		this.add = this.add.bind(this);
	}

	handleSubmit(e) {
		e.preventDefault();

		console.log(e.target.userType.value);
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
				updateUser(this.state.updatedUserProfile.user)
					.then( () => {
						this.props.getUserDetails();
					});
			});
		this.add('bottom-center');
	}

	add(container) {
		const { addNotification } = this.props;

		return addNotification(Object.assign({}, notification, {
			title: 'Success!',
			message: 'You have updated your profile!',
			container,
			type: 'success'
		}));
	}

	render() {
		return (
			<Container style={{marginTop: 80, marginBottom: 20}}>
				<Row>
					<Col lg={12} md={12} sm={12} xs={12}>
						<Card>
							<br/>
							<CardTitle className="center">Welcome to your profile!</CardTitle>
							<CardBody>
								<p>Submit any changes below.</p>

								<Form name="form" onSubmit={this.handleSubmit.bind(this)}>
									<Row form>
										<Col>
											<FormGroup>
												<Label for="userType">User Type</Label>
												<Input type="select" name="userType">
													<option value="Sitter">Sitter</option>
													<option value="Owner">Owner</option>
													<option value="Both">Both</option>
												</Input>
											</FormGroup>
										</Col>
									</Row>

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
										<Label for="password">Password</Label>
										<Input type="password" name="password" />
									</FormGroup>

									<br/>
									<Button>Submit Changes</Button>
								</Form>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
		);
	}
}

ProfilePage = ReduxForm.reduxForm({form: 'profile'})(ProfilePage);

ProfilePage = connect(
	state => ({
		authentication: Users.State.getAuthentication(state),
		user: Users.State.getUser(state)
	}),
	dispatch => ({
		register: user => dispatch(Users.Actions.register(user)),
		getUserDetails: () => dispatch(Users.Actions.getUserDetails())
	})
)(ProfilePage);

export default ProfilePage;
