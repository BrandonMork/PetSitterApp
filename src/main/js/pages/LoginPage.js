import React from 'react';
import { Card, CardTitle, CardBody, Col } from 'reactstrap';
import '../../styles/pageStyles.css';
import * as Bessemer from '../alloy/bessemer/components';
import * as Validation from '../alloy/utils/validation';
import PropTypes from 'prop-types';
import * as ReduxForm from 'redux-form';
import connect from 'react-redux/es/connect/connect';
import * as Users from '../utils/Users';

class LoginPage extends React.Component {

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
			<div style={{marginTop: 100}} className="center">
				<Col sm="8">
					<Card>
						<br/>
						<CardTitle className="center">Login</CardTitle>
						<CardBody>
							<form name="form" onSubmit={handleSubmit(form => this.onSubmit(form))}>
								<Bessemer.Field name="principal" friendlyName="Email Address"
												validators={[Validation.requiredValidator, Validation.emailValidator]}
												field={<input className="form-control" type="text" placeholder="example@email.com" /> }/>

								<Bessemer.Field name="password" friendlyName="Password"
												validators={[Validation.requiredValidator, Validation.passwordValidator]}
												field={<input className="form-control" type="password" placeholder="Password" />} />

								<Bessemer.Button>Sign In</Bessemer.Button>
							</form>
						</CardBody>
					</Card>
				</Col>
			</div>
		);
	}
}

LoginPage.contextTypes = {
	router: PropTypes.object.isRequired,
};

LoginPage = ReduxForm.reduxForm({form: 'login'})(LoginPage);
LoginPage = connect(
	state => ({

	}),
	dispatch => ({
		authenticate: (principal, password) => dispatch(Users.Actions.authenticate(principal, password))
	})
)(LoginPage);

export default LoginPage;