import React from 'react';
import { Card, CardTitle, CardBody, Col } from 'reactstrap';
import LoginForm from 'js/components/forms/LoginForm';
import NavigationBar from 'js/components/Navbar';
import '../../styles/pageStyles.css';

class LoginPage extends React.Component {

	render() {
		return (
			<div className="pageContainer">
				<div className="pageContent">
					<div className="container padded">

						<div>
							<NavigationBar/>
						</div>

						<br/>
						<div className="center">
							<Col sm="8">
								<Card>
									<br/>
									<CardTitle className="center">Login</CardTitle>
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