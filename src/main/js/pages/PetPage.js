import React from 'react';
import connect from 'react-redux/es/connect/connect';
import * as Users from 'js/utils/Users';
import PetList from 'js/components/PetList';
import AddPetForm from 'js/components/forms/AddPetForm';
import { Card, CardTitle, CardBody, Col } from 'reactstrap';
import NavigationBar from 'js/components/Navbar';
import '../../styles/pageStyles.css';

class PetPage extends React.Component {

	constructor() {
		super();

		this.state = {
			pets: [],
		};
	}

	// @TODO we need to make sure we update the state of the pets
	handleAddPet = pet => {
		let pets = this.state.pets;
		pets.push(pet);
		this.setState({pets: pets});
		window.location.reload();
	};

	render() {
		return (
			<div className="pageContainer">
				<div className="container padding">
					<div className="pageContent">
						<div>
							<NavigationBar/>
						</div>
						<br/>
						<div className="center">
							<Col sm="12">
								<Card>
									<br/>
									<CardTitle className="center">{this.props.user.principal}'s pets:</CardTitle>
									<CardBody>
										<PetList/>
										<br/>
										<AddPetForm addPet={this.handleAddPet}/>
									</CardBody>
								</Card>
							</Col>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

PetPage = connect(
	state => ({
		authentication: Users.State.getAuthentication(state),
		user: Users.State.getUser(state)
	})
)(PetPage);

export default PetPage;