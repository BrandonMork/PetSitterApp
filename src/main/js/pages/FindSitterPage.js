import React from 'react';
import _ from 'lodash';
import NavigationBar from 'js/components/Navbar';
import {DataSearch, ReactiveBase, ReactiveList} from '@appbaseio/reactivesearch';
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
					<ReactiveList
						componentId='results'
						dataField='Sitters'
						pagination={true}
						paginationAt="bottom"
						onData={(res) =>
							<React.Fragment>
								<div>{_.isDefined(res.user) && _.isEqual(res.user.type, 'Sitter') ? res.user.principal : 'NOT A SITTER'}</div>
							</React.Fragment>
						}
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