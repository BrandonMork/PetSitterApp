import React from 'react';
import * as ReduxForm from 'redux-form';
import { connect } from 'react-redux';

import * as Validation from 'js/alloy/utils/validation';
import * as Bessemer from 'js/alloy/bessemer/components';

import * as Users from 'js/users';

class LoginForm extends React.Component {
	onSubmit = ({principal, password}) => {
		return this.props.authenticate(principal, password);
	};

	render() {
		let { handleSubmit, submitting } = this.props;

		// Use Principal to reflect our backend (Principal == UserName)
		// Accesses UserAuthenticationDto (UAD->Password + UAD->UserDao->Principal)
		// @TODO Figure out how to index on Elasticsearch
		return (
			<form name="form" onSubmit={handleSubmit(form => this.onSubmit(form))}>
				<Bessemer.Field name="principal" friendlyName="Email Address" placeholder="Example@Website.com"
				                validators={[Validation.requiredValidator, Validation.emailValidator]} />

				<Bessemer.Field name="password" friendlyName="Password" placeholde="Password"
				                validators={[Validation.requiredValidator, Validation.passwordValidator]}
								field={<input className="form-control" type="password" />} />

				<div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}} className="center">
					<Bessemer.Button loading={submitting}>Sign In</Bessemer.Button>
				</div>
			</form>
		);
	}
}

LoginForm = ReduxForm.reduxForm({form: 'login'})(LoginForm);

LoginForm = connect(
	state => ({

	}),
	dispatch => ({
		authenticate: (principal, password) => dispatch(Users.Actions.authenticate(principal, password))
	})
)(LoginForm);

export { LoginForm };

// 0 or 1 to reflect our enums in the back-end
const typeOptions = [
	{ value: '0', label: 'Owner'},
	{ value: '1', label: 'Sitter'}
];

const genderOptions = [
	{ value: 'female', label: 'Female'},
	{ value: 'male', label: 'Male'},
	{ value: 'other', label: 'Other'},
	{ value: 'decline', label: 'Prefer To Not Answer'}
];

class RegistrationForm extends React.Component {

	state = {
		selectedTypeOption: null,
		selectedGenderOption: null,
		phone: null,
	};

	handleTypeChange = (selectedTypeOption) => {
		this.setState({ selectedTypeOption });
	};

	handleGenderChange = (selectedGenderOption) => {
		this.setState({ selectedGenderOption });
	};

	onSubmit = user => {
		return this.props.register(user);
	};

	//@TODO List of roles, and map of attributes, save this form to Elasticsearch
	render() {
		let { handleSubmit, submitting } = this.props;
		const { selectedTypeOption } = this.state;
		const { selectedGenderOption } = this.state;

		return (
			<form name="form" onSubmit={handleSubmit(form => this.onSubmit(form))}>
				<Bessemer.Field name="principal" friendlyName="Email Address"
				                validators={[Validation.requiredValidator, Validation.emailValidator]} />

				<Bessemer.Field name="password" friendlyName="Password"
				                validators={[Validation.requiredValidator, Validation.passwordValidator]}
				                field={<input className="form-control" type="password" />} />

				User Type: <Bessemer.Select name="userType" friendlyName="User Type" value={selectedTypeOption}
								 onChange={this.handleTypeChange} options={typeOptions} />

				<div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}} className="center">
					<Bessemer.Button loading={submitting}>Register</Bessemer.Button>
				</div>
			</form>
		);
	}
}

RegistrationForm = ReduxForm.reduxForm({form: 'register'})(RegistrationForm);

RegistrationForm = connect(
	state => ({

	}),
	dispatch => ({
		register: user => dispatch(Users.Actions.register(user))
	})
)(RegistrationForm);

export { RegistrationForm };