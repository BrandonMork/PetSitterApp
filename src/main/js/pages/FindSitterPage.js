import React from 'react';
import _ from 'lodash';
import NavigationBar from 'js/components/Navbar';
import { ReactiveBase, ReactiveList } from '@appbaseio/reactivesearch';
import connect from 'react-redux/es/connect/connect';
import * as Users from 'js/utils/Users';
import {Button, Card, CardText, CardTitle} from 'reactstrap';
import uuidv4 from 'uuid/v4';

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
						showResultStats={false}
						size={500}
						onData={(res) =>
							<React.Fragment key={uuidv4()}>
								{_.isDefined(res.user) &&
								_.isEqual(res.user.type, 'Sitter') &&
								<Card className="center" body outline color="info">
									<CardTitle>{res.user.firstName} {res.user.lastName}</CardTitle>
									<CardText>
										<br/>
										Email: {res.user.principal}
										<br/>
										Location: {res.user.zip}
										<br/>
										Phone: {res.user.phoneNumber}
										<br/>
										Average Rating : ★★★★★
									</CardText>
									<Button color="secondary">View Profile</Button>
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

FindSitterPage = connect(
	state => ({
		authentication: Users.State.getAuthentication(state),
		user: Users.State.getUser(state)
	})
)(FindSitterPage);

export default FindSitterPage;