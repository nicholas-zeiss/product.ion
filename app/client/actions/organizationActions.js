/**
 *
 *	Action creators that effect the organization section of the store
 *
**/


export const changePassword = (newPassword, userID) => ({
	type: 'CHANGE_PASSWORD',
	newPassword,
	userID
});


export const createUser = (orgID, password, permissions, username) => ({
	type: 'CREATE_USER',
	orgID,
	password,
	permissions,
	username,
});


export const deleteUser = userID => ({
	type: 'DELETE_USER',
	userID
});


export const hydrateOrganization = (id = null, name = null, user = null, users = null) => ({
	type: 'HYDRATE_ORGANIZATION',
	id,
	name,
	user,
	users
});


export const login = (username, password) => ({
	type: 'LOGIN',
	username,
	password
});


export const logout = () => ({ type: 'LOGOUT' });


export const refreshLogin = token => ({
	type: 'REFRESH_LOGIN',
	token
});


export const signup = (orgName, username, password) => ({
	type: 'SIGNUP',
	orgName,
	username,
	password
});

