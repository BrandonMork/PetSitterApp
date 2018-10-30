import React from 'react';
import { Col, Card, CardTitle, CardBody} from 'reactstrap';
import NavigationBar from 'js/components/Navbar';
import PostJobForm from 'js/components/forms/PostJobForm';
import '../../styles/pageStyles.css';

// @TODO Mario make sure the form shows the current user info
class PostJobPage extends React.Component {

	render() {
		return (
			<div className="pageContainer">
				<div className="container padded">
					<div className="pageContent">
						<div>
							<NavigationBar/>
						</div>

						<br/>

						<div className="center">
							<Col md="10">
								<Card>
									<br/>
									<CardTitle className="center">Create a job!</CardTitle>
									<CardBody>
										<PostJobForm/>
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

export default PostJobPage;
