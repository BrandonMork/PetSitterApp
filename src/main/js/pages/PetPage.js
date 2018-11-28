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
				console.log('user has clicked editPet button');
				console.log(response);
				myCookie.set('currentPet', response, {path: '/'});
			})
			.catch(function (error) {
				console.log(error);
			});
		this.context.router.history.push('/edit-pet-page');
	};

	handleDeletePet = (e, name) => {
		e.preventDefault();
		deletePet(this.props.user.principal, name);
		this.forceUpdate();
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

/* Ended up using a more traditional method for our list. Keeping for future reference.

	<ReactiveBase
		app='pet-info'
		url='https://rceiwx2ja6:k8akj8q570@yew-1307964.us-east-1.bonsaisearch.net'
	>
		<div className="cardStyle">
			<ReactiveList
				componentId='results'
				dataField='Pets'
				pagination={true}
				showResultStats={false}
				paginationAt='bottom'
				defaultQuery={() => ({
					match: {
						principal: this.props.user.principal.valueOf()
					}
				})}
				onData={(res) =>
					<React.Fragment key={uuidv4()}>
						<br/>
						<Col sm='8'>
							<Card className="center">
								<br/>
								<CardTitle>{res.name}</CardTitle>
								<CardBody>
									Species: {res.species}
									<br/>
									ID: {res.id}
									<br/>
									Breed: {res.breed}
									<br/>
									Age: {res.age}
									<br/>
									Size: {res.size}
									<br/>
									<Button onClick={(e) => this.editPet(res.name,e)}>Edit Pet</Button>
									<br/>
									<br/>
									<Button onClick={(e) => this.deletePet(res.name, e)}>Delete Pet</Button>
								</CardBody>
							</Card>
						</Col>
					</React.Fragment>
				}
			/>
		</div>
	</ReactiveBase>
 */