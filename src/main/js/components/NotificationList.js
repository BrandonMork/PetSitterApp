import {ReactiveBase, ReactiveList} from '@appbaseio/reactivesearch';
import React from 'react';
import uuidv4 from 'uuid/v4';
import {
	Button,
	ListGroup,
	ListGroupItem,
	ListGroupItemText,
} from 'reactstrap';
import connect from 'react-redux/es/connect/connect';
import * as Users from 'js/utils/Users';
import {deleteNotification} from 'js/utils/Users';

class NotificationList extends React.Component {

	readNotification(e, res){
		e.preventDefault();
		deleteNotification(res.id, res.notifyID);
		this.setState(this.state);
	}
	query = () => {
		return {
			'bool': {
				'must': [
					{
						'match': {
							'receiverPrincipal': this.props.user.principal.valueOf()
						}
					},
					{
						'match': {
							'read': 'no'
						}
					}
				]
			}
		};
	};

	render() {
		return (
			<ListGroup flush style={{width: 550}}>
				<ReactiveBase
					app='notification-info'
					url='https://rceiwx2ja6:k8akj8q570@yew-1307964.us-east-1.bonsaisearch.net'
				>
					<ReactiveList
						componentId='results'
						dataField='original_title'
						defaultQuery={this.query}
						showResultStats={false}
						onData={(res)=>
							<ListGroupItem action href="#" key={uuidv4()}>
								{console.log(res)}
								<ListGroupItemText style={{width: '100%', fontSize: 13}}>
									{res.message}
									<Button onClick={ (e) => this.readNotification(e, res)} style={{float: 'right'}} size="sm">Mark as Read</Button>
								</ListGroupItemText>
							</ListGroupItem>
						}
					/>
				</ReactiveBase>
			</ListGroup>
		);
	}
}

NotificationList = connect(
	state => ({
		authentication: Users.State.getAuthentication(state),
		user: Users.State.getUser(state)
	})
)(NotificationList);

export default NotificationList;