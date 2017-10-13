

import ApiCall from '../utils/serverCalls';
import store from '../store';
import { browserHistory } from 'react-router';


export default function posts(state = {}, action) {

	switch (action.type) {


		//---------------------------------------
		//					AUTHORIZATION
		//---------------------------------------

		//used to update the store with user/organization info
		case 'HYDRATE_USER':
			return Object.assign({}, state, {
				orgName: action.orgName,
				orgs_id: action.orgId,
				user: action.user
			});


		//used to login the normal way
		case 'LOGIN':
			ApiCall.login(action.username, action.password)
				.then(res => {
					
					sessionStorage.setItem('token', res.data.token);
					ApiCall.setToken();

					store.dispatch({
						type: 'HYDRATE_USER',
						orgName: res.data.user.org.name,
						orgId: res.data.user.org.id,
						user: {
							id: res.data.user.id,
							perm: res.data.user.perm,
							name: res.data.user.username
						}
					});
					
					browserHistory.push(`/dashboard/${res.data.user.org.name.replace(/ /g, '')}`);

				})
				.catch(err => {					
					store.dispatch({
						type:'SET_LOGIN_MESSAGE',
						message: 'Invalid username/password',
						className: 'errorMessage'
					});
				});
		
			break;
			
		
		//clears session and app state
		case 'LOGOUT':
			sessionStorage.clear();
			return {};


		//used after a page reload when a token is present
		case 'REFRESH_LOGIN':
			ApiCall.setToken();
			
			ApiCall
				.checkToken(sessionStorage.token)
				.then(res => {		

					store.dispatch({
						type: 'HYDRATE_USER',
						orgName: res.data.org.name,
						orgId: res.data.org.id,
						user: {
							id: res.data.id,
							perm: res.data.perm,
							name: res.data.username
						}
					});

					//update browser location
					browserHistory.push(`/dashboard/${res.data.org.name.replace(/ /g, '')}`);
					
				})
				.catch(err => {
					console.error(err);
				});
			
			break;



		//---------------------------------------
		//							SIGN UP
		//---------------------------------------

		//updates state with info of new organization/admin
		case 'HYDRATE_ORG':
			return Object.assign({}, state, action.organization);


		//register a new organization
		case 'REGISTER_ORG':
			ApiCall
				.registerOrg(action.orgName, action.username, action.password)
				.then(res => {

					sessionStorage.token = res.data.token;
					ApiCall.setToken();

					let user = {
						name: res.data.user.username, 
						perm: res.data.user.perm
					};

					let organization = {
						id: res.data.org.id,
						orgName: res.data.org.name,
						user: user,
						users: [ user ]
					};

					store.dispatch({
						type: 'HYDRATE_ORG',
						organization
					});

					browserHistory.push(`/dashboard/${organization.orgName.replace(/ /g, '')}`);

				})
				.catch(err => {
										
					let message = '';
					
					if (err.status == 400) {
						message = 'Sorry, both that organization name and username are taken';
					} else if (err.status == 401) {
						message = 'Sorry, that organization name is taken';
					} else if (err.status == 403) {
						message = 'Sorry, that username is taken';
					}

					store.dispatch({
						type: 'REGISTRATION_ERROR',
						message: message
					});
				});

			break;




		case 'ADD_NEW_USER':
			var orgs_id = state.orgs_id;
			ApiCall.registerUser(action.username, action.password, orgs_id, action.perm)
				.then(function(res) {
					let userData = res.data;
					if(res.status === 201) {
						let user = {
							id: userData.id,
							user: userData.username,
							password: userData.password,
							orgs_id: userData.orgs_id,
							perm: userData.perm
						};
					}
				})
				.catch(function(err) {
					console.error(err);
				});
			break;

		case 'UPDATE_USER':
			ApiCall.updateUser(action.user)
				.then(res => {
					console.log(res);
				})
				.catch(err => {
					console.error(err);
				});
			break;

		

		case 'CHANGE_PASSWORD':
			ApiCall
				.login(action.username, action.password)
				.then(function(res) {
					if (res.data.user.password === action.password) {
						ApiCall.changePassword(action.username, action.newPassword)
							.then(function(res) {
								store.dispatch({type: 'SET_PASSWORD_MESSAGE',
									message:'Success! You changed your password!'});
							})
							.catch(function(err) {
								console.error(err);
							});
					} else {
						store.dispatch({type: 'SET_PASSWORD_MESSAGE',
							message:'Error. Please re-enter user password'});
					}
				})
				.catch((err) => {
					console.err(err);
				});

			break;


		case 'SET_USERS':
			return Object.assign({}, state, {users: action.users});

	}

	//default
	return state;
}

