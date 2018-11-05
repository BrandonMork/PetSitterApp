import React, { Component } from 'react';
import axios from 'axios';

const UserContext = React.createContext();

export class UserProvider extends Component {

	state = {
		// Basic User Profile Information
		principal: '',
		firstName: '',
		middleName: '',
		lastName: '',
		addressLine1: '',
		addressLine2: '',
		state: '',
		zip: '',
		phoneNumber: '',
		type: '',

		// Other Types of User Information
		authentication: 0
	};

	render() {
		return(
			<UserContext.Provider value={{

				// Values: (via State)
				state: this.state,

				// Functions:

				register: user => {
					return axios.post('/api/user/register', user);
				},
				
				updateUser: user => this.setState({
					principal: user.principal,
					firstName: user.firstName,
					middleName: user.middleName,
					lastName: user.lastName,
					addressLine1: user.addressLine1,
					addressLine2: user.addressLine2,
					state: user.state,
					zip: user.zip,
					phoneNumber: user.phoneNumber,
					type: user.type
				}),

				authenticate: (username, password) => {
					return axios({
						method: 'post',
						url: '/oauth/token',
						params: {
							'grant_type': 'password',
							username,
							password
						},
						auth: {
							username: 'rceiwx2ja6',
							password: 'k8akj8q570'
						}
					})
				},


			}}>
				{this.props.children}
			</UserContext.Provider>
		);
	}

}

export const UserConsumer = UserContext.Consumer;