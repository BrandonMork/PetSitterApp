import React from 'react';
import PetListItem from './petListItem';
import PropTypes from 'prop-types'; // ES6

class PetList extends React.Component {

	deletePet(id) {
		this.props.onDelete(id);
	}

	editPet(id) {
		this.props.onEdit(id);
	}

	render() {
		let petListItems;
		if(this.props.pets) {
			petListItems = this.props.pets.map(pet => {
				return (
					<PetListItem onEdit={this.editPet.bind(this)}
								 onDelete={this.deletePet.bind(this)}
								 key={pet.id} pet={pet} />
				);
			});
		}

		return (
			<div className="PetList">
				{petListItems}
			</div>
		);
	}
}

// Generally Good Practice to ensure proper data types
PetList.propTypes = {
	pets: PropTypes.array,
	onDelete: PropTypes.func,
	onEdit: PropTypes.func
};

export default PetList;