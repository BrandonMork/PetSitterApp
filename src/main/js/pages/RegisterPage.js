import React from 'react';
import {Card, CardBody, CardTitle, Col} from 'reactstrap';
import RegistrationForm from 'js/components/RegistrationForm';
import NavigationBar from 'js/components/Navbar';

const center = {
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center'
};

class RegisterPage extends React.Component {
	render() {
		return (
			<React.Fragment>
				<div>
					<NavigationBar/>
				</div>
				<br/>
				<div style={center}>
					<Col sm="6">
						<Card>
							<br/>
							<CardTitle style={center}>Register</CardTitle>
							<CardBody>
								<RegistrationForm />
							</CardBody>
						</Card>
					</Col>
				</div>
			</React.Fragment>
		);
	}
}

export default RegisterPage;