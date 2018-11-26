import React from 'react';
import {Col, Card, CardTitle, CardBody, Row, Container} from 'reactstrap';
import ProfilePageForm from 'js/components/forms/ProfilePageForm';
import '../../styles/pageStyles.css';
import _ from 'lodash';
import AvailableTimes from 'react-available-times';
import connect from 'react-redux/es/connect/connect';
import * as Users from 'js/utils/Users';

// @Todo Mario make sure the form shows the current user info
class ProfilePage extends React.Component {

	render() {
		return (
			<Container className="center-container">
				<Row>
					<Col md="10">
						<Card>
							<br/>
							<CardTitle className="center">Welcome to your profile!</CardTitle>
							<CardBody>
								<p>Submit any changes below.</p>
								<ProfilePageForm />
							</CardBody>
						</Card>
					</Col>
				</Row>
			<br/>

			{_.isDefined(this.props.user) &&
			(_.isEqual(this.props.user.userType, 'Sitter') || _.isEqual(this.props.user.userType, 'Both')) &&
			<Row>
				<Col md="10">
					<Card>
						<br/>
						<CardTitle className="center">Set your availability!</CardTitle>
						<CardBody>
							<AvailableTimes
								weekStartsOn="monday"
								calendars={[
									{
										id: 'work',
										title: 'Work',
										foregroundColor: '#ff00ff',
										backgroundColor: '#f0f0f0',
										selected: true,
									}
								]}
								onChange={(selections) => {
									selections.forEach(({ start, end }) => {
										console.log('Start:', start, 'End:', end);
									});
								}}
								height={700}
								recurring={true}
								availableDays={['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']}
								availableHourRange={{ start: 0, end: 23 }}
							/>
						</CardBody>
					</Card>
				</Col>
			</Row>
			}
			</Container>
		);
	}
}

ProfilePage = connect(
	state => ({
		authentication: Users.State.getAuthentication(state),
		user: Users.State.getUser(state)
	})
)(ProfilePage);

export default ProfilePage;
