import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { reducer as formReducer } from 'redux-form';
import * as Users from './utils/Users';
import * as Utils from './alloy/utils/core-utils';
import Cookie from 'universal-cookie';
import Index from './index';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios';
import 'styles/main.scss';

const reducers = [
	{form: formReducer},
	Users.Reducers
];

const myCookie = new Cookie();
const reducer = Utils.combineReducers(reducers);

/* Initializing our Redux (data) store */
const store = createStore(reducer, {
	authentication: myCookie.get('authentication'),
	user: myCookie.get('user')
}, applyMiddleware(thunkMiddleware, createLogger()));

/* Sets default headers for calls for debuggers for us to use on things like Chrome or Firefox. */
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.put['Content-Type'] = 'application/json';

/* Every Axios requests requires us to have a valid authentication token on our client */
axios.interceptors.request.use(request => {
	let authentication = Users.State.getAuthentication(store.getState());
	if(_.isDefined(authentication)) {
		request.headers.common['Authorization'] = 'Bearer ' + authentication['access_token'];
	}
	return request;
}, error => Promise.reject(error));

axios.interceptors.response.use(response => response.data, error => Promise.reject(error));

/* 'Node' where our app will be mounted to */
const mountNode = document.querySelector('#main');

/**
 * Our app will be mounted to the root here (replaces the Index.html
 * of an app created via create-react-app
 *
 * Notice that the entire app is wrapped around our Provider, this
 * is where Redux does its thing to provide the entire app 'global'
 * access to certain states and functions
 */
ReactDOM.render(<Provider store={store}><Index /></Provider>, mountNode);