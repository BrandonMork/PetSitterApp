import _ from 'lodash';
import React from 'react';
import {
	Container,
	NavLink,
	Button,
	Table,
} from 'reactstrap';
import { getOnePet } from 'js/utils/Users';
import * as Users from 'js/utils/Users';
import * as ReduxForm from 'redux-form';
import PropTypes from 'prop-types';
import Cookie from 'universal-cookie';
import connect from 'react-redux/es/connect/connect';
import '../../styles/pageStyles.css';

class PetListAdd extends React.Component {

	constructor(props){
		super(props);
		this.props.fetchPets(this.props.user.principal);
	}

	handleAddPet = (e, name) => {
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

	render() {
		return (
			<React.Fragment>
				<Container fluid>
					<Table responsive striped hover style={{
						margin: 10,
						borderColor: 'black',
						border: 5
					}}>
						{_.isEqual(this.props.elasticPets.length, 0) &&
						<React.Fragment>
							<thead>
							<tr>
								<th>You don't have any pets!</th>
							</tr>
							</thead>
							<tbody>
								<tr>
									<td><NavLink href="#/add-pet">Add A New Pet</NavLink></td>
								</tr>
							</tbody>
						</React.Fragment>
						}

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
									<td><Button onClick={ (e) => this.handleAddPet(e, pet.name)}>Add Pet</Button></td>
								</tr>
							))}
							</tbody>
						</React.Fragment>}
					</Table>
				</Container>
			</React.Fragment>
		);
	}
}

PetListAdd.contextTypes = {
	router: PropTypes.object.isRequired,

};

PetListAdd = ReduxForm.reduxForm({form: 'elasticPets'})(PetListAdd);

PetListAdd = connect(
	state => ({
		elasticPets: Users.State.getPets(state),
		user: Users.State.getUser(state),
	}),
	dispatch => ({
		fetchPets: (principal) => dispatch(Users.Actions.getPets(principal)),
		authenticate: (principal, password) => dispatch(Users.Actions.authenticate(principal, password))
	})
)(PetListAdd);

export default PetListAdd;