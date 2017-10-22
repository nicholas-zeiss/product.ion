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
		csvModal: false,
		dashCharts: false,
		expenseCharts: false,
		login: false,
		pitchModal: false
	}
});


export default (state = defaultUIState, action) => {

	switch (action.type) {

		case 'CLEAR_UI': {
			return defaultUIState;
		}


		case 'SET_MESSAGES': {
			return Object.assign({}, state, { messages: action.messages });
		}


		case 'TOGGLE_CSV_MODAL': {
			return {
				messages: defaultUIState.messages,
				views: Object.assign({}, state.views, { csvModal: !state.views.csvModal })
			};
		}


		case 'TOGGLE_DASH_CHARTS': {
			return Object.assign({}, defaultUIState, { views: { dashCharts: !state.views.dashCharts }});
		}


		case 'TOGGLE_EXPENSE_CHARTS': {
			return Object.assign({}, defaultUIState, { views: { expenseCharts: !state.views.expenseCharts }});
		}


		case 'TOGGLE_LOGIN': {
			return Object.assign({}, defaultUIState, { views: { login: !state.views.login }});
		}


		case 'TOGGLE_PITCH_MODAL': {
			return {
				messages: defaultUIState.messages,
				views: Object.assign({}, state.views, { pitchModal: !state.views.pitchModal })
			};
		}


		default: {
			return state;
		}
	}
};

