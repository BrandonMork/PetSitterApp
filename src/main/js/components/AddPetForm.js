import React from 'react';
import uuidv4 from 'uuid/v4';
import PropTypes from 'prop-types';
import {registerPet} from 'js/utils/Users';
import connect from 'react-redux/es/connect/connect';
import * as Users from 'js/utils/Users';

class AddPetForm extends React.Component {

	constructor() {
		super();
		this.state = {
			newPet: {}
		};
	}

	static defaultProps = {
		types: ['Dog', 'Cat', 'Bird', 'Rabbit', 'Mouse']
	};

	handleSubmit(e) {
		// Debug
		if (this.refs.name.value === '') {
			alert('Pet name is required!');
		} else {
			this.setState({newPet: {
				id: uuidv4(),
				name: this.refs.name.value,
			}}, function() {
				//console.log(this.state);
				this.props.addPet(this.state.newPet);
				//console.log(this.state.newPet);
				registerPet(this.state.newPet, this.props.user);
			});
		}
		e.preventDefault();
	}

	render() {
		let typeOptions = this.props.types.map(type => {
			return <option key={type} value={type}>{type}</option>;
		});

		return (
			<div>
				<h3>Add New Pet</h3>
				<form onSubmit={this.handleSubmit.bind(this)}>
					<div>
						<label>Pet Name</label>
						<input type="text" ref="name"/>
					</div>

					<div>
						<label>Pet Type</label> <br/>
						<select ref="type">
							{typeOptions}
						</select>
					</div>

					<input type="submit" value="Submit"/>

				</form>
			</div>
		);
	}
}

AddPetForm.propTypes = {
	addPet: PropTypes.func
};

AddPetForm = connect(
	state => ({
		authentication: Users.State.getAuthentication(state),
		user: Users.State.getUser(state)
	})
)(AddPetForm);

export default AddPetForm;