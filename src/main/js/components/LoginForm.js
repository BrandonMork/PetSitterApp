import React from 'react';
import * as Bessemer from 'js/alloy/bessemer/components';
import * as Validation from 'js/alloy/utils/validation';
import * as ReduxForm from 'redux-form';
import connect from 'react-redux/es/connect/connect';
import * as Users from 'js/utils/Users';
import PropTypes from 'prop-types';

class LoginForm extends React.Component {

	onSubmit = ({principal, password}) => {
		this.context.router.history.push('/');
		// This is where we would make our axios calls to the data store
		return this.props.authenticate(principal, password);
	};

	render() {
		let { handleSubmit, submitting } = this.props;

		// Use Principal to reflect our backend (Principal == UserName)
		// Accesses UserAuthenticationDto (UAD->Password + UAD->UserDao->Principal)
		// @TODO Figure out how to index on Elasticsearch
		return (
			<form name='form' onSubmit={handleSubmit(form => this.onSubmit(form))}>
				<Bessemer.Field name='principal' friendlyName='Email Address' placeholder='Example@Website.com'
								validators={[Validation.requiredValidator, Validation.emailValidator]} />

				<Bessemer.Field name='password' friendlyName='Password' placeholde='Password'
								validators={[Validation.requiredValidator, Validation.passwordValidator]}
								field={<input className='form-control' type='password' />} />

				<div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}} className='center'>
					<Bessemer.Button loading={submitting}>Sign In</Bessemer.Button>
				</div>
			</form>
		);
	}
}

LoginForm.contextTypes = {
	router: PropTypes.object.isRequired,
};


LoginForm = ReduxForm.reduxForm({form: 'login'})(LoginForm);

LoginForm = connect(
	state => ({

	}),
	dispatch => ({
		authenticate: (principal, password) => dispatch(Users.Actions.authenticate(principal, password))
	})
)(LoginForm);

export default LoginForm;
