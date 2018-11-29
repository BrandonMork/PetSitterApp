import React from 'react';
import {
	Card,
	CardBody,
	CardTitle,
	Col
} from 'reactstrap';
import * as Validation from 'js/alloy/utils/validation';
import * as ReduxForm from 'redux-form';
import * as Bessemer from 'js/alloy/bessemer/components';
import * as Users from 'js/utils/Users';
import PropTypes from 'prop-types';
import notification from 'js/notification';
import connect from 'react-redux/es/connect/connect';
import '../../styles/pageStyles.css';

const typeOptions = [
	{value: 'Owner', label: 'Owner'},
	{value: 'Sitter', label: 'Sitter'},
	{value: 'Both', label: 'Both'}
];

// @TODO Add some sort of validation for if principal is already taken
class RegisterPage extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			value: null,
			label: null
		};

		this.onSubmit = this.onSubmit.bind(this);
		this.add = this.add.bind(this);
	}

	onSubmit = user => {
		this.props.register(user);
		this.add('bottom-center');
		return window.location.href = '/#/';
	};

	add(container) {
		const { addNotification } = this.props;

		return addNotification(Object.assign({}, notification, {
			title: 'Success!',
			message: 'You are now a registered user!',
			container,
			type: 'success'
		}));
	}

	render() {
		let { handleSubmit } = this.props;

		return (
			<div style={{marginTop: 100}} className="center">
				<Col md="10" sm="12">
					<Card>
						<br/>
						<CardTitle className="center">Register</CardTitle>
						<CardBody>
							<form name="form" onSubmit={handleSubmit(form => this.onSubmit(form))}>

								<Bessemer.Field name="userType" friendlyName="User Type" placeholder="User Type"
												validator={[Validation.requiredValidator]}
												field={<Bessemer.Select options={typeOptions} />} />

								<Bessemer.Field name="principal" friendlyName="Email Address" placeholder="test@web.com"
												validators={[Validation.requiredValidator, Validation.emailValidator]} />

								<Bessemer.Field name="firstName" friendlyName="First Name" placeholder="John"
												validators={[Validation.requiredValidator]} />

								<Bessemer.Field name="middleName" friendlyName="Middle Name" placeholder="Example" />

								<Bessemer.Field name="lastName" friendlyName="Last Name" placeholder="Lutteringer"
												validators={[Validation.requiredValidator]} />

								<Bessemer.Field name="addressLine1" friendlyName="Address Line 1" placeholder="123 Main St"
												validators={[Validation.requiredValidator]} />

								<Bessemer.Field name="addressLine2" friendlyName="Address Line 2" placeholder="Apt 100" />

								<Bessemer.Field name="city" friendlyName="City" placeholder="Dallas"
												validators={[Validation.requiredValidator]} />

								<Bessemer.Field name="state" friendlyName="State" placeholder="TX"
												validators={[Validation.requiredValidator]} />

								<Bessemer.Field name="zip" friendlyName="Zip Code"
												validators={[Validation.requiredValidator]}
												field={<input className="form-control" type="number" />} />

								<Bessemer.Field name="phoneNumber" friendlyName="Phone Number"
												validators={[Validation.requiredValidator]}
												field={<input className="form-control" type="number" />}/>

								<Bessemer.Field name="password" friendlyName="Password"
												validators={[Validation.requiredValidator, Validation.passwordValidator]}
												field={<input className="form-control" type="password" />} />

								<div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}} className="center">
									<Bessemer.Button>Register</Bessemer.Button>
								</div>
							</form>
						</CardBody>
					</Card>
				</Col>
			</div>
		);
	}
}

RegisterPage.contextTypes = {
	router: PropTypes.object.isRequired,
};

RegisterPage = ReduxForm.reduxForm({form: 'register'})(RegisterPage);

RegisterPage = connect(
	state => ({

	}),
	dispatch => ({
		register: user => dispatch(Users.Actions.register(user))
	})
)(RegisterPage);

export default RegisterPage;