import React from 'react';
import _ from 'lodash';
import connect from 'react-redux/es/connect/connect';
import * as Users from 'js/utils/Users';
import NavigationBar from 'js/components/Navbar';
import Cookie from 'universal-cookie';
import profile_pic from '../profile_pic.jpg';
import {Card, CardBody, CardTitle, Col, CardText, CardImg, Form, Row, FormGroup, Label, Input} from 'reactstrap';
import {Button} from 'js/alloy/bessemer/components';

// @TODO Mario make this look pretty pls
class EditPetPage extends React.Component {
	constructor(props){
		super(props);
		setTimeout(1000);
	}

	getCurrentPet() {
		const myCookie = new Cookie();
		const currentPet = myCookie.get('currentPet');
		return <React.Fragment>
			<Col sm='8' >
				<Card>
					<CardTitle>{'Please review the information about the pet!'} </CardTitle>
					<CardImg top width="25%" src={profile_pic} />
					<CardBody>
						<CardText>{'Pet Name: ' + currentPet.name} </CardText>
						<CardText>{'Species: ' + currentPet.species} </CardText>
						<CardText>{'Breed: ' + currentPet.breed} </CardText>
						<CardText>{'Size: ' + currentPet.size} </CardText>
						<CardText>{'Age: ' + currentPet.age} </CardText>
					</CardBody>
				</Card>
			</Col>
		</React.Fragment>;
	}

	getCookieInfo(){
		const myCookie = new Cookie();
		const currentPet = myCookie.get('currentPet');
		return currentPet;
	}

	handleSubmit(e) {
		e.preventDefault();
		console.log('update pet with this info');
		console.log(e);
	}

	render() {
		return (
			<div className='pageContainer'>
				<div className='container padding'>
					<div className='pageContent'>
						<div>
							<div>
								<this.getCurrentPet />
							</div>
							<br/>
							<Form name="form" onSubmit={this.handleSubmit.bind(this)}>
								<Row form>
									<Col md={4}>
										<FormGroup>
											<Label for="name">Name</Label>
											<Input type="text" name="name"
												   placeholder={this.getCookieInfo().name} defaultValue={this.getCookieInfo().name} />
										</FormGroup>
									</Col>
									<Col md={4}>
										<FormGroup>
											<Label for="size">Size</Label>
											<Input type="text" name="size"
												   placeholder={this.getCookieInfo().size} defaultValue={this.getCookieInfo().size} />
										</FormGroup>
									</Col>
									<Col md={4}>
										<FormGroup>
											<Label for="age">Age</Label>
											<Input type="text" name="age"
												   placeholder={this.getCookieInfo().age} defaultValue={this.getCookieInfo().age} />
										</FormGroup>
									</Col>
								</Row>
								<Button>Edit Pet</Button>
							</Form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

EditPetPage = connect(
	state => ({
		authentication: Users.State.getAuthentication(state),
		user: Users.State.getUser(state)
	})
)(EditPetPage);

export default EditPetPage;