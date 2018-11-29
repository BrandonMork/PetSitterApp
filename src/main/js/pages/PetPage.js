import React from 'react';
import connect from 'react-redux/es/connect/connect';
import * as Users from 'js/utils/Users';
import {Button, Card, CardBody, CardTitle, Container, Table} from 'reactstrap';
import AddPetForm from 'js/components/forms/AddPetForm';
import '../../styles/pageStyles.css';
import _ from 'lodash';
import Cookie from 'universal-cookie';
import {getOnePet} from 'js/utils/Users';
import {deletePet} from 'js/utils/Users';
import PropTypes from 'prop-types';
import * as ReduxForm from 'redux-form';

class PetPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			pets: [],
		};

		this.props.fetchPets(this.props.user.principal);
	}

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
		deletePet(this.props.user.principal, name);
	};

	render() {
		return (
			<div style={{marginTop: 100, marginBottom: 50}}>
				<AddPetForm/>
				<Card style={{marginTop: 20}}>
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
