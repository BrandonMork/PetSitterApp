import React from 'react';
import {Col, Card, CardTitle, CardBody, Row, Container} from 'reactstrap';
import connect from 'react-redux/es/connect/connect';
import ProfilePageForm from '../components/forms/ProfilePageForm';
import * as Users from '../utils/Users';
import '../../styles/pageStyles.css';

class ProfilePage extends React.Component {

	render() {
		return (
			<Container style={{marginTop: 80, marginBottom: 20}}>
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
