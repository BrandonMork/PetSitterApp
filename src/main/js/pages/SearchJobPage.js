import React from 'react';
import connect from 'react-redux/es/connect/connect';
import * as Users from 'js/utils/Users';
import {
    ReactiveBase,
    DataSearch,
    ResultList
} from '@appbaseio/reactivesearch';
import '../../styles/pageStyles.css';
import {Button, Container} from 'reactstrap';
import {getJob} from '../utils/Users';
import Cookie from 'universal-cookie';
import PropTypes from 'prop-types';
import {updateJobDetails} from 'js/utils/Users';

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
		getJob(res.jobID)
			.then(function (response) {
				console.log('user has clicked acceptJob button');
				console.log(response);
				response.accepted = 'yes';
				response.sitterPrincipal = sitterInfo;
				myCookie.set('currentJob', response, {path: '/'});
				console.log(response);
				updateJobDetails(response);
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
						onData={(res)=>({
							'title': res.zip,
							'description': (
								<div>
									<p>Start Date: {res.startDate}</p>
									<p>End Date: {res.endDate}</p>
									<Button onClick={ (e) => this.acceptJob(e, res)}>Accept Job</Button>
									<Button onClick={ (e) => this.reviewJob(e, res)}>Review Job</Button>
								</div>
							),
						})}
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