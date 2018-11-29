import _ from 'lodash';
import React from 'react';
import connect from 'react-redux/es/connect/connect';
import * as Users from 'js/utils/Users';
import { ReactiveBase, ReactiveList } from '@appbaseio/reactivesearch';
import { Button, Card, ListGroup, ListGroupItem } from 'reactstrap';
import uuidv4 from 'uuid/v4';
import '../../styles/pageStyles.css';
import Cookie from 'universal-cookie';
import {getJob} from 'js/utils/Users';
import {quitJob} from 'js/utils/Users';
import PropTypes from 'prop-types';
import {createNotification} from 'js/utils/Users';


class MyJobPage extends React.Component {

	reviewJob = (e, res) => {
		e.preventDefault();
		const myCookie = new Cookie();
		getJob(res.jobID)
			.then(function (response) {
				myCookie.set('currentJob', response, {path: '/'});
			})
			.catch(function (error) {
				console.log(error);
			});
		this.context.router.history.push('/accept-job-page');
	};

	quitJob = (e, res) => {
		e.preventDefault();
		quitJob(res.jobID, res.id);
		let thisUser = this.props.user.principal;
		let notification1 = {
			'senderPrincipal': thisUser,
			'receiverPrincipal': res.ownerPrincipal,
			'message': thisUser + ' has quit the job!',
			'read': 'no'
		};
		let notification2 = {
			'senderPrincipal': thisUser,
			'receiverPrincipal': res.sitterPrincipal,
			'message': thisUser + ' has quit the job!',
			'read': 'no'
		};

		if(thisUser == res.sitterPrincipal){
			createNotification(notification1);
		}
		else{
			createNotification(notification2);
		}
	};

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
			<Card style={{marginTop: 100, padding: 10}}>
				{(_.isEqual(this.props.user.userType, 'Owner') ||
					_.isEqual(this.props.user.userType, 'Both')) &&
				<ReactiveBase
					app='job-info'
					url='https://rceiwx2ja6:k8akj8q570@yew-1307964.us-east-1.bonsaisearch.net'
				>
					<div className="center" style={{fontSize: 30, fontWeight: 'bold'}}>
						Jobs you've posted:
					</div>

					<ListGroup>
						<ReactiveList
							componentId='results'
							dataField='original_title'
							defaultQuery={this.ownerQuery}
							showResultStats={false}
							onData={(res)=>
								<ListGroupItem style={{width: '100%'}} key={uuidv4()}>
									Picked up by: {res.sitterPrincipal}
									<div style={{float: 'right'}}>
										<Button size='sm' onClick={ (e) => this.reviewJob(e, res)}>Review Job</Button>&nbsp;
										<Button size='sm' onClick={ (e) => this.quitJob(e, res)}>Quit Job</Button>
									</div>
								</ListGroupItem>
							}
						/>
					</ListGroup>
				</ReactiveBase>}

				{(_.isEqual(this.props.user.userType, 'Sitter') ||
					_.isEqual(this.props.user.userType, 'Both')) &&
				<ReactiveBase
					app='job-info'
					url='https://rceiwx2ja6:k8akj8q570@yew-1307964.us-east-1.bonsaisearch.net'
				>
					<div className="center" style={{marginTop: 10, fontSize: 30, fontWeight: 'bold'}}>
						Jobs you've picked up:
					</div>

					<ListGroup>
						<ReactiveList
							componentId='results'
							dataField='original_title'
							defaultQuery={this.sitterQuery}
							showResultStats={false}
							onData={(res)=>
								<ListGroupItem key={uuidv4()}>
									Picked up by: {res.ownerPrincipal}
									<div style={{float: 'right'}}>
										<Button size='sm' onClick={ (e) => this.reviewJob(e, res)}>Review Job</Button>&nbsp;
										<Button size='sm' onClick={ (e) => this.quitJob(e, res)}>Quit Job</Button>
									</div>
								</ListGroupItem>
							}
						/>
					</ListGroup>

				</ReactiveBase>}

			</Card>
		);
	}
}

MyJobPage.contextTypes = {
	router: PropTypes.object.isRequired,
};

MyJobPage = connect(
	state => ({
		authentication: Users.State.getAuthentication(state),
		user: Users.State.getUser(state)
	})
)(MyJobPage);

export default MyJobPage;
