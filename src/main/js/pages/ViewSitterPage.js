import React from 'react';
import connect from 'react-redux/es/connect/connect';
import * as Users from '../utils/Users';
import Cookie from 'universal-cookie';
import profile_pic from '../profile_pic.jpg';
import {Card, CardBody, CardTitle, Col, CardText, CardImg, Button} from 'reactstrap';

class ViewSitterPage extends React.Component {
	constructor(props){
		super(props);

		const myCookie = new Cookie();
		const currentSitter = myCookie.get('sitterProfile');

		console.log(currentSitter);
		this.state = {
			sitter: currentSitter,
		};
	}

	render() {
		return (
			<div className='center' style={{marginTop: 80}}>
				<Card>
					<CardTitle className="center">{this.state.sitter.firstName} {this.state.sitter.lastName}</CardTitle>
					<CardImg top src={profile_pic} />
					<CardBody>
						<CardText>Average Rating: {this.state.sitter.avgRating} ({this.state.sitter.numRatings} total ratings)</CardText>
						<CardText>City: {this.state.sitter.city}</CardText>
						<CardText>State: {this.state.sitter.state}</CardText>
						<CardText>Zip: {this.state.sitter.zip} </CardText>
						<CardTitle>Would you like to contact this sitter?</CardTitle>
						<CardText>Phone Number: {this.state.sitter.phoneNumber} </CardText>
						<CardText>Email: {this.state.sitter.principal} </CardText>

						<Button href="#/find-sitter">Find other awesome sitters!</Button>
					</CardBody>
				</Card>
			</div>
		);
	}
}


ViewSitterPage = connect(
	state => ({
		authentication: Users.State.getAuthentication(state),
		user: Users.State.getUser(state)
	})
)(ViewSitterPage);

export default ViewSitterPage;