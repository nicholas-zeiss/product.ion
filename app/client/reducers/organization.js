/**
 *
 *  Reducers that manipulate organizations and their users
 *
**/

import ApiCall from '../utils/serverCalls';
import { store } from '../store';
import { browserHistory } from 'react-router';


export default function posts(state = {}, action) {

	switch (action.type) {


		//---------------------------------------
		//					AUTHORIZATION
		//---------------------------------------

		//updates state with info of new organization/admin
		case 'HYDRATE_ORGANIZATION':
			return Object.assign({}, state, {
				orgID: action.orgID,
				orgName: action.orgName,
				user: action.user,
				users: action.users
			});


		//used to login the normal way
		case 'LOGIN':
			ApiCall.login(action.username, action.password)
				.then(res => {
					
					sessionStorage.setItem('token', res.data.token);
					ApiCall.setToken();

					store.dispatch({
						type: 'HYDRATE_ORGANIZATION',
						orgID: res.data.organization.id,
						orgName: res.data.organization.name,
						user: res.data.user, 
						users: res.data.users
					});

					store.dispatch({
						type: 'HYDRATE_PROJECTS',
						projects: res.data.organization.projects
					});
					
					browserHistory.push(`/dashboard/${res.data.organization.name.replace(/ /g, '')}`);

				})
				.catch(err => {	
					console.error(err);

					store.dispatch({
						type:'SET_USER/ORG_MESSAGE',
						message: 'Invalid username/password'
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
						type: 'HYDRATE_ORGANIZATION',
						orgID: res.data.organization.id,
						orgName: res.data.organization.name,
						user: res.data.user,
						users: res.data.users
					});

					store.dispatch({
						type: 'HYDRATE_PROJECTS',
						projects: res.data.organization.projects
					});

					//update browser location
					browserHistory.push(`/dashboard/${res.data.organization.name.replace(/ /g, '')}`);
					
				})
				.catch(err => {
					console.error(err);
					sessionStorage.clear();
				});
			
			break;



		//---------------------------------------
		//							SIGN UP
		//---------------------------------------

		//register a new organization
		case 'REGISTER_ORGANIZATION':
			ApiCall
				.registerOrganization(action.orgName, action.username, action.password)
				.then(res => {

					sessionStorage.token = res.data.token;
					ApiCall.setToken();

					let user = {
						name: res.data.user.username, 
						perm: res.data.user.perm
					};

					store.dispatch({
						type: 'HYDRATE_ORGANIZATION',
						orgID: res.data.organization.id,
						orgName: res.data.organization.name,
						user: user,
						users: [ user ]
					});

					browserHistory.push(`/dashboard/${res.data.organization.name.replace(/ /g, '')}`);

				})
				.catch(err => {
										
					let message;
					
					if (err.response.status == 400) {
						message = 'Sorry, both that organization name and username are taken';
					} else if (err.response.status == 401) {
						message = 'Sorry, that organization name is taken';
					} else {
						message = 'Sorry, that username is taken';
					}

					store.dispatch({
						type: 'SET_USER/ORG_MESSAGE',
						message
					});
				});

			break;



		//---------------------------------------
		//					USER MODIFICATIONS
		//---------------------------------------
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

