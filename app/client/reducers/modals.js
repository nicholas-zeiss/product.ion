

export default function modals(state = {}, action) {
	switch (action.type) {
		
		case 'TOGGLE_MODAL':
			return Object.assign({}, state, { [action.name]: !state[action.name] });
		
		default:
			return state;
	}
}

