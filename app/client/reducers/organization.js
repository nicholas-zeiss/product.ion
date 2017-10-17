/**
 *
 *	Reducers for the organization section of our store
 *
**/


import ApiCall from '../utils/serverCalls';
import { store } from '../store';
import { browserHistory } from 'react-router';


export const defaultOrganizationState = {
	id: null,
	name: null,
	user: null,
	users: []
};

	
export default (state = {}, action) => {

	switch (action.type) {


		case 'CHANGE_PASSWORD': {
			ApiCall
				.changePassword(action.userID, action.newPassword)
				.then(() => {

					store.dispatch({
						type: 'SET_MESSAGES',
						messages: {
							password: 'Password successfully changed'
						}
					});

				})
				.catch(() => {

					store.dispatch({
						type: 'SET_MESSAGES',
						messages: {
							password: 'Unable to change password'
						}
					});

				});

			return state;
		}


		case 'CREATE_USER': {
			let user = Object.assign({}, action);
			delete user.type;

			ApiCall
				.createUser(user)
				.then(res => {

					store.dispatch({
						type: 'HYDRATE_ORGANIZATION',
						users: state.users.concat(res.data)
					});

					store.dispatch({
						type: 'SET_MESSAGES',
						messages: {
							user: 'User successfully created'
						}
					});

				})
				.catch(() => {

					store.dispatch({
						type: 'SET_MESSAGES',
						messages: {
							user: 'Unable to create user'
						}
					});
				
				});
		
			return state;
		}


		case 'DELETE_USER': {
			ApiCall
				.deleteUser(action.userID)
				.then(() => {

					store.dispatch({
						type: 'SET_MESSAGES',
						messages: {
							user: 'User deleted'
						}
					});

				})
				.catch(() => {

					store.dispatch({
						type: 'SET_MESSAGES',
						messages: {
							user: 'Unable to delete user'
						}
					});

				});

			return state;
		}


		case 'HYDRATE_ORGANIZATION': {
			let orgData = {};
			
			for (let key in action) {
				if (key != 'type' && action[key] != null) {
					orgData[key] = action[key];
				}
			}

			return Object.assign({}, state, orgData);
		}


		case 'LOGIN': {
			ApiCall
				.login(action.username, action.password)
				.then(res => {

					sessionStorage.setItem('token', res.data.token);
					ApiCall.setToken(res.data.token);

					store.dispatch({ type: 'HYDRATE_PROJECTS', projects: res.data.projects.slice() });

					let orgData = Object.assign(res.data, { type: 'HYDRATE_ORGANIZATION' });
					delete orgData.projects;
					delete orgData.token;

					store.dispatch(orgData);

					browserHistory.push('/dashboard');

				})
				.catch(() => {	

					store.dispatch({
						type:'SET_MESSAGES',
						messages: {
							user: 'Invalid username/password'
						}
					});

				});
		
			return state;
		}
			
		
		case 'LOGOUT': {
			sessionStorage.clear();

			store.dispatch({ type: 'CLEAR_BUDGETS' });
			store.dispatch({ type: 'CLEAR_EXPENSES' });
			store.dispatch({ type: 'CLEAR_PROJECTS' });
			store.dispatch({ type: 'CLEAR_UI' });

			return {};
		}


		case 'REFRESH_LOGIN': {
			ApiCall
				.checkToken(sessionStorage.token)
				.then(res => {

					ApiCall.setToken(res.data.token);

					store.dispatch({ type: 'HYDRATE_PROJECTS', projects: res.data.projects.slice() });

					let orgData = Object.assign(res.data, { type: 'HYDRATE_ORGANIZATION' });
					delete orgData.projects;
					delete orgData.token;

					store.dispatch(orgData);

					browserHistory.push('/dashboard');
					
				})
				.catch(() => sessionStorage.clear());
			
			return state;
		}


		case 'SIGNUP': {
			ApiCall
				.signup(action.orgName, action.username, action.password)
				.then(res => {

					sessionStorage.token = res.data.token;
					ApiCall.setToken(res.data.token);

					let orgData = Object.assign(res.data, { type: 'HYDRATE_ORGANIZATION' });
					delete orgData.token;

					store.dispatch(orgData);

					browserHistory.push('/dashboard');

				})
				.catch(err => {
										
					let errorMessages = {
						400: 'Sorry, both that organization name and username are taken',
						401: 'Sorry, that organization name is taken',
						403: 'Sorry, that username is taken'
					};

					store.dispatch({
						type: 'SET_MESSAGES',
						messages: {
							user: errorMessages[err.response.status]
						}
					});

				});

			return state;
		}


		default: {
			return state;
		}
	}
};

