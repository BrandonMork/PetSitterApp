import React from 'react';
import _ from 'lodash';
import connect from 'react-redux/es/connect/connect';
import * as Users from 'js/utils/Users';
import NavigationBar from 'js/components/Navbar';

class ReviewPage extends React.Component {
	render() {
		return (
            <div className='pageContainer'>
                <div className='container padding'>
                    <div className='pageContent'>
                        <div>
                            <NavigationBar/>
                        </div>
                    </div>
                </div>
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