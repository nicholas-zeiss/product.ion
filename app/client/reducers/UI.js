/**
 *
 *	Reducers for the UI section of our store
 *
**/


export const defaultUIState = {
	views: {
		addUser: false,
		charts: false,
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


		case 'TOGGLE_VIEW': {
			let views = Object.assign({}, state.views, { [action.view]: !state[action.view] });

			if (action.projID != null) {
				views.pitchProject = action.projID;
			}

			return Object.assign({}, state, { views });
		}


		default: {
			return state;
		}
	}
};

