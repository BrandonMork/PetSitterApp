import React from 'react';
import * as Users from 'js/utils/Users';
import * as ReduxForm from 'redux-form';
import connect from 'react-redux/es/connect/connect';
import _ from 'lodash';
import {Button, Col, Row, Container, Table} from 'reactstrap';
import '../../styles/pageStyles.css';
import Cookie from 'universal-cookie';
import {getOnePet} from 'js/utils/Users';
import PropTypes from 'prop-types';
import {deletePet} from 'js/utils/Users';

class PetList extends React.Component {

	constructor(props){
		super(props);
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
	};

	render() {
		return (
			<React.Fragment>
				<Container fluid>
					<Table style={{
						margin: 10,
						borderColor: 'black',
						border: 5
					}}>

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
								<tr>
									<th scope="row">{pet.id}</th>
									<td>{pet.name}</td>
									<td><Button onClick={ (e) => this.handleEditPet(e, pet.name)}>Edit Pet</Button></td>
									<td><Button onClick={ (e) => this.handleDeletePet(e, pet.name)}>Delete Pet</Button></td>
								</tr>
							))}
						</tbody>


					</Table>
				</Container>
			</React.Fragment>
		);
	}
}

PetList.contextTypes = {
	router: PropTypes.object.isRequired,

};

PetList = ReduxForm.reduxForm({form: 'elasticPets'})(PetList);

PetList = connect(
	state => ({
		elasticPets: Users.State.getPets(state),
		user: Users.State.getUser(state),
	}),
	dispatch => ({
		fetchPets: (principal) => dispatch(Users.Actions.getPets(principal)),
		authenticate: (principal, password) => dispatch(Users.Actions.authenticate(principal, password))
	})
)(PetList);

export default PetList;