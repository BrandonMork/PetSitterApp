import React from 'react';
import _ from 'lodash';
import { DataSearch, ReactiveBase, ReactiveList, SingleRange, SelectedFilters } from '@appbaseio/reactivesearch';
import connect from 'react-redux/es/connect/connect';
import * as Users from '../utils/Users';
import {Button, Card, CardText, CardTitle, Col, Container, Row} from 'reactstrap';
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
			<Card style={{padding: 10, marginTop: 80, marginBottom: 30}}>
				<ReactiveBase
					app='petfinder-users'
					url='https://rceiwx2ja6:k8akj8q570@yew-1307964.us-east-1.bonsaisearch.net'
				>

					<DataSearch
						componentId='mainSearch'
						dataField={['user.principal', 'user.principal.search',
							'user.firstName', 'user.firstName.search',
							'user.lastName', 'user.lastName.search',
							'user.zip', 'user.zip.search']}
						queryFormat='and'
						iconPosition='left'
						placeholder='Search by name, email, zip...'
					/>

					<Container style={{marginTop: 15}}>
						<Row>
							<Col lg={3} md={4} sm={12}>
								<SingleRange
									componentId='ratingsFilter'
									dataField='user.rating'
									showRadio={true}
									title='Sitter Ratings'
									data={[
										{ start: 0, end: 5, label: 'All sitters' },
										{ start: 4, end: 5, label: '★★★★ & up' },
										{ start: 3, end: 5, label: '★★★ & up' },
										{ start: 2, end: 5, label: '★★ & up' },
										{ start: 1, end: 5, label: '★ & up' }
									]}
									react={{
										and: 'mainSearch'
									}}
								/>
							</Col>

							<Col lg={9} md={8} sm={12}>
								<SelectedFilters style={{ marginBottom: 10 }}
									showClearAll={true}
									clearAllLabel="Clear filters"
								/>

								<ReactiveList
									componentId='results'
									dataField='Sitters'
									showResultStats={false}
									size={500}
									react={{
										and: ['mainSearch', 'ratingsFilter']
									}}

									onData={(res) =>
										<React.Fragment key={uuidv4()}>
											{_.isDefined(res.user) &&
											(_.isEqual(res.user.userType, 'Sitter') ||
												_.isEqual(res.user.userType, 'Both')) &&
											<Card className='center' body outline style={{marginBottom: 10}}>
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
												<Button onClick={ (e) => this.handleViewProfile(e, res.user.principal)} color = 'secondary'>
													View Profile
												</Button>
											</Card>
											}
										</React.Fragment>
									}
								/>
							</Col>
						</Row>
					</Container>
				</ReactiveBase>
			</Card>
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