import React from 'react';
import { Col, Card, CardTitle, CardBody} from 'reactstrap';
import NavigationBar from 'js/components/Navbar';
import Background from '../../resources/images/dogs_background.jpg';
import ProfilePageForm from 'js/components/forms/ProfilePageForm';

const pageStyle = {
	backgroundSize: 'cover',
	backgroundImage: 'url(' + Background + ')',
	backgroundPosition: 'center',
	height: '100%',
};
const pageContent = {
	opacity: '0.8',
};
const center = {
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center'
};

// @Todo Mario make sure the form shows the current user info

class ProfilePage extends React.Component {

	render() {
		return (
			<div style={pageStyle}>
				<div className="container padded">
					<div style={pageContent}>
						<div>
							<NavigationBar/>
						</div>
						<br/>
						<div style={center}>
							<Col md="10">
								<Card>
									<br/>
									<CardTitle style={center}>Welcome to your profile!</CardTitle>
									<CardBody>
										<p>Submit any changes below.</p>
										<ProfilePageForm />
									</CardBody>
								</Card>
							</Col>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default ProfilePage;
