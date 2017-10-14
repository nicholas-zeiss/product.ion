/**
 *
 *	Action creators for actions used to login/signup
 *
**/


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


export function setAuthMessage(message) {
	return {
		type: 'SET_AUTH_MESSAGE',
		message
	};
}

