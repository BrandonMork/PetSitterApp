import React from 'react';
import connect from 'react-redux/es/connect/connect';
import * as Users from 'js/utils/Users';
import AvailabilityForm from 'js/components/AvailabilityForm';
import {
	Col,
	Row,
	Button,
	Form,
	FormGroup,
	Label,
	Input,
	Card,
	CardTitle,
	CardBody, CardText
} from 'reactstrap';

const cardStyle = {
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	height: '100vh'
};

const centerStyle = {
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center'
};

class ProfilePage extends React.Component {
	render() {
		return (
			<div>
				<div>
					Welcome to your profile {this.props.user.principal}!
					<br/><br/>
					Let's see if you have any pets!
					<br/><br/>
					Insert reactive form here to curl elastisearch
				</div>
                <br/><br/>
                <div>
                    Add possible availabilities
                    <AvailabilityForm />
                </div>

				<div style={cardStyle}>
					<Col md="12">
						<Card>
							<br/>
							<CardTitle style={centerStyle}>Welcome to your profile!</CardTitle>
							<CardBody>

								<CardText style={centerStyle}> Submit any changes below.</CardText>
								<br/>

								<Form>
									<Row form>
										<Col md={6}>
											<FormGroup>
												<Label for="userEmail">Email</Label>
												<Input type="email" name="email" id="userEmail" placeholder={this.props.user.principal} />
											</FormGroup>
										</Col>
										<Col md={6}>
											<FormGroup>
												<Label for="userName">Full Name</Label>
												<Input type="text" name="name" id="userName" placeholder="Mario Arturo Lopez Martinez" />
											</FormGroup>
										</Col>
									</Row>
									<FormGroup>
										<Label for="userAddress">Address</Label>
										<Input type="text" name="address" id="userAddress" placeholder="1234 Main St"/>
									</FormGroup>
									<FormGroup>
										<Label for="userAddress2">Address 2</Label>
										<Input type="text" name="address2" id="userAddress2" placeholder="Apartment, studio, or floor"/>
									</FormGroup>
									<Row form>
										<Col md={6}>
											<FormGroup>
												<Label for="userCity">City</Label>
												<Input type="text" name="city" id="userCity" placeholder="Waco"/>
											</FormGroup>
										</Col>
										<Col md={4}>
											<FormGroup>
												<Label for="userState">State</Label>
												<Input type="text" name="state" id="userState" placeholder="TX"/>
											</FormGroup>
										</Col>
										<Col md={2}>
											<FormGroup>
												<Label for="userZip">Zip</Label>
												<Input type="text" name="zip" id="userZip" placeholder="76706"/>
											</FormGroup>
										</Col>
									</Row>

									User Classifications:
									<FormGroup check>
										<Input type="checkbox" name="sitterCheckbox" id="sitterCheckbox"/>
										<Label for="sitterCheckbox" check>Owner</Label>
									</FormGroup>
									<FormGroup check>
										<Input type="checkbox" name="ownerCheckbox" id="ownerCheckbox"/>
										<Label for="ownerCheckbox" check>Sitter</Label>
									</FormGroup>
									<br/>
									<Button>Submit Changes</Button>
								</Form>

							</CardBody>
						</Card>
					</Col>
				</div>
			</div>
		);
	}
}

//make sure user is logged in
ProfilePage = connect(
	state => ({
		authentication: Users.State.getAuthentication(state),
		user: Users.State.getUser(state)
	})
)(ProfilePage);

export default ProfilePage;