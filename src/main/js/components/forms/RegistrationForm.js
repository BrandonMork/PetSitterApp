import React from 'react';
import * as Bessemer from 'js/alloy/bessemer/components';
import * as Validation from 'js/alloy/utils/validation';
import * as ReduxForm from 'redux-form';
import connect from 'react-redux/es/connect/connect';
import * as Users from 'js/utils/Users';
import PropTypes from 'prop-types';

class RegistrationForm extends React.Component {

	onSubmit = user => {
		//console.log(Object.keys(user).join(', '));
		this.props.register(user);
		return this.context.router.history.push('/');
	};

	//@TODO List of roles, and map of attributes, save this form to Elasticsearch
	render() {
		let { handleSubmit } = this.props;

		return (
			<form name="form" onSubmit={handleSubmit(form => this.onSubmit(form))}>
				<Bessemer.Field name="principal" friendlyName="Email Address"
								validators={[Validation.requiredValidator, Validation.emailValidator]} />

				<Bessemer.Field name="password" friendlyName="Password"
								validators={[Validation.requiredValidator, Validation.passwordValidator]}
								field={<input className="form-control" type="password" />} />

				<Bessemer.Field name="userType" friendlyName="User Type: Owner or Sitter"
								validators={[Validation.requiredValidator]} />

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