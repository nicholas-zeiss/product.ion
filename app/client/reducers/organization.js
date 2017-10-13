

import ApiCall from '../utils/serverCalls';
import store from '../store';
import { browserHistory } from 'react-router';

function posts(state = {}, action) {

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
					
					//update browser location
					browserHistory.push(`/dashboard/${res.data.user.org.name.replace(/ /g, '')}`);

				})
				.catch(err => {

					console.error(err);
					
					store.dispatch({
						type:'SET_LOGIN_MESSAGE',
						message: 'Invalid username/password',
						className: 'errorMessage'
					});
				});
		
			break;
			

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
					//invalid token
					console.error(err);
				});
			
			break;



		case 'REGISTRATION_CHECK':
			ApiCall
				.registrationCheck(action.orgName, action.username)
				.then(res => {
					store.dispatch({
						type: 'ADD_NEW_ORG',
						orgName: action.orgName,
						username: action.username,
						password: action.password
					});
				})
				.catch(err => {
					var message='', target=0;
					switch (err.response.status) {
					case 400:
						target=3;
						message = ['Sorry, that organization name is taken', 'Sorry, that username is taken'];
						break;
					case 401:
						message = 'Sorry, that organization name is taken';
						target = 0;
						break;
					case 403:
						message = 'Sorry, that username is taken';
						target = 1;
						break;
					default:
						console.error(err);
					}
					store.dispatch({ type: 'REGISTRATION_ERROR', target: target, message: message });
				});

			break;


		case 'ADD_NEW_ORG':
			console.log('Lets get started. action is ', action);
			ApiCall.registerOrg(action.orgName)
				.catch(function (err) {
					console.error(err);
				})
				.then(function (res) {
						 if (res.status === 201) {
						console.log('Step 2 complete. Organization is registered. res is ', res);
						var orgData = res.data;

						//create a new user with Admin powers (the 0)
						ApiCall.registerUser(action.username, action.password, res.data.id, 0)
							.catch(function (err) {
								console.error(err);
							})
							.then(function (res) {
								if (res.status === 201) {
									console.log('Building an object with ', orgData);
									var organization = {
										id: orgData.id,
										orgName: orgData.name,
										user: {name: res.data.username, perm: res.data.perm},
										users: [{name: res.data.username, perm: res.data.perm}]
									};//build data object with responses from both APIcalls.
									console.log('Successful server chain. Hydrating an organization with data. ', organization);
									store.dispatch({
										type: 'HYDRATE_ORG',
										organization
									});
									var joinedName = organization.orgName.split(' ').join('');
									browserHistory.push(`/dashboard/${joinedName}`);
								} else {
									console.log('Big error. Res is ', res);
								}
							});
					}
				});
			break;


		case 'HYDRATE_ORG':
			console.log('state is, ', state, '\naction is ', action);
			return action.organization;


		case 'ADD_NEW_USER':
			console.log('So you want to make a new user using ', action);
			console.log('ORGS ID ', state.orgs_id);
			var orgs_id = state.orgs_id;
			console.log('registering user with data: ', action.username, action.password, orgs_id, action.perm);
			ApiCall.registerUser(action.username, action.password, orgs_id, action.perm)
				.then(function(res) {
					console.log('USER RES ', res);
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
			console.log('ding ding ding', action.user);
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
					console.log('resword is ', res.data.user.password);
					console.log('actionword is ', action.password);
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
					console.log('Reducers-CHANGE_PASSWORD: res is', err);
				});

			break;


		case 'SET_USERS':
			console.log('setting users', action.users);
			return Object.assign({}, state, {users: action.users});


		case 'LOGOUT':
			sessionStorage.removeItem('token');
			return {};

	}

	return state;
}

export default posts;

