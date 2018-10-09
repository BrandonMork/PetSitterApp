import React from 'react';
import { Card, CardTitle, CardBody, Col } from 'reactstrap';
import LoginForm from 'js/components/loginForm';

const cardStyle = {
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	height: '100vh'
};

const center = {
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center'
};

class LoginPage extends React.Component {
	render() {
		return (
			<div style={cardStyle}>
				<Col sm="6">
					<Card>
						<br/>
						<CardTitle style={center}>Login</CardTitle>
						<CardBody>
							<LoginForm/>
						</CardBody>
					</Card>
				</Col>
			</div>
		);
	}
}

export default LoginPage;