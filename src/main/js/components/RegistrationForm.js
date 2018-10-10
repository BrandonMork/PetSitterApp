import React from 'react';
import * as Bessemer from 'js/alloy/bessemer/components';
import * as Validation from 'js/alloy/utils/validation';
import * as ReduxForm from 'redux-form';
import connect from 'react-redux/es/connect/connect';
import * as Users from 'js/utils/Users';
import PropTypes from 'prop-types';

// 0 or 1 to reflect our enums in the back-end
const typeOptions = [
	{ value: '0', label: 'Owner'},
	{ value: '1', label: 'Sitter'}
];

class RegistrationForm extends React.Component {

	state = {
		selectedTypeOption: null,
	};

	handleTypeChange = (selectedTypeOption) => {
		this.setState({ selectedTypeOption });
	};

	onSubmit = user => {
		this.context.router.history.push('/');
		return this.props.register(user);
	};

	//@TODO List of roles, and map of attributes, save this form to Elasticsearch
	render() {
		let { handleSubmit, submitting } = this.props;
		const { selectedTypeOption } = this.state;

		return (
			<form name="form" onSubmit={handleSubmit(form => this.onSubmit(form))}>
				<Bessemer.Field name="principal" friendlyName="Email Address"
								validators={[Validation.requiredValidator, Validation.emailValidator]} />

				<Bessemer.Field name="password" friendlyName="Password"
								validators={[Validation.requiredValidator, Validation.passwordValidator]}
								field={<input className="form-control" type="password" />} />

				<Bessemer.Field name="confirm-password" friendlyName="Confirm Password"
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