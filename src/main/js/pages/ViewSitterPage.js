import React from 'react';
import connect from 'react-redux/es/connect/connect';
import * as Users from 'js/utils/Users';
import Cookie from 'universal-cookie';
import profile_pic from '../profile_pic.jpg';
import {Card, CardBody, CardTitle, Col, CardText, CardImg} from 'reactstrap';
import PropTypes from 'prop-types';
import LoginForm from 'js/components/forms/LoginForm';

// @TODO Mario make this look pretty pls
class ViewSitterPage extends React.Component {
	constructor(props){
		super(props);
	}
	
	getCurrentSitter() {
		const myCookie = new Cookie();
		const currentSitter = myCookie.get('sitterProfile');
		return <React.Fragment>
			<Col sm='8' >
				<Card>
					<CardTitle>{'Please review the information about the pet!'} </CardTitle>
					<CardImg top width="25%" src={profile_pic} />
					<CardBody>
						<CardText>{'First Name: ' + currentSitter.firstName} </CardText>
						<CardText>{'Last Name: ' + currentSitter.lastName} </CardText>
						<CardText>{'City: ' + currentSitter.city} </CardText>
						<CardText>{'Zip: ' + currentSitter.zip} </CardText>
						<CardText>{'Phone Number ' + currentSitter.phoneNumber} </CardText>
					</CardBody>
				</Card>
			</Col>
		</React.Fragment>;
	}

	getCookieInfo(){
		const myCookie = new Cookie();
		const currentSitter = myCookie.get('sitterProfile');
		return currentSitter;
	}

	render() {
		return (
			<div className='pageContainer'>
				<div className='container padding'>
					<div className='pageContent'>
						<div>
							<div>
								<this.getCurrentSitter />
							</div>
						</div>
					</div>
				</div>
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