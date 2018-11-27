import React from 'react';
import connect from 'react-redux/es/connect/connect';
import * as Users from 'js/utils/Users';
import { Card, CardBody, CardTitle } from 'reactstrap';
import AddPetForm from 'js/components/forms/AddPetForm';
import PetList from 'js/components/PetList';
import '../../styles/pageStyles.css';

class PetPage extends React.Component {
	constructor() {
		super();

		this.state = {
			pets: [],
		};
	}

	render() {
		return (
			<div style={{marginTop: 100, marginBottom: 50}}>
				<AddPetForm/>
				<Card style={{marginTop: 20}}>
					<CardTitle className="center">Your pets:</CardTitle>
					<CardBody>
						<PetList/>
					</CardBody>
				</Card>
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

/* Ended up using a more traditional method for our list. Keeping for future reference.

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
									<Button onClick={(e) => this.editPet(res.name,e)}>Edit Pet</Button>
									<br/>
									<br/>
									<Button onClick={(e) => this.deletePet(res.name, e)}>Delete Pet</Button>
								</CardBody>
							</Card>
						</Col>
					</React.Fragment>
				}
			/>
		</div>
	</ReactiveBase>
 */