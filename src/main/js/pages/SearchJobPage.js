import _ from 'lodash';
import React from 'react';
import {
	ListGroupItem,
	ListGroup,
	Button,
	Card,
} from 'reactstrap';
import {
    ReactiveBase,
    ReactiveList,
    DataSearch,
} from '@appbaseio/reactivesearch';
import * as Users from 'js/utils/Users';
import PropTypes from 'prop-types';
import Cookie from 'universal-cookie';
import connect from 'react-redux/es/connect/connect';
import uuidv4 from 'uuid/v4';
import '../../styles/pageStyles.css';

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
		Users.getJob(res.jobID)
			.then(function (response) {
				myCookie.set('currentJob', response, {path: '/'});

				response.accepted = 'yes';
				response.sitterPrincipal = sitterInfo;
				notification = {
					'senderPrincipal': sitterInfo,
					'receiverPrincipal': res.ownerPrincipal,
					'message': sitterInfo + ' has accepted your job!',
					'read': 'no'
				};

				Users.updateJobDetails(response);
				Users.createNotification(notification);
				window.location.href = '/#/accept-job-page';
			})
			.catch(function (error) {
				console.log(error);
			});

	};

	reviewJob = (e, res) => {
		e.preventDefault();

		Users.getJob(res.jobID)
			.then(function (response) {
				const myCookie = new Cookie();
				myCookie.set('currentJob', response, {path: '/'});
				window.location.href = '/#/review-job-page';
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	render() {
		return (
			<Card style={{padding: 10, marginTop: 80}}>
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

					<ListGroup style={{marginTop: 10}}>
						<ReactiveList
							componentId='results'
							dataField='original_title'
							showResultStats={false}
							react={{
								and: ['mainSearch']
							}}
							onData={(res) =>
								<React.Fragment key={uuidv4()}>
									{console.log(res)}
									{_.isEqual(res.accepted, 'no') &&
									<ListGroupItem style={{justifyContent: 'center', alignItems: 'center'}}>
										<div style={{float: 'right'}}>
												<Button style={{marginBottom: 5}} size='sm' onClick={ (e) => this.acceptJob(e, res)}>
													Accept Job
												</Button>
												<br/>
												<Button size='sm' onClick={ (e) => this.reviewJob(e, res)}>
													Review Job
												</Button>
										</div>
										<h4>Posting by: {res.ownerPrincipal}</h4>
										<div>Start Date: {res.startDate}</div>
										<div>End Date: {res.endDate}</div>
										<div>Approximate Location: {res.zip}</div>
									</ListGroupItem>}
								</React.Fragment>
							}
						/>
					</ListGroup>
				</ReactiveBase>
			</Card>
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