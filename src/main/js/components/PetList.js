import React from 'react';
import * as Users from 'js/utils/Users';
import * as ReduxForm from 'redux-form';
import connect from 'react-redux/es/connect/connect';
import _ from 'lodash';
import {Button, Col, Row, Container} from 'reactstrap';
import '../../styles/pageStyles.css';

class PetList extends React.Component {

	constructor(props){
		super(props);
		this.props.fetchPets(this.props.user.principal);
	}

	handleAddPet(name) {
		console.log(name);
	}

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
									<Button onClick={this.handleAddPet(pet.name)}>Add</Button>
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