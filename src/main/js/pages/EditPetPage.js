import React from 'react';
import {
	FormGroup,
	CardTitle,
	CardBody,
	CardText,
	Button,
	Label,
	Input,
	Form,
	Card,
	Col,
	Row,
} from 'reactstrap';
import { updatePet } from 'js/utils/Users';
import * as Users from 'js/utils/Users';
import Cookie from 'universal-cookie';
import connect from 'react-redux/es/connect/connect';

class EditPetPage extends React.Component {
	constructor(props){
		super(props);

		const myCookie = new Cookie();
		const currentPet = myCookie.get('currentPet');

		this.state = {
			pet: currentPet
		};
	}

	handleSubmit(e) {
		e.preventDefault();
		let tempPet = this.state.pet;

		let updatedPet = {
			'name': tempPet.name,
			'principal': tempPet.principal,
			'id': tempPet.id,
			'species': tempPet.species,
			'breed': tempPet.breed,
			'size': e.target.size.value,
			'age': e.target.age.value,
			'preferences': e.target.details.value
		};

		updatePet(updatedPet)
			.then(() => {
				window.location.href = '/#/pet-page';
			});
	}

	render() {
		return (
			<Card className='center' style={{marginTop: 80}}>
				<CardTitle style={{marginTop: 15}}>Current pet details:</CardTitle>

				<CardBody>
					<CardText>Pet Name: {this.state.pet.name} </CardText>
					<CardText>Species: {this.state.pet.species} </CardText>
					<CardText>Breed: {this.state.pet.breed} </CardText>
					<CardText>Size: {this.state.pet.size} </CardText>
					<CardText>Age: {this.state.pet.age} </CardText>
					<CardText>Pet Preferences: {this.state.pet.preferences} </CardText>
				</CardBody>

				<Form name="form" onSubmit={this.handleSubmit.bind(this)}>
					<Row form>
						<Col md={6}>
							<FormGroup>
								<Label for="size">Size</Label>
								<Input type="text" name="size"
									   placeholder={this.state.pet.size}
									   defaultValue={this.state.pet.size} />
							</FormGroup>
						</Col>
						<Col md={6}>
							<FormGroup>
								<Label for="age">Age</Label>
								<Input type="text" name="age"
									   placeholder={this.state.pet.age}
									   defaultValue={this.state.pet.age} />
							</FormGroup>
						</Col>
					</Row>
					<Row>
						<Col md={12}>
							<FormGroup>
								<Label for="details">Pet Preferences</Label>
								<Input type="text" name="details"
									   placeholder={this.state.pet.preferences}
									   defaultValue={this.state.pet.preferences} />
							</FormGroup>
						</Col>
					</Row>

					<div className="center">
						<Button>Submit Changes</Button>&nbsp;
						<Button href='/#/pet-page'>Cancel</Button>
					</div>
				</Form>
			</Card>
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