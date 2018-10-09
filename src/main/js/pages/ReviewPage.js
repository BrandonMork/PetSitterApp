import React from 'react';
import _ from 'lodash';
import connect from 'react-redux/es/connect/connect';
import * as Users from 'js/utils/Users';

class ReviewPage extends React.Component {
	render() {
		return (
			<div className="container padded">
				This a page where you review a user!

				{ _.isDefined(this.props.authentication) &&
				<div>{this.props.authentication['access_token']}</div>
				}

				{ _.isDefined(this.props.user) &&
				<div>Welcome, {this.props.user.principal}!</div>
				}
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