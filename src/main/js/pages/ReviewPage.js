import React from 'react';
import connect from 'react-redux/es/connect/connect';
import * as Users from 'js/utils/Users';

class ReviewPage extends React.Component {
	render() {
		return (
            <div>
				<p>Review Page</p>
            </div>
		);
	}
}

ReviewPage = connect(
	state => ({
		authentication: Users.State.getAuthentication(state),
		user: Users.State.getUser(state)
	})
)(ReviewPage);

export default ReviewPage;