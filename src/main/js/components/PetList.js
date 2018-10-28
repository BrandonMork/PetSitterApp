import React from 'react';
import * as Users from 'js/utils/Users';
import * as ReduxForm from 'redux-form';
import connect from 'react-redux/es/connect/connect';
import _ from 'lodash';
import {Table, Button} from 'reactstrap';

class PetList extends React.Component {

	constructor(props){
		super(props);
		this.props.fetchPets(this.props.user.principal);
	}

	render() {
		return (
			<React.Fragment>
				<Table responsive hover dark>
					<thead>
					<tr>
						<th>Pet Name</th>
					</tr>
					</thead>
					<tbody>
					{ _.isDefined(this.props.elasticPets) &&
					this.props.elasticPets.map(pet => (
						<React.Fragment key={pet.id}>
							<tr>
								<td>{pet.name}</td>
								<td><Button>Edit</Button></td>
							</tr>
						</React.Fragment>
					))
					}
					</tbody>
				</Table>
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