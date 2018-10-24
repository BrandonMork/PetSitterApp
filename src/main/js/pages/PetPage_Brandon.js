import axios from 'axios';
import React from 'react';
import addPetForm from 'js/components/AddPetForm';

// Makes API call to our register function in the back-end
export function addPet(name, type) {
	return axios(
		{
			method: 'post',
			url: '/api/pets/add-pet',
			params: {
				name,
				type
			}
		}
	);
}

class PetPageBrandon extends React.Component {
	render() {
		return (
			<div>
                Add a pet here!
                <br/>
                <addPetForm />
                The form must be bad
			</div>
		);
	}
}

export default PetPageBrandon;

export function getPetDetails(id) {
	return axios.get('/api/pet/'+id);
}

let State = {};

State.getPet = state => {
	return state.pet;
};

export { State };

let Actions = {};

Actions.Types = {
	SET_TYPES: 'SET_TYPES',
	SET_NAME: 'SET_NAME'
};

Actions.addPet = pet => {
	return addPet(pet.name, pet.type);
};

Actions.setType = category => {
	return {type: Actions.Types.SET_TYPES, category};
};

Actions.setUser = pet => {
	return {type: Actions.Types.SET_NAME, pet};
};

export { Actions };

let Reducers = {};

Reducers.pet = (pet = null, action) => {
	switch (action.type) {
		case Actions.Types.SET_NAME: {
			return action.pet;
		}
		default: {
			return pet;
		}
	}
};

export { Reducers };

