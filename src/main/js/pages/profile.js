import React from 'react';
import connect from 'react-redux/es/connect/connect';
import * as Users from 'js/users';
//import PetList from 'js/components/petList';

class ProfilePage extends React.Component {
	render() {
	    let petList;
		return (

			<div>

			    <div>
			        Welcome to your profile {this.props.user.principal}!
                    <br/><br/>
                    Let's see if you have any pets!
                    <br/><br/>
                     Insert reactive form here to curl elastisearch
                </div>


			</div>
		);
	}
}

//make sure user is logged in
ProfilePage = connect(
	state => ({
		authentication: Users.State.getAuthentication(state),
		user: Users.State.getUser(state)
	})
)(ProfilePage);

export default ProfilePage;