import React from 'react';
import {Card, CardBody, CardTitle, Col} from 'reactstrap';
import RegistrationForm from 'js/components/forms/RegistrationForm';
import NavigationBar from 'js/components/Navbar';
import Background from '../../resources/images/dogs_background.jpg';

const center = {
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center'
};
const pageStyle = {
	backgroundSize: 'cover',
	backgroundPosition: 'center',
	backgroundImage: 'url(' + Background + ')',
	overflow: 'hidden',
	height: '100%',
};
const pageContent = {
	opacity: '0.9',
};

class RegisterPage extends React.Component {
	render() {
		return (
			<div style={pageStyle}>
				<div style={pageContent}>
					<div>
						<NavigationBar/>
					</div>
					<br/>
					<div style={center}>
						<Col sm="8">
							<Card>
								<br/>
								<CardTitle style={center}>Register</CardTitle>
								<CardBody>
									<RegistrationForm />
								</CardBody>
							</Card>
						</Col>
					</div>
				</div>
			</div>
		);
	}
}

export default RegisterPage;