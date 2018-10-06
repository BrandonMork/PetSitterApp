import React from 'react';
import {Card, CardBody, CardText, CardTitle, Col} from 'reactstrap';
import RegistrationForm from 'js/components/registrationForm';

class RegisterPage extends React.Component {
	render() {
		return (
			<div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
				<Col sm="6">
					<Card>
						<br/>
						<CardTitle style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>Register</CardTitle>
						<CardBody>
							<CardText>
								<RegistrationForm />
							</CardText>
						</CardBody>
					</Card>
				</Col>
			</div>
		);
	}
}

export default RegisterPage;