import React from 'react';
import connect from 'react-redux/es/connect/connect';
import * as Users from 'js/utils/Users';
import {DataSearch, ReactiveBase, ResultList} from '@appbaseio/reactivesearch/lib/index';
import {Button, Container} from 'reactstrap';

class MyJobPage extends React.Component {

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

MyJobPage = connect(
	state => ({
		authentication: Users.State.getAuthentication(state),
		user: Users.State.getUser(state)
	})
)(MyJobPage);

export default MyJobPage;