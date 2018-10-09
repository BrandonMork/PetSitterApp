import React from 'react';
import {Card, CardBody, CardTitle, Col} from 'reactstrap';
import RegistrationForm from 'js/components/RegistrationForm';

class RegisterPage extends React.Component {
	render() {
		return (
			<div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
				<Col sm="6">
					<Card>
						<br/>
						<CardTitle style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>Register</CardTitle>
						<CardBody>
							<RegistrationForm />
						</CardBody>
					</Card>
				</Col>
			</div>
		);
	}
}

export default RegisterPage;