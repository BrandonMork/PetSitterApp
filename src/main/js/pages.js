import _ from 'lodash';

import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as Users from 'js/users';
import * as Login from 'js/login';

import axios from 'axios';

export class Home extends React.Component {

	constructor(props) {
		super(props);
		this.state = {ponged: 'Not Ponged'};

		this.ping = this.ping.bind(this);
	}

	render() {
		return (
			<div className="container padded">
				This is Gif||Gif's Tempeturs home page - redefined!

				<ul>
					<li><Link to="/register">Register</Link></li>
					<li><Link to="/login">Login</Link></li>
					<li><Link to="/rating-page">Rating Page</Link></li>
					<li><Link to="/report-page">Report Page</Link></li>
					<li><Link to="/find-sitter">Find Sitter</Link></li>
				</ul>

				<div>
					<button onClick={this.ping}>Ping!</button>
					<div>Ponged: {this.state.ponged}</div>
				</div>

			</div>
		);
	}

	ping() {
		axios.get('/pong').then(res => {
			alert('Received Successful response from server!');
			this.setState({ponged: 'Ponged! '});
		}, err => {
			alert('Server rejected response with: ' + err);
		});
	}
}

export class RegisterPage extends React.Component {
	render() {
		return (
			<div className="container padded">
				<div className="row">
					<div className="col-6 offset-md-3">
						<h2>Register</h2>
						<hr />
						<Login.RegistrationForm />
					</div>
				</div>
			</div>
		);
	}
}

export class LoginPage extends React.Component {
	render() {
		return (
			<div className="container padded">
				<div className="row">
					<div className="col-6 offset-md-3">
						<h2>Login</h2>
						<hr />
						<Login.LoginForm />
					</div>
				</div>
			</div>
		);
	}
}

class ReviewPage extends React.Component {
	render() {
		return (
			<div className="container padded">
				This a page where you review a user!

				{ _.isDefined(this.props.authentication) &&
				<div>{this.props.authentication['access_token']}</div>
				}

				{ _.isDefined(this.props.user) &&
				<div>Welcome, {this.props.user.principal}!</div>
				}
			</div>
		);
	}
}

ReviewPage = connect(
	state => ({
		authentication: Users.State.getAuthentication(state),
		user: Users.State.getUser(state)
	})
)(ReviewPage);

export { ReviewPage };

export class ReportingPage extends React.Component {
	render() {
		return (
			<div className="container padded">
				This is the page where you report a user!
			</div>
		);
	}
}

export class FindSitter extends React.Component {
	render() {
		return (
			<div className="container padded">
				This is the page to find a sitter!
			</div>
		);
	}
}