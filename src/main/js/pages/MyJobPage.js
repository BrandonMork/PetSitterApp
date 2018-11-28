import _ from 'lodash';
import React from 'react';
import connect from 'react-redux/es/connect/connect';
import * as Users from 'js/utils/Users';
import { ReactiveBase, ReactiveList } from '@appbaseio/reactivesearch';
import { Card, CardBody, CardText, CardTitle } from 'reactstrap';
import uuidv4 from 'uuid/v4';
import '../../styles/pageStyles.css';

class MyJobPage extends React.Component {

	ownerQuery = () => {
		return {
			'match': { 'ownerPrincipal': this.props.user.principal.valueOf() }
		};
	};

	sitterQuery = () => {
		return {
			'match': { 'sitterPrincipal': this.props.user.principal.valueOf() }
		};
	};

	render() {
		return (
			<div style={{marginTop: 100}}>

				<Card className="center">
					<CardTitle style={{padding: 15}}>
						Jobs you've posted:
					</CardTitle>
				</Card>

				{(_.isEqual(this.props.user.userType, 'Owner') ||
					_.isEqual(this.props.user.userType, 'Both')) &&
				<ReactiveBase
					app='job-info'
					url='https://rceiwx2ja6:k8akj8q570@yew-1307964.us-east-1.bonsaisearch.net'
				>
					{console.log('Job\'s you have POSTED:')}

					<ReactiveList
						componentId='results'
						dataField='original_title'
						defaultQuery={this.ownerQuery}
						onData={(res)=>
							<React.Fragment key={uuidv4()}>
								{console.log(res)}
								<Card className="center" body outline style={{marginBottom: 10}}>
									<CardTitle>{res.jobID}</CardTitle>
									<CardBody>
										<CardText>
											Picked up by: {res.sitterPrincipal}
										</CardText>
									</CardBody>
								</Card>
							</React.Fragment>
						}
						/>
				</ReactiveBase>}

				<Card className="center" style={{marginTop: 80}}>
					<CardTitle style={{padding: 15}}>
						Jobs you've picked up:
					</CardTitle>
				</Card>

				{(_.isEqual(this.props.user.userType, 'Sitter') ||
					_.isEqual(this.props.user.userType, 'Both')) &&
				<ReactiveBase
					app='job-info'
					url='https://rceiwx2ja6:k8akj8q570@yew-1307964.us-east-1.bonsaisearch.net'
				>
					{console.log('Job\'s you have p UP:')}
					<ReactiveList
						componentId='results'
						dataField='original_title'
						defaultQuery={this.sitterQuery}
						onData={(res)=>
							<React.Fragment key={uuidv4()}>
								<Card className="center" body outline style={{marginBottom: 10}}>
									{console.log(res)}
									<CardTitle>{res.jobID}</CardTitle>
									<CardBody>
										<CardText>
											Picked up by: {_.isDefined(res.ownerPrincipal) && res.ownerPrincipal}
										</CardText>
									</CardBody>
								</Card>
							</React.Fragment>
						}
					/>
				</ReactiveBase>}

			</div>
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