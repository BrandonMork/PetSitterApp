import React from 'react';
import { Col, Card, CardTitle, CardBody} from 'reactstrap';
import PostJobForm from 'js/components/forms/PostJobForm';
import '../../styles/pageStyles.css';

// @TODO Mario make sure the form shows the current user info
class PostJobPage extends React.Component {

	render() {
		return (
			<div className="center">
				<Col md="10">
					<Card>
						<CardTitle className="center">Create a job!</CardTitle>
						<CardBody>
							<PostJobForm/>
						</CardBody>
					</Card>
				</Col>
			</div>
		);
	}
}

export default PostJobPage;
