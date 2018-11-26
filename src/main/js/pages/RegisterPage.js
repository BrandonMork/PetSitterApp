import React from 'react';
import {Card, CardBody, CardTitle, Col} from 'reactstrap';
import RegistrationForm from 'js/components/forms/RegistrationForm';
import '../../styles/pageStyles.css';

class RegisterPage extends React.Component {
	render() {
		return (
			<div className="pageContainer">
				<div className="pageContent">
					<div className="center">
						<Col sm="8">
							<Card>
								<br/>
								<CardTitle className="center">Register</CardTitle>
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