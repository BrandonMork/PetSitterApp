import React from 'react';
import _ from 'lodash';
import connect from 'react-redux/es/connect/connect';
import * as Users from 'js/utils/Users';
import NavigationBar from 'js/components/Navbar';
import Cookie from 'universal-cookie';

// @TODO Mario make this look pretty pls
class AcceptJobPage extends React.Component {
	getCurrentJob() {
		const myCookie = new Cookie();
		const currentJob = myCookie.get('currentJob');
		return <React.Fragment>
			Job ID: {currentJob.id}
			<br/>
			Pet name: {currentJob.pets}
			<br/>
			Address Line 1: {currentJob.addressLine1}
			<br/>
			Address Line 2: {currentJob.addressLine2}
			<br/>
			City: {currentJob.city}
			<br/>
			State: {currentJob.state}
			<br/>
			Zip: {currentJob.zip}
			<br/>
			Start Date: {currentJob.startDate}
			<br/>
			End Date: {currentJob.endDate}
		</React.Fragment>;
	}

	render() {
		return (
			<div className='pageContainer'>
				<div className='container padding'>
					<div className='pageContent'>
						<div>
							<NavigationBar/>
							<div>
								<p>
									<this.getCurrentJob />
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

AcceptJobPage = connect(
	state => ({
		authentication: Users.State.getAuthentication(state),
		user: Users.State.getUser(state)
	})
)(AcceptJobPage);

export default AcceptJobPage;
