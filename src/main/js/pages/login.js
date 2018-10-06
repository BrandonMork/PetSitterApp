import React from 'react';
import { Card, CardTitle, CardBody, CardText, Col } from 'reactstrap';
import LoginForm from 'js/components/loginForm';

class LoginPage extends React.Component {
	render() {
		return (
			<div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
				<Col sm="6">
					<Card>
						<br/>
						<CardTitle style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>Login</CardTitle>
						<CardBody>
							<CardText>
								<LoginForm/>
							</CardText>
						</CardBody>
					</Card>
				</Col>
			</div>
		);
	}
}

export default LoginPage;