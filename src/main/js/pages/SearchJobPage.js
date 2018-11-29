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

	reviewJob = (e, res) => {
		e.preventDefault();

		Users.getJob(res.jobID)
			.then(function (response) {
				const myCookie = new Cookie();
				myCookie.set('currentJob', response, {path: '/'});
				window.location.href = '/#/accept-job-page';
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
									{/* Users cannot see/accept their own jobs */}
									{(_.isEqual(res.accepted, 'no') &&
									 !_.isEqual(res.ownerPrincipal, this.props.user.principal)) &&
									<ListGroupItem style={{justifyContent: 'center', alignItems: 'center'}}>
										<div style={{float: 'right'}}>
												<Button size='sm' onClick={ (e) => this.reviewJob(e, res)}>
													View Job Details
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