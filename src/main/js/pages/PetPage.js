import React from 'react';
import connect from 'react-redux/es/connect/connect';
import * as Users from 'js/utils/Users';
import NavigationBar from 'js/components/Navbar';
import '../../styles/pageStyles.css';
import {DataSearch, ReactiveBase, ReactiveList} from '@appbaseio/reactivesearch';
import {Card, CardBody, CardTitle, Col} from 'reactstrap';
import {Button} from 'js/alloy/bessemer/components';


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

						<AddPetForm/>
						<ReactiveBase
							app='pet-info'
							url='https://rceiwx2ja6:k8akj8q570@yew-1307964.us-east-1.bonsaisearch.net'
						>
							<ReactiveList
								componentId='results'
								dataField='Pets'
								pagination={true}
								paginationAt="bottom"
								onData={(res) =>
									<React.Fragment>
										<Col sm="8">
											<Card>
												<br/>
												<CardTitle className="center">{res.name}</CardTitle>
												<CardBody>
													{res.id}
													<Button>Edit Pet</Button>
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

/**
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

 */