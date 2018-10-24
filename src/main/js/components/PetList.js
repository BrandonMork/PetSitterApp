import React from 'react';
import * as Users from 'js/utils/Users';
import * as ReduxForm from 'redux-form';
import connect from 'react-redux/es/connect/connect';
import _ from 'lodash';

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
			<div className="PetList">
				<button type={'button'} className="btn btn-primary" onClick={this.updatePets.bind(this)}>Update Pets</button>

				{ _.isDefined(this.props.elasticPets) &&
					this.props.elasticPets.map(pet => (
						<div key={pet.id}>
							<p>{pet.name}</p>
						</div>
					))
				}
			</div>
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