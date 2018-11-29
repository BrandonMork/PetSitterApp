import _ from 'lodash';
import React from 'react';
import {
	Button,
	Card,
	CardBody,
	CardTitle,
	Col,
	Container,
	Form,
	FormGroup,
	Input,
	Label,
	Row,
	Table
} from 'reactstrap';
import { getOnePet } from 'js/utils/Users';
import { deletePet } from 'js/utils/Users';
import { registerPet } from 'js/utils/Users';
import * as Users from 'js/utils/Users';
import * as ReduxForm from 'redux-form';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import Cookie from 'universal-cookie';
import '../../styles/pageStyles.css';

/* @TODO Need to make the component reload whenever we add a pet... still haven't been able to do that */
class PetPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			newPet: null,
		};

		this.props.fetchPets(this.props.user.principal);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleDeletePet = this.handleDeletePet.bind(this);
	}

	handleSubmit = (e) => {
		e.preventDefault();
		this.setState({
			newPet: {
				principal: this.props.user.principal,
				name: e.target.name.value,
				species: e.target.species.value,
				breed: e.target.breed.value,
				size: e.target.size.value,
				age: e.target.age.value,
				preferences: e.target.details.value
			}},
			() => {
				console.log(this.state.newPet);
				registerPet(this.state.newPet)
					.then(() => {
						window.location.reload();
					});
			});
	};

	handleEditPet = (e, name) => {
		e.preventDefault();
		const myCookie = new Cookie();
		getOnePet(this.props.user.principal, name)
			.then(function (response) {
				myCookie.set('currentPet', response, {path: '/'});
				window.location.href = '/#/edit-pet-page';
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	handleDeletePet = (e, name) => {
		e.preventDefault();
		deletePet(this.props.user.principal, name)
			.then(() => {
				window.location.reload();
			});
	};

	render() {
		return (
			<div style={{marginTop: 100, marginBottom: 50}}>
				<Card style={{padding: 15}}>
					<CardTitle className="center">Add a new pet?</CardTitle>
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
									<Label for="details">Other Details</Label>
									<Input type="textarea" name="details"
										   placeholder="Enter any details about your furry friend!
													   Dietary restrictions, health conditions, special care
													   instructions, food preferences, etc." />
								</FormGroup>
							</Col>
						</Row>
						<div className="center">
							<Button>Add Pet</Button>
						</div>
					</Form>

					<CardTitle className="center" style={{marginTop: 20}}>Your pets:</CardTitle>
					<CardBody>
						<Container fluid>
							<Table responsive striped hover style={{
								margin: 10,
								borderColor: 'black',
								border: 5
							}}>
								{_.isEqual(this.props.elasticPets.length, 0) &&
								<thead>
								<tr>
									<th>Nothing here!</th>
								</tr>
								</thead>}
								
								{!_.isEqual(this.props.elasticPets.length, 0) &&
								<React.Fragment>
									<thead>
									<tr>
										<th>Pet ID</th>
										<th>Pet Name</th>
										<th> </th>
										<th> </th>
									</tr>
									</thead>
									<tbody>
									{ _.isDefined(this.props.elasticPets) &&
									this.props.elasticPets.map(pet => (
										<tr key={pet.id}>
											<th scope="row">{pet.id}</th>
											<td>{pet.name}</td>
											<td><Button onClick={ (e) => this.handleEditPet(e, pet.name)}>Edit Pet</Button></td>
											<td><Button onClick={ (e) => this.handleDeletePet(e, pet.name)}>Delete Pet</Button></td>
										</tr>
									))}
									</tbody>
								</React.Fragment>}
							</Table>
						</Container>
					</CardBody>
				</Card>
			</div>
		);
	}
}

PetPage.contextTypes = {
	router: PropTypes.object.isRequired,
	addPet: PropTypes.func
};

PetPage = ReduxForm.reduxForm({form: 'elasticPets'})(PetPage);

PetPage = connect(
	state => ({
		elasticPets: Users.State.getPets(state),
		user: Users.State.getUser(state),
	}),
	dispatch => ({
		fetchPets: (principal) => dispatch(Users.Actions.getPets(principal)),
		authenticate: (principal, password) => dispatch(Users.Actions.authenticate(principal, password))
	})
)(PetPage);

export default PetPage;
