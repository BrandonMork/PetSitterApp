import React from 'react';
import connect from 'react-redux/es/connect/connect';
import * as Users from 'js/utils/Users';
import Cookie from 'universal-cookie';
import profile_pic from '../profile_pic.jpg';
import {Card, CardBody, CardTitle, Col, CardText, CardImg} from 'reactstrap';

// @TODO Mario make this look pretty pls
class ReviewJobPage extends React.Component {

	getCurrentJob() {
		const myCookie = new Cookie();
		const currentJob = myCookie.get('currentJob');
		return <React.Fragment>
			<Col sm='8' >
				<Card>
					<CardTitle>{'Please review the information below and accept the job!'} </CardTitle>
                    <CardImg top width="25%" src={profile_pic} />
                    <CardBody>
						<CardText>{'Job ID: ' + currentJob.id} </CardText>
						<CardText>{'Pet Name: ' + currentJob.pets} </CardText>
						<CardText>{'Start Date: ' + currentJob.startDate} </CardText>
						<CardText>{'End Date: ' + currentJob.endDate} </CardText>
					</CardBody>
				</Card>
			</Col>
		</React.Fragment>;
	}

	render() {
		return (
			<div>
				<this.getCurrentJob />
			</div>
		);
	}
}

ReviewJobPage = connect(
	state => ({
		authentication: Users.State.getAuthentication(state),
		user: Users.State.getUser(state)
	})
)(ReviewJobPage);

export default ReviewJobPage;