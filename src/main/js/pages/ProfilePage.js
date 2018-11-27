import React from 'react';
import {Col, Card, CardTitle, CardBody, Row, Container} from 'reactstrap';
import ProfilePageForm from 'js/components/forms/ProfilePageForm';
import '../../styles/pageStyles.css';
import _, {isEqual} from 'lodash';
import AvailableTimes from 'react-available-times';
import connect from 'react-redux/es/connect/connect';
import * as Users from 'js/utils/Users';

class ProfilePage extends React.Component {

	render() {
		return (
			<Container style={{marginTop: 15}}>
				<Row>
					<Col lg={12} md={12} sm={12} xs={12}>
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

			{(isEqual(this.props.user.userType, 'Owner') ||
			  isEqual(this.props.user.userType, 'Both')) &&
			<Row>
				<Col lg={6} md={6} sm={12} xs={12}>
					<p>Pet List Goes Here</p>
				</Col>
				<Col lg={6} md={6} sm={12} xs={12}>
					<p>Delete account? Change password? Something else</p>
				</Col>
			</Row>}

			{(_.isEqual(this.props.user.userType, 'Sitter') ||
			  _.isEqual(this.props.user.userType, 'Both')) &&
			<Row>
				<Col lg={12} md={12} sm={12} xs={12}>
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
								availableHourRange={{ start: 9, end: 19 }}
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
