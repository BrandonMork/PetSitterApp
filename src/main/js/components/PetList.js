import React from 'react';
import * as Users from 'js/utils/Users';
import * as ReduxForm from 'redux-form';
import connect from 'react-redux/es/connect/connect';
import _ from 'lodash';
import {Button, Col, Row, Container} from 'reactstrap';
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

	handleDeletePet = (e, name) => {
		e.preventDefault();
		deletePet(this.props.user.principal, name);
	};

	render() {
		return (
			<React.Fragment>
				<Container fluid>
					<Row style={{
						margin: 10,
						borderColor: 'black',
						border: 5
					}}>
						{ _.isDefined(this.props.elasticPets) &&
						this.props.elasticPets.map(pet => (
							<React.Fragment key={pet.id}>
								<Col className="darkColumn" md={3}>
									<p>{pet.name}</p>
									<Button onClick={ (e) => this.handleAddPet(e, pet.name)}>Edit Pet</Button>
									<Button onClick={ (e) => this.handleDeletePet(e, pet.name)}>Delete Pet</Button>
								</Col>
							</React.Fragment>
						))
						}
					</Row>
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