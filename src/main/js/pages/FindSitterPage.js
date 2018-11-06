import React from 'react';
import NavigationBar from 'js/components/Navbar';
import {DataSearch, ReactiveBase, ResultCard} from '@appbaseio/reactivesearch';
import connect from 'react-redux/es/connect/connect';
import * as Users from 'js/utils/Users';

class FindSitterPage extends React.Component {
	render() {
		return (
			<div>

				<div>
					<NavigationBar/>
				</div>
				<br/>

				<ReactiveBase
					app='petfinder-users'
					url='https://rceiwx2ja6:k8akj8q570@yew-1307964.us-east-1.bonsaisearch.net'
				>
					<DataSearch
						dataField='mainSearch'
						componentId='mainSearch'
						customQuery={ (value,props) => {
							console.log('Test');
							console.log(value,props);
							return {
								'query': {
									'nested': {
										'path': 'user',
										'query': {
											'bool': {
												'must': [
													{ 'match': { 'user.type':  value }}
												]
											}
										}
									}
								}
							};
						}}
						iconPosition='left'
					/>

					<ResultCard
						componentId='results'
						dataField='original_title'
						react={{
							'and': ['mainSearch']
						}}
						onData={(res)=>({
							'title': res.user.principal,
							'description':  res.user.type
						})}
					/>

				</ReactiveBase>
			</div>
		);
	}
}

FindSitterPage = connect(
	state => ({
		authentication: Users.State.getAuthentication(state),
		user: Users.State.getUser(state)
	})
)(FindSitterPage);

export default FindSitterPage;