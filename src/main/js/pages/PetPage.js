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
import uuidv4 from 'uuid/v4';

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

		//this will get the pet that will be edited
		let oldPet;
		let newPEt;
		getOnePet(this.props.user.principal.valueOf(), id)
			.then(function (response) {
				console.log('did this work?');
				console.log(response);
				oldPet = response;
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	deletePet(id, e) {
		console.log('Deleting pet');
		console.log(id);
	}

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
							<div className="cardStyle">
								<ReactiveList
									componentId='results'
									dataField='Pets'
									pagination={true}
									showResultStats={false}
									paginationAt='bottom'
									defaultQuery={() => ({
										match: {
											principal: this.props.user.principal.valueOf()
										}
									})}
									onData={(res) =>
										<React.Fragment key={uuidv4()}>
											<br/>
											<Col sm='8'>
												<Card className="center">
													<br/>
													<CardTitle>{res.name}</CardTitle>
													<CardBody>
														Species: {res.species}
														<br/>
														ID: {res.id}
														<br/>
														Breed: {res.breed}
														<br/>
														Age: {res.age}
														<br/>
														Size: {res.size}
														<br/>
														<Button onClick={(e) => this.editPet(res.id,e)}>Edit Pet</Button>
														<br/>
														<br/>
														<Button onClick={(e) => this.deletePet(res.id, e)}>Delete Pet</Button>
													</CardBody>
												</Card>
											</Col>
										</React.Fragment>
									}
								/>
							</div>
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