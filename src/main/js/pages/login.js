import React from 'react';
import * as Login from 'js/login';

import { Card, CardBody, CardText, Col, Button, ButtonGroup } from 'reactstrap';
import {LoginForm} from 'js/login';
import {RegistrationForm} from 'js/login';

class LoginRegistrationPage extends React.Component {

	constructor(props) {
		super(props);

		this.state = { rSelected: 1 };

		this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
	}

	onRadioBtnClick(rSelected) {
		this.setState({ rSelected });
	}

	render() {

		let form;

		if (this.state.rSelected === 1) {
			form = <LoginForm/>;
		} else {
			form = <RegistrationForm/>;
		}

		return (
			<div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
				<Col sm="5">
					<Card>
						<ButtonGroup style={{marginTop: '10px', display: 'flex',
							justifyContent: 'center', alignItems: 'center'}}>
							<Button size="lg" color="primary" onClick={() => this.onRadioBtnClick(1)}
									active={this.state.rSelected === 1}>Login</Button>
							<Button size="lg" color="primary" onClick={() => this.onRadioBtnClick(2)}
									active={this.state.rSelected === 2}>Register</Button>
						</ButtonGroup>
						<CardBody>
							<CardText>
								{form}
							</CardText>
						</CardBody>

					</Card>
				</Col>
			</div>
		);
	}
}

export default LoginRegistrationPage;