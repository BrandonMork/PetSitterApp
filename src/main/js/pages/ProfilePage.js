import React from 'react';
import { Col, Card, CardTitle, CardBody} from 'reactstrap';
import NavigationBar from 'js/components/Navbar';
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
			<div className="container padded">
				<div className="center">
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
				</div>
				<br/>

				{_.isDefined(this.props.user) &&
				_.isEqual(this.props.user.type, 'Sitter') &&
				<div className="center">
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
										},
										{
											id: 'private',
											title: 'My private cal',
											foregroundColor: '#666',
											backgroundColor: '#f3f3f3',
										},
									]}
									onChange={(selections) => {
										selections.forEach(({ start, end }) => {
											console.log('Start:', start, 'End:', end);
										});
									}}
									height={400}
									recurring={false}
									availableDays={['monday', 'tuesday', 'wednesday', 'thursday', 'friday']}
									availableHourRange={{ start: 9, end: 19 }}
								/>
							</CardBody>
						</Card>
					</Col>
				</div>
				}
				</div>
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
