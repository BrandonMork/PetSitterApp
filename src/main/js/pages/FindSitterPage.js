import React from 'react';
import _ from 'lodash';
import { ReactiveBase, ReactiveList } from '@appbaseio/reactivesearch';
import connect from 'react-redux/es/connect/connect';
import * as Users from 'js/utils/Users';
import {Button, Card, CardText, CardTitle} from 'reactstrap';
import uuidv4 from 'uuid/v4';
import Cookie from 'universal-cookie';
import {getSitterInfo} from 'js/utils/Users';
import PropTypes from 'prop-types';

class FindSitterPage extends React.Component {

	constructor(props){
		super(props);
	}

	handleViewProfile = (e, principal) => {
		e.preventDefault();
		const myCookie = new Cookie();
		getSitterInfo(principal)
			.then(function (response) {
				myCookie.set('sitterProfile', response, {path: '/'});
			})
			.catch(function (error) {
				console.log(error);
			});
		this.context.router.history.push('/view-sitter-page');
	};

	render() {
		return (
			<div style={{marginTop: 80, marginBottom: 30}}>
				<ReactiveBase
					app='petfinder-users'
					url='https://rceiwx2ja6:k8akj8q570@yew-1307964.us-east-1.bonsaisearch.net'
				>
					<ReactiveList
						componentId='results'
						dataField='Sitters'
						showResultStats={false}
						size={500}
						onData={(res) =>
							<React.Fragment key={uuidv4()}>
								{_.isDefined(res.user) &&
								(_.isEqual(res.user.userType, 'Sitter') ||
								 _.isEqual(res.user.userType, 'Both')) &&
								<Card className="center" body outline style={{marginBottom: 10}}>
									<CardTitle>{res.user.firstName} {res.user.lastName}</CardTitle>
									<CardText>
										<br/>
										Email: {res.user.principal}
										<br/>
										Location: {res.user.zip}
										<br/>
										Phone: {res.user.phoneNumber}
										<br/>
										{/** @TODO Need to add actual user ratings here once we start to capture them */}
										Average Rating : ★★★★★
									</CardText>
									<Button onClick={ (e) => this.handleViewProfile(e, res.user.principal)}
											color = "secondary">View Profile</Button>
								</Card>
								}
							</React.Fragment>
						}
					/>
				</ReactiveBase>
			</div>
		);
	}
}

FindSitterPage.contextTypes = {
	router: PropTypes.object.isRequired,
};

FindSitterPage = connect(
	state => ({
		authentication: Users.State.getAuthentication(state),
		user: Users.State.getUser(state)
	})
)(FindSitterPage);

export default FindSitterPage;