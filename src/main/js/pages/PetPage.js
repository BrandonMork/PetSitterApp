import React from 'react';
import connect from 'react-redux/es/connect/connect';
import * as Users from 'js/utils/Users';
import NavigationBar from 'js/components/Navbar';
import '../../styles/pageStyles.css';
import {ReactiveBase, ReactiveList} from '@appbaseio/reactivesearch';
import {Card, CardBody, CardTitle, Col} from 'reactstrap';
import {Button} from 'js/alloy/bessemer/components';
import AddPetForm from 'js/components/forms/AddPetForm';
import {getOnePet} from 'js/utils/Users';

class PetPage extends React.Component {

	constructor() {
		super();

		this.state = {
			pets: [],
		};
	}

	editPet(id, e){
		e.preventDefault();
		console.log('Im going to edit this pet! ' + id);

		let oldPet = getOnePet(id);
		console.log('old pet -> ' + oldPet.toString());
	}

	// @TODO we need to make sure we update the state of the pets
	handleAddPet = pet => {
		let pets = this.state.pets;
		pets.push(pet);
		this.setState({pets: pets});
		window.location.reload();
	};

	customQuery = function() {
		console.log('Returning pets belonging to ' + this.props.user.principal.valueOf());
		return {
			'match': { 'principal': this.props.user.principal.valueOf() }
		};
	};

	render() {

		return (
			<div className='pageContainer'>
				<div className='container padding'>
					<div className='pageContent'>
						<div>
							<NavigationBar/>
						</div>
						<br/>
						<AddPetForm/>
						<ReactiveBase
							app='pet-info'
							url='https://rceiwx2ja6:k8akj8q570@yew-1307964.us-east-1.bonsaisearch.net'
						>
							<ReactiveList
								componentId='results'
								dataField='Pets'
								pagination={true}
								paginationAt='bottom'
								defaultQuery={() => ({
									match: {
										principal: this.props.user.principal.valueOf()
									}
								})}
								onData={(res) =>
									<React.Fragment>
										<Col sm='8'>
											<Card>
												<br/>
												<CardTitle>{res.name}</CardTitle>
												<CardBody>
													{res.id}
													<br/>
													<Button onClick={(e) => this.editPet(res.id,e)}>Edit Pet</Button>
													<br/>
													<br/>
													<Button>Delete Pet</Button>
												</CardBody>
											</Card>
										</Col>
										<br/>
									</React.Fragment>
								}
							/>
						</ReactiveBase>
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