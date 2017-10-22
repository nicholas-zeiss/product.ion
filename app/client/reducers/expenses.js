/**
 *
 *	Reducers for the expenses section of our store
 *
**/


import deepCopyState from '../utils/deepCopyState';


export const defaultExpensesState = Object.freeze({ loaded: false });


export default (state = defaultExpensesState, action) => {
	
	switch (action.type) {

		case 'CLEAR_EXPENSES': {
			return defaultExpensesState;
		}


		case 'DEHYDRATE_EXPENSE': {
			let newExpenses = deepCopyState(state);

			newExpenses[action.projID] = newExpenses[action.projID]
				.filter(expense => expense.id != action.id);

			return newExpenses;
		}


		case 'HYDRATE_EXPENSES': {
			let newExpenses = deepCopyState(state);
			newExpenses.loaded = true;
			action.expenses.forEach(expense => {
				let projID = expense.projID;

				newExpenses[projID] = newExpenses[projID] || [];

				newExpenses[projID].push(expense);
			});

			return newExpenses;
		}


		default: {
			return state;
		}
	}
};

