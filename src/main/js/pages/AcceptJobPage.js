import React from 'react';
import connect from 'react-redux/es/connect/connect';
import * as Users from 'js/utils/Users';
import Cookie from 'universal-cookie';
import { Card, Button, CardBody, CardTitle, CardText } from 'reactstrap';
import '../../styles/pageStyles.css';

class AcceptJobPage extends React.Component {

	constructor(props) {
		super(props);

		const myCookie = new Cookie();
		const currentJob = myCookie.get('currentJob');

		this.state = {
			job: currentJob
		};
	}

	render() {
		return (
			<Card className="center" style={{marginTop: 80}}>
				<CardTitle className="center">Detailed information about the job!</CardTitle>
				<CardBody>
					<CardText>Job ID: {this.state.job.id}</CardText>
					<CardText>Pet name: {this.state.job.pets}</CardText>
					<CardText>Address Line 1: {this.state.job.addressLine1}</CardText>
					<CardText>Address Line 2: {this.state.job.addressLine2}</CardText>
					<CardText>City: {this.state.job.city}</CardText>
					<CardText>State: {this.state.job.state}</CardText>
					<CardText>Zip: {this.state.job.zip}</CardText>
					<CardText>Start Date: {this.state.job.startDate}</CardText>
					<CardText>End Date: {this.state.job.endDate}</CardText>
					<CardText>Additional Job Details: {this.state.job.preferences}</CardText>
					<Button href="/#/search-job">Find more awesome jobs!</Button>
				</CardBody>
			</Card>
		);
	}
}

AcceptJobPage = connect(
	state => ({
		authentication: Users.State.getAuthentication(state),
		user: Users.State.getUser(state)
	})
)(AcceptJobPage);

export default AcceptJobPage;
