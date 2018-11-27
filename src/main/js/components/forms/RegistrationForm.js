import React from 'react';
import * as Bessemer from 'js/alloy/bessemer/components';
import * as Validation from 'js/alloy/utils/validation';
import * as ReduxForm from 'redux-form';
import connect from 'react-redux/es/connect/connect';
import * as Users from 'js/utils/Users';
import PropTypes from 'prop-types';

const typeOptions = [
	{value: 'Owner', label: 'Owner'},
	{value: 'Sitter', label: 'Sitter'},
	{value: 'Both', label: 'Both'}
];

class RegistrationForm extends React.Component {

	constructor(props) {
		super(props);

		this.state = {value: null, label: null};
		this.onSubmit = this.onSubmit.bind(this);
	}

	// @TODO Figure out why the type key isn't being included into our user
	onSubmit = user => {
		console.log(Object.keys(user).join(', '));
		console.log('IN onSubmit() VIA REGISTRATION FORM:');
		console.log(user);
		this.props.register(user);
		return this.context.router.history.push('/');
	};

	//@TODO List of roles, and map of attributes, save this form to Elasticsearch
	//@TODO TURN ALL USER INPUT TO LOWER CASE!!!!
	render() {
		let { handleSubmit } = this.props;

		return (
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
		);
	}
}

RegistrationForm.contextTypes = {
	router: PropTypes.object.isRequired,
};

RegistrationForm = ReduxForm.reduxForm({form: 'register'})(RegistrationForm);

RegistrationForm = connect(
	state => ({

	}),
	dispatch => ({
		register: user => dispatch(Users.Actions.register(user))
	})
)(RegistrationForm);

export default RegistrationForm;

/*

 */