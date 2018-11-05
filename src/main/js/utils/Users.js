import axios from 'axios';
import Cookie from 'universal-cookie';

// Makes API call to our register function in the back-end
export function register(user) {
	console.log(user);
	return axios.post('/api/user/register', user);
}

export function registerPet(pet, user){

	let newPet = {
		'principal': user.principal,
		'name': pet.name
	};

	return axios.post('/api/pets/add-pet', newPet)
		.then(function (response) {
			console.log(response);
		})
		.catch(function (error) {
			console.log(error);
		});
}

export function getPets(principal){
	console.log(principal);
	return axios.get('/api/pets/get-pets/' + principal);
}

export function postJob(job){
	console.log('this is from the axios call, this is the job object');
	console.log(job);
	return axios.post('api/jobs/post-job' , job)

		.then(function (response) {
			console.log(response);
		})
		.catch(function (error) {
			console.log(error);
		});
}

export function updateUser(user){
	//console.log('we are now calling an axios post');
	let newUser = {
		'user': {
			'principal': user.principal,
			'firstName': user.firstName,
			'middleName': user.middleName,
			'lastName': user.lastName,
			'addressLine1': user.addressLine1,
			'addressLine2': user.addressLine2,
			'state': user.state,
			'zip': user.zip,
			'phoneNumber': user.phoneNumber,
			'type': user.type,
			'pets': [],
			'roles': [
				'ROLE_USER',
			],
		}
	};

	return axios.post('/api/user/update-user/', newUser)
		.then(function (response) {
			console.log(response);
		})
		.catch(function (error) {
			console.log(error);
		});
}

export function authenticate(username, password) {
	return axios(
		{
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
		}
	);
}

export function getUserDetails() {
	return axios.get('/api/user');
}

let State = {};

State.getAuthentication = state => {
	return state.authentication;
};

State.getUser = state => {
	return state.user;
};

State.getPets = state => {
	return state.pets;
};

export { State };

let Actions = {};

Actions.Types = {
	SET_AUTHENTICATION: 'SET_AUTHENTICATION',
	SET_USER: 'SET_USER',
	SET_PETS: 'SET_PETS'
};

Actions.getPets = principal => {
	return (dispatch) => {
		return getPets(principal).then((pets) => {
			return dispatch(Actions.setPets(pets));
		});
	};
};

Actions.register = user => {
	return (dispatch) => {
		return register(user).then(() => {
			return dispatch(Actions.authenticate(user.principal, user.password));
		});
	};
};

Actions.authenticate = (username, password) => {
	return (dispatch) => {
		return authenticate(username, password).then(
			authentication => {
				dispatch(Actions.setAuthentication(authentication));

				return getUserDetails().then(user => {
					dispatch(Actions.setUser(user));
				});
			}
		);
	};
};

Actions.getUserDetails = () => {
	return (dispatch) => {
		getUserDetails().then(user => {
			console.log('I am updating to the newest user!!');
			console.log(user);
			dispatch(Actions.setUser(user));
		});
	};
};

Actions.logout = () => {
	return (dispatch) => {
		dispatch(Actions.setAuthentication(null));
		dispatch(Actions.setUser(null));
		dispatch(Actions.setPets(null));
	};
};

Actions.setAuthentication = authentication => {
	// Setting our cookies for auth token
	const myCookie = new Cookie();
	myCookie.set('authentication', authentication, {path: '/'});

	return {type: Actions.Types.SET_AUTHENTICATION, authentication};
};

Actions.setPets = pets => {
	return {type: Actions.Types.SET_PETS, pets};
};

Actions.setUser = user => {
	// Setting our cookies for current user
	const myCookie = new Cookie();
	myCookie.set('user', user, {path: '/'});

	return {type: Actions.Types.SET_USER, user};
};

export { Actions };

let Reducers = {};

Reducers.authentication = (authentication = null, action) => {
	switch (action.type) {
		case Actions.Types.SET_AUTHENTICATION: {
			return action.authentication;
		}
		default: {
			return authentication;
		}
	}
};

Reducers.user = (user = null, action) => {
	switch (action.type) {
		case Actions.Types.SET_USER: {
			return action.user;
		}
		default: {
			return user;
		}
	}
};

Reducers.pets = (pets = [], action) => {
	switch (action.type) {
		case Actions.Types.SET_PETS: {
			return action.pets;
		}
		default: {
			return pets;
		}
	}
};


export { Reducers };