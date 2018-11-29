import React from 'react';
import {
	ReactiveBase,
	ReactiveList,
} from '@appbaseio/reactivesearch';
import ReviewPage from './ReviewPage.js';
import uuidv4 from 'uuid/v4';

class MainReviewPage extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			jobs: []
		};
	}

	render() {
		return (
			<div style={{marginTop: 80, marginBottom: 30}}>
				<ReactiveBase
					app='job-info'
					url='https://rceiwx2ja6:k8akj8q570@yew-1307964.us-east-1.bonsaisearch.net'
				>
					<ReactiveList
						componentId='results'
						dataField='Jobs'
						showResultStats={false}
						size={500}
						onData={(res) =>
							<React.Fragment key={uuidv4()}>
								{this.state.jobs.push(res)}
							</React.Fragment>
						}
					/>
				</ReactiveBase>
				{console.log(this.state.jobs)}
				<div>
					{/*Testing some different methods for passing in a job at time, doesn't seem to like the whole array at once*/}
					{this.state.jobs.map((job) => <ReviewPage job={job}/>)}
				</div>
			</div>

		);
	}
}

export default MainReviewPage;