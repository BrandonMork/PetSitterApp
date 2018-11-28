import React from 'react';
import _ from 'lodash';
import { ReactiveBase, ReactiveList } from '@appbaseio/reactivesearch';
import connect from 'react-redux/es/connect/connect';
import * as Users from '../utils/Users';
import { Card, CardText, CardTitle } from 'reactstrap';
import uuidv4 from 'uuid/v4';
import PropTypes from 'prop-types';
import DropDownForRating from '../components/DropDownForRating.js';

class ReviewPage extends React.Component {

	constructor(props){
		super(props);
		this.select = this.select.bind(this);
		this.state = {
			value: 'Select a Rating',
			shown: 'False'
		};
	}


	select(event){
		this.setState({
			value: event.target.innerText
		});
	}

	handleSubmit = (e) =>{
		e.preventDefault();
		this.setState({
		   shown: 'True'
		});
	};

	render() {
		return (
			<div style={{marginTop: 80, marginBottom: 30}}>
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
								(_.isEqual(res.user.userType, 'Sitter') ||
									_.isEqual(res.user.userType, 'Both')) &&
								<Card className="center" body outline style={{marginBottom: 10}}>
									<CardTitle>{res.user.firstName} {res.user.lastName}</CardTitle>
										<CardText>
											<br/>
											Email: {res.user.principal}
											<br/>
											Location: {res.user.zip}
											<br/>
											Phone: {res.user.phoneNumber}
											<br/>
											Average Ratings: {res.user.sumRatings / res.user.numRatings}
											Number of Ratings: {res.user.numRatings}
										</CardText>
									<br/>
									<div>
										<DropDownForRating user={res}/>
									</div>
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

ReviewPage.contextTypes = {
	router: PropTypes.object.isRequired,
};

ReviewPage = connect(
	state => ({
		authentication: Users.State.getAuthentication(state),
		user: Users.State.getUser(state)
	})
)(ReviewPage);

export default ReviewPage;