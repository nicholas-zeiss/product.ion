

export default function messages(state = {}, action) {
	
	switch (action.type) {
		case 'SET_AUTH_MESSAGE':
			return Object.assign({}, state, { auth: action.message });

		case 'BAD_CSV':
			return Object.assign({}, state, {csv: action.message});
	}

	return state;
}

