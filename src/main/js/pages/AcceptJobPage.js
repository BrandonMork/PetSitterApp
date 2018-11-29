import React from 'react';
import {
	CardBody,
	CardTitle,
	CardText,
	Button,
	Card,
} from 'reactstrap';
import * as Users from 'js/utils/Users';
import connect from 'react-redux/es/connect/connect';
import Cookie from 'universal-cookie';
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

	acceptJob = (e) => {
		e.preventDefault();

		console.log('the jobID should be');
		console.log(this.state.job.jobID);

		let sitterInfo = this.props.user.principal;
		let ownerPrincipal = this.state.ownerPrincipal;

		Users.getJob(this.state.job.jobID)
			.then(function (response) {
				response.accepted = 'yes';
				response.sitterPrincipal = sitterInfo;
				let notification = {
					'senderPrincipal': sitterInfo,
					'receiverPrincipal': ownerPrincipal,
					'message': sitterInfo + ' has accepted your job!',
					'read': 'no'
				};

				Users.updateJobDetails(response);
				Users.createNotification(notification);
			})
			.catch(function (error) {
				console.log(error);
			});
	};

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

					<div className="center">
						<Button onClick={(e) => this.acceptJob(e)}>Accept Job</Button>&nbsp;
						<Button href="/#/search-job">Find more awesome jobs!</Button>
					</div>
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
