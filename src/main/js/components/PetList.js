import React from 'react';
import * as Users from 'js/utils/Users';
import * as ReduxForm from 'redux-form';
import connect from 'react-redux/es/connect/connect'; // ES6
import _ from 'lodash';

class PetList extends React.Component {
	constructor(props){
		super(props);
		this.props.fetchPets(this.props.user.principal);
	}

	updatePets() {
		this.props.fetchPets(this.props.user.principal);
	}

	deletePet(id) {
		this.props.onDelete(id);
	}

	editPet(id) {
		this.props.onEdit(id);
	}
		/* 		let pets = this.props.user.getPets().map(); */
	render() {
		let petListItems;
		// if(this.props.pets) {
		// 	petListItems = this.props.pets.map(pet => {
		// 		return (
		// 			<PetListItem onEdit={this.editPet.bind(this)}
		// 						 onDelete={this.deletePet.bind(this)}
		// 						 key={pet.id} pet={pet} />
		// 		);
		// 	});
		// }
		return (
			<div className="PetList">
				<button type={'button'} className="btn btn-primary" onClick={this.updatePets.bind(this)}>Update Pets</button>

				{ _.isDefined(this.props.elasticPets) &&
					this.props.elasticPets.map(pet => (
						<div key={pet.name}>
							<p>{pet.name}</p>
						</div>
					))
				}
			</div>
		);

		// // if(this.props.elasticPets) {
		// // 	petListItems = this.props.elasticPets.map(pet => {
		// // 		return (
		// // 			<PetListItem onEdit={this.editPet.bind(this)}
		// // 						 onDelete={this.deletePet.bind(this)}
		// // 						 key={pet.id} pet={pet} />
		// // 		);
		// // 	});
		// // }
		//
		// return (
		// 	<div className="PetList">
		// 		{petListItems}
		// 	</div>
		// );
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