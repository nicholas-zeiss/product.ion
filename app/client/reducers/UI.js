

export default function UI(state = {}, action) {
	
	switch (action.type) {
		case 'SET_PASSWORD_MESSAGE':
			return Object.assign({}, state, { password: action.message });

		case 'SET_USER/ORG_MESSAGE':
			return Object.assign({}, state, { username: action.message });

		case 'BAD_CSV':
			return Object.assign({}, state, { csv: action.message });

		case 'TOGGLE_MODAL':
			return Object.assign({}, state, { [action.name]: !state[action.name] });

		default:
			return state;
	}
}

