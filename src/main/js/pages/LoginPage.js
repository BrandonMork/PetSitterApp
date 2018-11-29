import React from 'react';
import {
	CardTitle,
	CardBody,
	Card,
	Col,
} from 'reactstrap';
import * as Bessemer from '../alloy/bessemer/components';
import * as Validation from '../alloy/utils/validation';
import * as ReduxForm from 'redux-form';
import * as Users from '../utils/Users';
import PropTypes from 'prop-types';
import notification from 'js/notification';
import connect from 'react-redux/es/connect/connect';
import '../../styles/pageStyles.css';

class LoginPage extends React.Component {

	constructor(props) {
		super(props);

		this.add = this.add.bind(this);
		this.addError = this.addError.bind(this);
	}

	onSubmit = ({principal, password}) => {
		// This is where we would make our axios calls to the data store
		if (this.props.authenticate(principal, password)) {
			setTimeout(() => {
				if (this.props.authentication != null) {
					window.location.href = '/#/';
					this.add('bottom-center');
				} else {
					this.addError('bottom-center');
				}
			}, 500);
		} else {
			console.log('Error! Email or password does not exist.');
		}
	};

	add(container) {
		const { addNotification } = this.props;

		return addNotification(Object.assign({}, notification, {
			title: 'Success!',
			message: 'You are now logged in!',
			container,
			type: 'success'
		}));
	}

	addError(container) {
		const { addNotification } = this.props;

		return addNotification(Object.assign({}, notification, {
			title: 'Error!',
			message: 'Incorrect email or password.',
			container,
			type: 'danger'
		}));
	}

	render() {
		let { handleSubmit } = this.props;

		return (
			<div style={{marginTop: 100}} className='center'>
				<Col sm='8'>
					<Card>
						<br/>
						<CardTitle className='center'>Login</CardTitle>
						<CardBody>
							<form name='form' onSubmit={handleSubmit(form => this.onSubmit(form))}>
								<Bessemer.Field name='principal' friendlyName='Email Address'
												validators={[Validation.requiredValidator, Validation.emailValidator]}
												field={<input className='form-control' type='text' placeholder='example@email.com' /> }/>

								<Bessemer.Field name='password' friendlyName='Password'
												validators={[Validation.requiredValidator, Validation.passwordValidator]}
												field={<input className='form-control' type='password' placeholder='Password' />} />

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
		authentication: Users.State.getAuthentication(state),
		user: Users.State.getUser(state)
	}),
	dispatch => ({
		authenticate: (principal, password) => dispatch(Users.Actions.authenticate(principal, password))
	})
)(LoginPage);

export default LoginPage;