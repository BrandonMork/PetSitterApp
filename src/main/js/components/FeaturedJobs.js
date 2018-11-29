import React from 'react';
import {ReactiveBase, ResultCard} from '@appbaseio/reactivesearch';
import profile_pic from 'js/profile_pic.jpg';
import {Button, Card, CardText, CardTitle} from 'reactstrap';
import * as Users from 'js/utils/Users';
import Cookie from 'universal-cookie';

class FeaturedJobs extends React.Component {

	reviewJob = (e, res) => {
		e.preventDefault();

		Users.getJob(res.jobID)
			.then(function (response) {
				const myCookie = new Cookie();
				myCookie.set('currentJob', response, {path: '/'});
				window.location.href = '/#/accept-job-page';
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	render() {
		return (
			<React.Fragment>
			<div className='center'>
				<Card style={{width: '50vh', marginBottom: 15, padding: 15}}>
					<CardTitle>
						Here are some of our featured jobs for the day!
					</CardTitle>
					<CardText>
						These jobs are close their start date and have yet to be picked up!
						We need some great people to pick them up before they expire!
					</CardText>
					<Card body inverse color='danger' className='center'>
						<div style={{fontWeight: 'bold'}}>
							ReFur will pay you an extra 25% for picking up any of these jobs!
						</div>
					</Card>
				</Card>
			</div>

			<ReactiveBase
				app='job-info'
				url='https://rceiwx2ja6:k8akj8q570@yew-1307964.us-east-1.bonsaisearch.net'
			>
				<ResultCard
					componentId='results'
					dataField='Jobs'
					size={6}
					pagination
					target={'_blank'}
					showResultStats={false}
					defaultQuery={this.jobQuery}
					onData={(res) => {
						return {
							image: profile_pic,
							title: `Posting by: ${res.ownerPrincipal}`,
							description: (
								<div>
									<div>Start Date: {res.startDate}</div>
									<div>End Date: {res.endDate}</div>
									<div>Asking Price: ${res.maxPay}</div>
									<div>Approximate Location: {res.zip}</div>
									<div className="center">
										<Button size='sm' onClick={ (e) => this.reviewJob(e, res)}>
											View Job Details
										</Button>
									</div>
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

export default FeaturedJobs;