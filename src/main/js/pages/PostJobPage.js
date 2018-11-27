import React from 'react';
import {Col, Card, CardTitle, CardBody, Container, Row} from 'reactstrap';
import PostJobForm from 'js/components/forms/PostJobForm';
import '../../styles/pageStyles.css';

// @TODO Mario make sure the form shows the current user info
class PostJobPage extends React.Component {

	render() {
		return (
			<Container fluid>
				<Row>
					<Col md={10} sm={12} style={{marginTop: 80, marginBottom: 20}}>
						<Card>
							<CardTitle className="center">Create a job!</CardTitle>
							<CardBody>
								<PostJobForm/>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>

		);
	}
}

export default PostJobPage;
