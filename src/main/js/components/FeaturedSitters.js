import React from 'react';
import {ReactiveBase, ResultCard} from '@appbaseio/reactivesearch';
import profile_pic from 'js/profile_pic.jpg';
import {Button, Card, CardText, CardTitle} from 'reactstrap';


class FeaturedSitters extends React.Component {
	render() {
		return(
			<React.Fragment>
				<div className='center'>
					<Card style={{width: '50vh', marginBottom: 15, padding: 15}}>
						<CardTitle className='center'>
							Here are some of our featured Sitters for the day!
						</CardTitle>
						<CardText>
							These sitters are being recognized for the great
							ratings and community involvement.
						</CardText>

						<Card body inverse color='info'>
							<div style={{fontWeight: 'bold'}}>
								Get a $25 coupon when hiring any of these sitters for a job!
							</div>
						</Card>
					</Card>
				</div>

				<ReactiveBase
					app='petfinder-users'
					url='https://rceiwx2ja6:k8akj8q570@yew-1307964.us-east-1.bonsaisearch.net'
				>
					<ResultCard
						componentId='results'
						dataField='Sitters'
						size={6}
						target={'_blank'}
						showResultStats={false}
						pagination
						defaultQuery={this.sitterQuery}
						onData={(res) => {
							return {
								image: profile_pic,
								title: `${res.user.firstName} ${res.user.lastName}`,
								description: (
									<div>
										<div>Email: {res.user.principal}</div>
										<div>Location: {res.user.zip}</div>
										<div>Phone: {res.user.phoneNumber}</div>
										<Button onClick={ (e) => this.handleViewProfile(e, res.user.principal)} color = 'secondary'>
											View Profile
										</Button>
									</div>
								),
							};
						}}
					/>
				</ReactiveBase>
			</React.Fragment>
		);
	}
}

export default FeaturedSitters;