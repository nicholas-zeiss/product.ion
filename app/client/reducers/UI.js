/**
 *
 *	Reducers for the UI section of our store
 *
**/


export const defaultUIState = Object.freeze({
	messages: {
		password: '',
		projectName: '',
		user: ''
	},
	views: {
		addUser: false,
		charts: false,
		pitch: false
	}
});


export default (state = defaultUIState, action) => {

	switch (action.type) {

		case 'CLEAR_UI': {
			return defaultUIState;
		}


		case 'CLOSE_PITCH_MODAL': {
			return {
				messages: defaultUIState.messages,
				views: Object.assign({}, state.views, { pitch: false })
			};
		}


		case 'SET_MESSAGES': {
			return Object.assign({}, state, { messages: action.messages });
		}


		case 'TOGGLE_CHARTS': {
			return Object.assign({}, defaultUIState, { views: { charts: !state.views.charts }});
		}


		case 'VIEW_PITCH_MODAL': {
			return {
				messages: defaultUIState.messages,
				views: Object.assign({}, state.views, { pitch: true })
			};
		}


		default: {
			return state;
		}
	}
};

