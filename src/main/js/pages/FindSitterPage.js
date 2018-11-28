import React from 'react';
import _ from 'lodash';
import { ReactiveBase, ReactiveList } from '@appbaseio/reactivesearch';
import connect from 'react-redux/es/connect/connect';
import * as Users from '../utils/Users';
import {Button, Card, CardText, CardTitle} from 'reactstrap';
import uuidv4 from 'uuid/v4';
import Cookie from 'universal-cookie';
import {getSitterInfo} from '../utils/Users';
import PropTypes from 'prop-types';

class FindSitterPage extends React.Component {

	handleViewProfile = (e, principal) => {
		e.preventDefault();
		const myCookie = new Cookie();
		getSitterInfo(principal)
			.then(function (response) {
				myCookie.set('sitterProfile', response, {path: '/'});
				window.location.href = '/#/view-sitter-page';
			})
			.catch(function (error) {
				console.log(error);
			});
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
                                    {_.gt(res.user.numRatings, 0) &&
                                    <CardText>
                                        <br/>
                                        Email: {res.user.principal}
                                        <br/>
                                        Location: {res.user.zip}
                                        <br/>
                                        Phone: {res.user.phoneNumber}
                                        <br/>
                                        Average Rating: {res.user.sumRatings / res.user.numRatings}
										<br/>
                                        Number of Ratings: ({res.user.numRatings})
                                    </CardText>
                                    }

                                    {_.isEqual(res.user.numRatings, 0) &&
                                    <CardText>
                                        <br/>
                                        Email: {res.user.principal}
                                        <br/>
                                        Location: {res.user.zip}
                                        <br/>
                                        Phone: {res.user.phoneNumber}
                                        <br/>
                                        No Reviews yet!
                                    </CardText>
                                    }
									<Button onClick={ (e) => this.handleViewProfile(e, res.user.principal)} color = "secondary">
										View Profile
									</Button>
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