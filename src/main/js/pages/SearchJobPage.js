import React from 'react';
import connect from 'react-redux/es/connect/connect';
import * as Users from 'js/utils/Users';
import {
    ReactiveBase,
    DataSearch,
    ResultList
} from '@appbaseio/reactivesearch';
import '../../styles/pageStyles.css';
import {Button, Col, Container, Row} from 'reactstrap';
import {getJob} from '../utils/Users';
import Cookie from 'universal-cookie';
import PropTypes from 'prop-types';
import {updateJobDetails} from 'js/utils/Users';
import {createNotification} from 'js/utils/Users';
import uuidv4 from 'uuid/v4';

class SearchJobPage extends React.Component {

	constructor(props) {
		super(props);
		this.state = {};
		this.updatedJob = {};
	}

	acceptJob = (e, res) => {
		e.preventDefault();
		const myCookie = new Cookie();
		console.log('the jobID should be');
		console.log(res.jobID);
		let sitterInfo = this.props.user.principal;
		let notification;
		getJob(res.jobID)
			.then(function (response) {
				console.log('user has clicked acceptJob button');
				console.log(response);
				response.accepted = 'yes';
				response.sitterPrincipal = sitterInfo;
				myCookie.set('currentJob', response, {path: '/'});
				console.log(response);
				updateJobDetails(response);

				notification = {
					'senderPrincipal': sitterInfo,
					'receiverPrincipal': res.ownerPrincipal,
					'message': sitterInfo + ' has accepted your job!',
				};

				createNotification(notification);
			})
			.catch(function (error) {
				console.log(error);
			});
		this.context.router.history.push('/accept-job-page');

	};

	reviewJob = (e, res) => {
		e.preventDefault();
		const myCookie = new Cookie();
		getJob(res.jobID)
			.then(function (response) {
				console.log('user has clicked reivewJob button');
				console.log(response);
				myCookie.set('currentJob', response, {path: '/'});
			})
			.catch(function (error) {
				console.log(error);
			});
		this.context.router.history.push('/review-job-page');
	};

	render() {
		return (
			<Container fluid>
				<ReactiveBase
					app='job-info'
					url='https://rceiwx2ja6:k8akj8q570@yew-1307964.us-east-1.bonsaisearch.net'
				>
					<DataSearch
						componentId='mainSearch'
						dataField={['zip', 'zip.search']}
						queryFormat='and'
						iconPosition='left'
					/>
					<ResultList
						componentId='results'
						dataField='original_title'
						react={{
							'and': ['mainSearch']
						}}
						onData={(res) => ({
							description: (
								<React.Fragment key={uuidv4()}>
									<Container style={{justifyContent: 'center', alignItems: 'center'}}>
										<Row>
											<Col>
												<h1>Posting by: {res.ownerPrincipal}</h1>
											</Col>
										</Row>
										<Row>
											<Col>
												Start Date: {res.startDate}
											</Col>
										</Row>
										<Row>
											<Col>
												End Date: {res.endDate}
											</Col>
										</Row>
										<Row>
											<Col>
												Approximate Location: {res.zip}
											</Col>
										</Row>

										<Row>
											<Col sm={{ size: '2', offset: 5 }}>
												<Button onClick={ (e) => this.acceptJob(e, res)}>
													Accept Job
												</Button>
											</Col>
											<Col sm={{ size: '2', offset: 5 }}>
												<Button onClick={ (e) => this.reviewJob(e, res)}>
													Review Job
												</Button>
											</Col>
										</Row>
									</Container>
								</React.Fragment>
							)
							})

						}
					/>
				</ReactiveBase>
			</Container>
		);
	}
}

SearchJobPage.contextTypes = {
	router: PropTypes.object.isRequired,
};

SearchJobPage = connect(
	state => ({
		authentication: Users.State.getAuthentication(state),
		user: Users.State.getUser(state)
	}),
	dispatch => ({
		getUserDetails: () => dispatch(Users.Actions.getUserDetails())
	})
)(SearchJobPage);

export default SearchJobPage;