import React from 'react';
import * as Bessemer from 'js/alloy/bessemer/components';
import * as Validation from 'js/alloy/utils/validation';
import * as ReduxForm from 'redux-form';
import connect from 'react-redux/es/connect/connect';
import * as Users from 'js/utils/Users';
import PropTypes from 'prop-types';

class LoginForm extends React.Component {

	onSubmit = ({principal, password}) => {

		// This is where we would make our axios calls to the data store
		if (this.props.authenticate(principal, password)) {
			this.context.router.history.push('/');
		} else {
			console.log('Error! Email or password does not exist.');
		}
	};

	render() {
		let { handleSubmit } = this.props;

		return (
			<React.Fragment>
				<form name="form" onSubmit={handleSubmit(form => this.onSubmit(form))}>
					<Bessemer.Field name="principal" friendlyName="Email Address"
									validators={[Validation.requiredValidator, Validation.emailValidator]}
									field={<input className="form-control" type="text" placeholder="example@email.com" /> }/>

					<Bessemer.Field name="password" friendlyName="Password"
									validators={[Validation.requiredValidator, Validation.passwordValidator]}
									field={<input className="form-control" type="password" placeholder="Password" />} />

					<Bessemer.Button>Sign In</Bessemer.Button>
				</form>
			</React.Fragment>
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