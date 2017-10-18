/**
 *
 *	Reducers for the project being edited section of our store
 *
**/


import { projectDefaults } from '../data/public';


export const defaultEditProjectState = Object.freeze({ 
	budgets: null,
	expenses: null,
	id: null,
	project: null 
});


export default (state = defaultEditProjectState, action) => {

	switch (action.type) {
		
		case 'CLEAR_EDIT_PROJECT': {
			return defaultEditProjectState;
		}


		case 'NEW_EDIT_PROJECT': {
			let project =  projectDefaults(action.orgID, action.userID);

			return Object.assign({}, defaultEditProjectState, { project });
		}


		case 'SET_EDIT_PROJECT': {
			return Object.assign({}, defaultEditProjectState, { project: action.project });
		}


		default: {
			return state;
		}
	}
};

