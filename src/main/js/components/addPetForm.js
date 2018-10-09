import React from 'react';
import * as Bessemer from 'js/alloy/bessemer/components';
import * as ReduxForm from 'redux-form';
import connect from 'react-redux/es/connect/connect';
import {addPet} from 'js/pet';

class AddPetForm extends React.Component {
	onSubmit = ({principal, type}) => {
		return this.props.addPet(principal, type);
	};

	render() {
		let { handleSubmit } = this.props;

		// Use Principal to reflect our backend (Principal == UserName)
		// Accesses UserAuthenticationDto (UAD->Password + UAD->UserDao->Principal)
		// @TODO Figure out how to index on Elasticsearch
		return (
			<form name="addPet" onSubmit={handleSubmit(form => this.onSubmit(form))}>
				<Bessemer.Field name="petname" friendlyName="Pet Name" />

				<Bessemer.Field name="type" friendlyName="Pet Type" />

				<div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}} className="center">
					<Bessemer.Button>Add Pet</Bessemer.Button>
				</div>
			</form>
		);
	}
}

AddPetForm = ReduxForm.reduxForm({form: 'addpet'})(AddPetForm);
AddPetForm = connect(
	dispatch => ({
		addPet: pet => addPet(pet)
	})
)(AddPetForm);

export { AddPetForm };