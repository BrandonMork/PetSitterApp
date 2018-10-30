import React from 'react';
import { Col, Card, CardTitle, CardBody} from 'reactstrap';
import NavigationBar from 'js/components/Navbar';
import ProfilePageForm from 'js/components/forms/ProfilePageForm';
import '../../styles/pageStyles.css';

// @Todo Mario make sure the form shows the current user info
class ProfilePage extends React.Component {

	render() {
		return (
			<div className="pageContainer">
				<div className="container padded">
					<div className="pagecontent">
						<div>
							<NavigationBar/>
						</div>
						<br/>
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
					</div>
				</div>
			</div>
		);
	}
}

export default ProfilePage;
