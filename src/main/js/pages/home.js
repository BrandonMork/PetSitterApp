import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import NavigationBar from 'js/components/navbar';
import { Jumbotron, Container } from 'reactstrap';
import _ from 'lodash';
import connect from 'react-redux/es/connect/connect';
import * as Users from 'js/users';

class HomePage extends React.Component {

	constructor(props) {
		super(props);
		this.state = {ponged: 'Not Ponged'};

		this.ping = this.ping.bind(this);
	}

	render() {
		return (
			<div className="container padded">

				<NavigationBar/>

				<Jumbotron fluid>
					<Container fluid>
						<h1 className="display-4">Pet Sitter Matching Service</h1>
						<p className="lead">Our job is to seamlessly pair you with qualified pet sitters in your area.</p>
					</Container>
				</Jumbotron>

				<br/>

				{ _.isDefined(this.props.authentication) &&
				<div>{this.props.authentication['access_token']}</div>
				}

				<br/>

				{ _.isDefined(this.props.user) &&
				<div>Welcome, {this.props.user.principal}!</div>
				}

				<br/>

				<ul>
					<li><Link to="/rating-page">Rating Page</Link></li>
					<li><Link to="/report-page">Report Page</Link></li>
					<li><Link to="/find-sitter">Find Sitter</Link></li>
					<li><Link to="/add-pet">Add Pet</Link></li>
				</ul>

				<div>
					<button onClick={this.ping}>Ping!</button>
					<div>Ponged: {this.state.ponged}</div>
				</div>

			</div>
		);
	}

	ping() {
		axios.get('https://giforgif-tempeturs.herokuapp.com/pong').then(() => {
			alert('Received Successful response from server!');
			this.setState({ponged: 'Ponged! '});
		}, err => {
			alert('Server rejected response with: ' + err);
		});
	}
}

HomePage = connect(
	state => ({
		authentication: Users.State.getAuthentication(state),
		user: Users.State.getUser(state)
	})
)(HomePage);

export default HomePage;
