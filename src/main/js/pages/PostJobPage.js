import React from 'react';
import {
	CardTitle,
	CardBody,
	Card,
} from 'reactstrap';
import PostJobForm from 'js/components/forms/PostJobForm';
import '../../styles/pageStyles.css';

// @TODO Mario make sure the form shows the current user info
class PostJobPage extends React.Component {

	render() {
		return (
			<Card style={{marginTop: 80, marginBottom: 20}} className="center">
				<CardTitle className="center" style={{fontSize: 35, marginTop: 20}}>You're one step closer to posting your job!</CardTitle>
				<CardBody>
					<PostJobForm/>
				</CardBody>
			</Card>
		);
	}
}

export default PostJobPage;
