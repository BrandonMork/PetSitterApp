import _ from 'lodash';
import React from 'react';
import connect from 'react-redux/es/connect/connect';
import * as Users from 'js/utils/Users';
import { ReactiveBase, ResultList } from '@appbaseio/reactivesearch';
import {Card, CardBody, CardText, CardTitle, Container} from 'reactstrap';
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
			<Container style={{marginTop: 100}}>

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
						<ResultList
							componentId='results'
							dataField='original_title'
							defaultQuery={this.ownerQuery}
							react={{
								'and': ['mainSearch']
							}}
							onData={(res)=>
								<React.Fragment key={res.jobID}>
									<Card>
										<CardTitle>{res.jobID}</CardTitle>
										<CardBody>
											<CardText>
												Picked up by: {_.isDefined(res.sitterPrincipal) && res.sitterPrincipal}
											</CardText>
										</CardBody>
									</Card>
								</React.Fragment>
							}
						/>
				</ReactiveBase>}

				<Card className="center">
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
					<ResultList
						componentId='results'
						dataField='original_title'
						defaultQuery={this.sitterQuery}
						react={{
							'and': ['mainSearch']
						}}
						onData={(res)=>
							<React.Fragment key={res.jobID}>
								<Card>
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