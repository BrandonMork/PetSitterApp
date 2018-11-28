import React from 'react';
import PropTypes from 'prop-types';
import {registerPet} from 'js/utils/Users';
import connect from 'react-redux/es/connect/connect';
import * as Users from 'js/utils/Users';
import { Form, Col, Row, FormGroup, Label, Input, Button, Card, CardTitle, CardBody} from 'reactstrap';

class AddPetForm extends React.Component {

	constructor() {
		super();
		this.state = {
			newPet: {}
		};
	}

	handleSubmit(e) {
		e.preventDefault();
		this.setState({
			newPet: {
				pet: {
					principal: this.props.user.principal,
					name: e.target.name.value,
					species: e.target.species.value,
					breed: e.target.breed.value,
					size: e.target.size.value,
					age: e.target.age.value,
				},
			}},
		function() {
			console.log(this.state.newPet.pet);
			registerPet(this.state.newPet.pet);
			window.location.reload();
		});
	}

	render() {
		return (
			<React.Fragment>
				<div className="center">
					<Col sm="8">
						<Card>
							<CardTitle className="center" style={{marginTop: 20}}>Add Pet Form</CardTitle>
							<CardBody>
								<Form name="form" onSubmit={this.handleSubmit.bind(this)}>
									<Row form>
										<Col md={4}>
											<FormGroup>
												<Label for="name">Pet Name</Label>
												<Input type="text" name="name"
													   placeholder="Pet Name"/>
											</FormGroup>
										</Col>
										<Col md={4}>
											<FormGroup>
												<Label for="species">Species</Label>
												<Input type="text" name="species"
													   placeholder="Pet Species"/>
											</FormGroup>
										</Col>
										<Col md={4}>
											<FormGroup>
												<Label for="breed">Breed</Label>
												<Input type="text" name="breed"
													   placeholder="Pet Breed"/>
											</FormGroup>
										</Col>
									</Row>
									<Row>
										<Col md={6}>
											<FormGroup>
												<Label for="age">Age</Label>
												<Input type="text" name="age"
													   placeholder="Pet Age"/>
											</FormGroup>
										</Col>
										<Col md={6}>
											<FormGroup>
												<Label for="size">Size</Label>
												<Input type="text" name="size"
													   placeholder="Pet Size"/>
											</FormGroup>
										</Col>
									</Row>
									<Row>
										<Col>
											<FormGroup>
												<Label for="pet-details">Other Details</Label>
												<Input type="textarea" name="pet-details"
													   placeholder="Enter any details about your furry friend!
													   Dietary restrictions, health conditions, special care
													   instructions, food preferences, etc." />
											</FormGroup>
										</Col>
									</Row>
									<Button>Add Pet</Button>
								</Form>
							</CardBody>
						</Card>
					</Col>
				</div>
			</React.Fragment>
		);
	}
}

AddPetForm.propTypes = {
	addPet: PropTypes.func
};

AddPetForm = connect(
	state => ({
		authentication: Users.State.getAuthentication(state),
		user: Users.State.getUser(state)
	})
)(AddPetForm);

export default AddPetForm;

