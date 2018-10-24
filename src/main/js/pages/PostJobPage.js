import React from 'react';
import { Col, Card, CardTitle, CardBody} from 'reactstrap';
import NavigationBar from 'js/components/Navbar';
import Background from '../../resources/images/dogs_background.jpg';
import PostJobForm from 'js/components/forms/PostJobForm';

const pageStyle = {
	backgroundSize: 'cover',
	backgroundImage: 'url(' + Background + ')',
	backgroundPosition: 'center',
	backgroundAttachment: 'scroll',
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

// @TODO Mario make sure the form shows the current user info
class PostJobPage extends React.Component {

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
									<CardTitle style={center}>Create a job!</CardTitle>
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
