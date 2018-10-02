import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import NavigationBar from 'js/components/navbar';

export class HomePage extends React.Component {

	constructor(props) {
		super(props);
		this.state = {ponged: 'Not Ponged'};

		this.ping = this.ping.bind(this);
	}

	render() {
		return (
			<div className="container padded">

				<NavigationBar/>

				This is Gif||Gif's Tempeturs home page - redefined!

				<ul>

					<li><Link to="/register">Register</Link></li>
					<li><Link to="/login">Login</Link></li>
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
		axios.get('https://giforgif-tempeturs.herokuapp.com/pong').then(res => {
			alert('Received Successful response from server!');
			this.setState({ponged: 'Ponged! '});
		}, err => {
			alert('Server rejected response with: ' + err);
		});
	}
}