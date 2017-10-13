

export default function messages(state = [], action) {
	switch (action.type) {
		case 'REGISTRATION_ERROR':
			return Object.assign({}, state, { registerOrg: action.message });

		case 'REGISTRATION_PASS_ERROR':
			return Object.assign({}, state, { registerPassword: action.message });

		case 'RESET_REGISTRATION_MESSAGES':
			return Object.assign({}, state, {registerOrg: '', registerPassword: ''});
    
		case 'RESET_LOGIN_MESSAGE':
			return Object.assign({}, state, {login: ''});

		case 'SET_LOGIN_MESSAGE':
			return Object.assign({}, state, {login: action.message});

		case 'SET_PASSWORD_MESSAGE':
			return Object.assign({}, state, {password: action.message});

		case 'RESET_PASSWORD_MESSAGE':
			return Object.assign({}, state, {password: ''});

		case 'BAD_CSV':
			return Object.assign({}, state, {csv: action.message});
	}

	return state;
}

