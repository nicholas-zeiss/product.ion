/**
 *
 *	Reducers for the budgets section of our store
 *
**/


import deepCopyState from '../utils/deepCopyState';


export const defaultBudgetsState = Object.freeze({ loaded: false });


export default (state = defaultBudgetsState, action) => {

	switch (action.type) {
		
		case 'CLEAR_BUDGETS': {
			return defaultBudgetsState;
		}


		case 'DEHYDRATE_BUDGETS': {
			let newBudgets = deepCopyState(state);
			
			newBudgets[action.projID] = newBudgets[action.projID]
				.filter(budget => !action.IDs.includes(budget.id));

			return newBudgets;
		}


		case 'HYDRATE_BUDGETS': {
			let newBudgets = deepCopyState(state);
			newBudgets.loaded = true;

			action.budgets.forEach(budget => {
				let projID = budget.projID;

				newBudgets[projID] = newBudgets[projID] || [];

				newBudgets[projID].push(budget);
			});

			return newBudgets;
		}


		default: {
			return state;
		}
	}
};

