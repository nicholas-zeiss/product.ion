/**
 *
 *	Reducers for the UI section of our store
 *
**/


export const defaultUIState = {
	modals: {
		addUser: false,
		pitch: false,
		pitchProject: null
	},
	messages: {
		password: '',
		user: ''
	}
};


export default (state = defaultUIState, action) => {

	switch (action.type) {


		case 'CLEAR_UI': {
			return defaultUIState;
		}


		case 'SET_MESSAGES': {
			let messages = Object.assign({}, state.messages, action.messages);
			
			return Object.assign({}, state, { messages });
		}


		case 'TOGGLE_MODAL': {
			let modals = Object.assign({}, state.modals, { [action.name]: !state[action.name] });

			if (action.projID != null) {
				modals.pitchProject = action.projID;
			}

			return Object.assign({}, state, { modals });
		}


		default: {
			return state;
		}
	}
};

