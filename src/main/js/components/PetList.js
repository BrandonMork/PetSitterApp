import React from 'react';
import * as Users from 'js/utils/Users';
import * as ReduxForm from 'redux-form';
import connect from 'react-redux/es/connect/connect';
import _ from 'lodash';
import {Button} from 'js/alloy/bessemer/components';
import {Col, Row} from 'reactstrap';

const style = {
	margin: '10px'
};

class PetList extends React.Component {
	constructor(props){
		super(props);
		this.props.fetchPets(this.props.user.principal);
	}

	updatePets() {
		this.props.fetchPets(this.props.user.principal);
	}

	render() {
		return (
			<Col className="PetList">
				<button type={'button'} className="btn btn-primary" onClick={this.updatePets.bind(this)}>Update Pets</button>

				{ _.isDefined(this.props.elasticPets) &&
					this.props.elasticPets.map(pet => (
						<Row key={pet.id} style={style}>
							<Button>{pet.name}</Button>
						</Row>
					))
				}
			</Col>
		);
	}
}

//BRANDON WAS HERE
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