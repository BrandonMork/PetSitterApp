import React from 'react';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';

class PetListItem extends React.Component {

	deletePet(id) {
		this.props.onDelete(id);
	}

	editPet(id) {
		this.props.onEdit(id);
	}

	render() {
		return (
			<React.Fragment>
				<li className="PetList">
					[ID: {this.props.pet.id}] <strong>{this.props.pet.name}</strong> ({this.props.pet.type}) &nbsp;&nbsp;
					<Button color="info" size="sm"
							onClick={this.editPet.bind(this, this.props.pet.id)}>Edit</Button> &nbsp;&nbsp;
					<Button color="danger" size="sm"
							onClick={this.deletePet.bind(this, this.props.pet.id)}>Delete</Button>
				</li>
				<br/>
			</React.Fragment>
		);
	}
}

PetListItem.propTypes = {
	pets: PropTypes.array,
	onDelete: PropTypes.func,
	onEdit: PropTypes.func
};

export default PetListItem;