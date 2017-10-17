/**
 *
 *	Reducers for the expenses section of our store
 *
**/


import ApiCall from '../utils/serverCalls';
import { store } from '../store';


export const defaultExpensesState = { loaded: false };


export default (state = defaultExpensesState, action) => {
	
	switch (action.type) {
	

		case 'CLEAR_EXPENSES': {
			return defaultExpensesState;
		}


		case 'DEHYDRATE_EXPENSES': {
			let expenses = Object.assign({}, state);

			action.ids.forEach(id => delete expenses[id]);

			return expenses;
		}


		case 'HYDRATE_EXPENSES': {
			let newExpenses = Object.assign({}, state, { loaded: true });

			action.expenses.forEach(expense => {
				let id = expense.id;
				delete expense.id;
				newExpenses[id] = expense;
			});

			return newExpenses;
		}


		default: {
			return state;
		}
	}
};

