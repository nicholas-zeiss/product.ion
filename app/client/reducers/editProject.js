/**
 *
 *	Reducers for the project being edited section of our store
 *
**/


import { projectDefaults } from '../utils/projectUtils';


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
			let project = projectDefaults(action.orgID, action.userID);

			return Object.assign({}, defaultEditProjectState, { budgets: [], expenses: [], project });
		}


		case 'SET_EDIT_PROJECT': {
			
			// we must ensure we work on copies of budgets/expenses/projects
			// as to not mutate them in other locations of the store
			return Object.assign({}, defaultEditProjectState, { 
				budgets: action.budgets.map(budget => Object.assign({}, budget)),
				expenses: action.expenses.map(expense => Object.assign({}, expense)),
				id: action.id,
				project: Object.assign({}, action.project)
			});
		}


		default: {
			return state;
		}
	}
};

