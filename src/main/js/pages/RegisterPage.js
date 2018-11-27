import React from 'react';
import {Card, CardBody, CardTitle, Col} from 'reactstrap';
import RegistrationForm from 'js/components/forms/RegistrationForm';
import '../../styles/pageStyles.css';

class RegisterPage extends React.Component {
	render() {
		return (
			<div style={{marginTop: 100}} className="center">
				<Col md="10" sm="12">
					<Card>
						<br/>
						<CardTitle className="center">Register</CardTitle>
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