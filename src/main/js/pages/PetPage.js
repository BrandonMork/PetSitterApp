import React from 'react';
import connect from 'react-redux/es/connect/connect';
import * as Users from 'js/utils/Users';
import PetList from 'js/components/PetList';
import AddPetForm from 'js/components/AddPetForm';
import uuidv4 from 'uuid/v4';
import { Card, CardTitle, CardBody, Col } from 'reactstrap';
import NavigationBar from 'js/components/Navbar';
import Background from '../../resources/images/dogs_background.jpg';

const pageStyle = {
	backgroundSize: 'cover',
	backgroundImage: 'url(' + Background + ')',
	backgroundPosition: 'center',
	/*
	background-repeat: no-repeat;
background-attachment: fixed;
	*/
	backgroundAttachment: 'scroll',
	height: '100%',
};
const pageContent = {
	opacity: '0.8',
};
const center = {
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
};

const testStyle = {
	height: '1000px'
};

class PetPage extends React.Component {

	constructor() {
		super();

		this.state = {
			pets: [],
		};
	}

	componentWillMount() {
		this.getPets();
	}

	getPets() {
		// This is where we will call our data store via elasticsearch
		this.setState({pets: [
			{
				id: uuidv4(),
				name: 'rex',
				type: 'Dog',
			},
			{
				id: uuidv4(),
				name: 'chico',
				type: 'Cat'
			},
		]});
	}

	componentDidMount() {
		this.getPets();
	}

	handleAddPet(pet) {
		let pets = this.state.pets;
		pets.push(pet);
		this.setState({pets: pets});

		/* this should add pet to UserPet */
        // this.registerPet(pet);
	}

	handleDeletePet(id) {
		let pets = this.state.pets;
		let index = pets.findIndex(x => x.id === id);
		pets.splice(index, 1);
		this.setState({pets: pets});


	}

	handleEditPet(id) {
		console.log('Editing ' + id);
	}

	render() {
		return (
			<div style={pageStyle}>
				<div className="container padding">
					<div style={pageContent}>
						<div>
							<NavigationBar/>
						</div>
						<br/>

						<div style={center}>
							<Col sm="12">
								<Card>
									<br/>
									<CardTitle style={center}>{this.props.user.principal}'s pets:</CardTitle>
									<CardBody>
										<div> I am a {this.props.user.type} </div>
										<PetList pets={this.state.pets}
												 onDelete={this.handleDeletePet.bind(this)}
												 onEdit={this.handleEditPet.bind(this)}/>

										<br/>

										<AddPetForm addPet={this.handleAddPet.bind(this)}/>

										This will be pets retrieved from elasticsearch! <br/>

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