/**
 *
 *	Action creators that affect the organization section of the store. Holds
 *	organization info, client's account info, list of all users in organization.
 *
 *  Some async action creaters have a seemingly illogical syntax of 
 *		asyncServerCall()
 *			.then(res => res, err => handleError())			// where handleError does not return a value
 *			.then(res => if (res) handleSuccess())
 *
 *	as opposed to a more intuitive
 *		asyncServerCall()
 *			.then(res => handleSuccess())
 *			.catch(err => handleError())
 *
 *	This is because catch would be called both for an HTTP error and an error incurred anywhere
 *	down the line after we we call handleSuccess. This could lead to a large number of errors
 *	occurring/subsequently cascading and should be avoided.
 *
**/


import { browserHistory } from 'react-router';

import ApiCall from '../utils/serverCalls';


//--------------------------------------
//							Utils
//--------------------------------------

// messages to be dispatched to UI section of store. key prefixes c, d, u => create, delete, update. key postfixes E, S => error, success
const messages = {
	400: { user: 'Sorry, both that organization name and username are taken' },
	401: { user: 'Sorry, that organization name is taken' },
	403: { user: 'Sorry, that username is taken' },
	cUserE: { user: 'Unable to create user' },
	cUserS: { user: 'User successfully created' },
	dUserE: { user: 'Unable to delete user' },
	dUserS: { user: 'User successfully deleted' },
	loginE: { user: 'Invalid username/password' },
	uPassE: { password: 'Unable to change password' },
	uPassS: { password: 'Password successfully changed' },
	uUserE: { user: 'Unable to Change Permissions' },
	uUserS: { user: 'Changed Permissions' }
};


// helper function for dispatching message actions
const sendMessage = (dispatch, messageKey) => {
	dispatch({ type: 'SET_MESSAGES', messages: messages[messageKey] });
};


// helper function to hydrate store on successful login
const loginSucceeded = (data, dispatch) => {
	sessionStorage.setItem('token', data.token);
	ApiCall.setToken(data.token);
	
	delete data.token;

	dispatch({ type: 'HYDRATE_PROJECTS', projects: data.projects.slice() });
	
	delete data.projects;

	dispatch({ type: 'HYDRATE_ORGANIZATION', organization: Object.assign({}, data) });

	browserHistory.push('/dashboard');
};



//--------------------------------------
//					Action Creators
//--------------------------------------

export const changePassword = (id, password) => (
	dispatch => ApiCall
		.updateUser({ id, password })
		.then(
			res => res,
			err => sendMessage(dispatch, 'uPassE')
		)
		.then(res => {
			if (res) {
				sendMessage(dispatch, 'uPassS');
			}
		})
);


// create user in server and store
export const createUser = user => (
	dispatch => ApiCall
		.createUser(user)
		.then(
			res => res,
			err => {
				if (err.response.status == 403) {
					dispatch({ type: 'SET_MESSAGES', messages: { user: 'That username is taken' }});
				} else {
					sendMessage(dispatch, 'uUserE');
				}
			}
		)
		.then(res => {
			if (res) {
				dispatch({ type: 'ADD_USER', user: res.data });
				sendMessage(dispatch, 'cUserS');
			}
		})
);


// delete user in server and store
export const deleteUser = id => (
	dispatch => ApiCall
		.deleteUser(id)
		.then(
			res => res,
			err => sendMessage(dispatch, 'dUserE')
		)
		.then(res => {
			if (res) {
				dispatch({ type: 'REMOVE_USER', id });
				sendMessage(dispatch, 'dUserS');
			}
		})
);


// load data into store
export const hydrateOrganization = organization => ({ type: 'HYDRATE_ORGANIZATION', organization });


// login user, set error message on faile
export const login = (username, password) => (
	dispatch => ApiCall
		.login(username, password)
		.then(
			res => res,
			err => sendMessage(dispatch, 'loginE')
		)
		.then(res => {
			if (res) {
				loginSucceeded(res.data, dispatch);
			}
		})
);


// clear state
export const logout = () => (
	dispatch => {
		sessionStorage.clear();

		dispatch({ type: 'CLEAR_BUDGETS' });
		dispatch({ type: 'CLEAR_EDIT_PROJECT' });
		dispatch({ type: 'CLEAR_EXPENSES' });
		dispatch({ type: 'CLEAR_ORGANIZATION' });
		dispatch({ type: 'CLEAR_PROJECTS' });
		dispatch({ type: 'CLEAR_UI' });
	}
);


// executed when user loads app w/ existing auth token
export const refreshLogin = token => (
	dispatch => ApiCall
		.checkToken(token)
		.then(
			res => res,
			err => {
				sessionStorage.clear();
				dispatch({ type: 'TOGGLE_LOGIN' });		// enable rendering of login page
			}
		)
		.then(res => {
			if (res) {
				loginSucceeded(res.data, dispatch);
			}
		})
);


export const rehydrateUser = user => ({ type: 'REHYDRATE_USER', user });


// create organization and admin user
export const signup = (orgName, username, password) => (
	dispatch => ApiCall
		.signup(orgName, username, password)
		.then(
			res => res,
			err => sendMessage(dispatch, err.response.status)
		)
		.then(res => {
			if (res) {
				loginSucceeded(res.data, dispatch);
			}
		})
);


export const updateUser = (id, attrs) => (
	dispatch => ApiCall
		.updateUser(Object.assign(attrs, { id }))
		.then(
			res => res,
			err => sendMessage(dispatch, 'uUserE')
		)
		.then(res => {
			if (res) {
				sendMessage(dispatch, 'uUserS');
				dispatch({ type: 'REHYDRATE_USER', user: Object.assign(attrs, { id }) });
			}
		})
);

