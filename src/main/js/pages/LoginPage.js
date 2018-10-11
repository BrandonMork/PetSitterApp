import React from 'react';
import { Card, CardTitle, CardBody, Col } from 'reactstrap';
import LoginForm from 'js/components/LoginForm';
import NavigationBar from 'js/components/Navbar';
import Background from '../../resources/images/dogs_background.jpg';

const pageStyle = {
	backgroundSize: 'cover',
	backgroundPosition: 'center',
	backgroundImage: 'url(' + Background + ')',
	overflow: 'hidden',
	height: '100%',
};
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
const pageContent = {
	opacity: '0.9',
};

class LoginPage extends React.Component {
	render() {
		return (
			<div style={pageStyle}>
				<div style={pageContent}>
					<div className="container padded">
						<div>
							<NavigationBar/>
						</div>
						<br/>
						<div style={cardStyle}>
							<Col sm="8">
								<Card>
									<br/>
									<CardTitle style={center}>Login</CardTitle>
									<CardBody>
										<LoginForm/>
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

export default LoginPage;