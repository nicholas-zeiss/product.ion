/**
 *
 *	Action creators that effect the organization section of the store
 *
**/


export function hydrateOrganization(orgID, orgName, user, users) {
	return {
		type: 'HYDRATE_ORGANIZATION',
		orgName,
		orgID,
		user,
		users
	};
}


export function login(username, password) {
	return {
		type: 'LOGIN',
		username,
		password
	};
}


export function logout() {
	return { type: 'LOGOUT' };
}


export function refreshLogin(token) {
	return {
		type: 'REFRESH_LOGIN',
		token
	};
}


export function registerOrganization(orgName, username, password) {
	return {
		type: 'REGISTER_ORGANIZATION',
		orgName,
		username,
		password
	};
}


export function getOrganizationProjects(orgName) {
	return {
		type: 'GET_ORG_PROJECTS',
		orgName
	};
}


export function addNewOrg(orgName, username, password) {
	return {
		type: 'ADD_NEW_ORG',
		orgName,
		username,
		password
	};
}


export function addNewUser(username, password, orgs_id, perm) {
	return {
		type: 'ADD_NEW_USER',
		username,
		password,
		orgs_id,
		perm
	};
}


export function updateUser(user) {
	return {
		type: 'UPDATE_USER',
		user
	};
}


export function changePassword(username, password, newPassword) {
	return {
		type: 'CHANGE_PASSWORD',
		username,
		password,
		newPassword
	};
}


export function deleteUser(user) {
	return {
		type: 'DELETE_USER',
		user
	};
}


export function setUsers(users) {
	return {
		type: 'SET_USERS',
		users
	};
}

