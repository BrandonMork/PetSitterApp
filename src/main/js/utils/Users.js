import axios from 'axios';
import Cookie from 'universal-cookie';

// Makes API call to our register function in the back-end
export function register(user) {
	console.log('IN onSubmit() VIA Users.register():');
	console.log(user);
	return axios.post('/api/user/register', user);
}

export function registerPet(pet){

	return axios.post('/api/pets/add-pet', pet)
		.then(function (response) {
			console.log(response);
		})
		.catch(function (error) {
			console.log(error);
		});
}

export function getPets(principal){
	console.log(principal);
	console.log('GETTING PETS AGAIN!!!');
	return axios.get('/api/pets/get-pets/' + principal);
}

//used for editing pet
export function getOnePet(principal, name){
	console.log('In the User.js with ' + name + ' with principal ' + principal);

	return axios.get('/api/pets/' + principal + '/' + name);
}

export function updatePet(pet){
	return axios.post('/api/pets/edit-pet/', pet);
}

export function deletePet(principal, name){
	console.log(name);
	return axios.post('/api/pets/delete-pet/' + principal + '/' + name);
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

export function getJob(id){
	console.log('getting a job with id ' + id);
	return axios.get('api/jobs/get-job/' + id);
}

export function updateJobDetails(frontEndJob){
	let backEndJob;
	getJob(frontEndJob.jobID)
		.then(function (response) {
			backEndJob = response;
			console.log('this is what backendJob looks like');
			console.log(backEndJob);

			let job = {
				'id': backEndJob.id,
				'jobID': backEndJob.jobID,
				'ownerPrincipal': backEndJob.ownerPrincipal,
				'sitterPrincipal': backEndJob.sitterPrincipal,
				'pets': backEndJob.pets,
				'startDate': backEndJob.startDate,
				'endDate': backEndJob.endDate,
				'maxPay': backEndJob.maxPay,
				'addressLine1': backEndJob.addressLine1,
				'addressLine2': backEndJob.addressLine2,
				'city': backEndJob.city,
				'state': backEndJob.state,
				'zip': backEndJob.zip,
				'accepted': backEndJob.accepted
			};

			if(job.sitterPrincipal == null && frontEndJob.sitterPrincipal != null)
				job.sitterPrincipal = frontEndJob.sitterPrincipal;
			if(job.accepted == null && frontEndJob.accepted != null)
				job.accepted = frontEndJob.accepted;

			console.log('this should send an accepted job to back end');
			console.log(job);

			return axios.post('api/jobs/post-job' , job);
		})
		.catch(function (error) {
			console.log(error);
		});
}

export function updateUser(user){
	//console.log('we are now calling an axios post');
	let newUser = {
		'principal': user.principal,
		'firstName': user.firstName,
		'middleName': user.middleName,
		'lastName': user.lastName,
		'addressLine1': user.addressLine1,
		'addressLine2': user.addressLine2,
		'state': user.state,
		'zip': user.zip,
		'phoneNumber': user.phoneNumber,
		'userType': user.userType,
		'password': user.password,
		'sumRatings': user.sumRatings,
		'numRatings': user.numRatings,
	};

	console.log('In updateUse()');
	console.log(newUser);

	let backEndUser = getUserDetails();

	if(newUser.principal != null){
		backEndUser.principal = newUser.principal;
	}
	if(newUser.firstName != null){
		backEndUser.firstName = newUser.firstName;
	}
	if(newUser.middleName != null){
		backEndUser.middleName = newUser.middleName;
	}
	if(newUser.lastName != null){
		backEndUser.lastName = newUser.lastName;
	}
	if(newUser.addressLine1 != null){
		backEndUser.addressLine1 = newUser.addressLine1;
	}
	if(newUser.addressLine2 != null){
		backEndUser.addressLine2 = newUser.addressLine2;
	}
	if(newUser.state != null){
		backEndUser.state = newUser.state;
	}
	if(newUser.zip != null){
		backEndUser.zip = newUser.zip;
	}
	if(newUser.phoneNumber != null){
		backEndUser.phoneNumber = newUser.phoneNumber;
	}
	if(newUser.userType != null){
		backEndUser.userType = newUser.userType;
	}
	if(newUser.password != null){
		backEndUser.password = newUser.password;
	}

	return axios.post('/api/user/update-user/', backEndUser)
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

export function getSitterInfo(principal){
	console.log('trying to get sitter info with principal ' + principal);
	principal = principal.replace('@','%40');
	principal = principal.replace('.','*');
	console.log('trying to get sitter info with principal ' + principal);
	return axios.get('/api/user/sitter/' + principal);
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
			console.log('IN register() VIA Users.Actions:');
			console.log(user);
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