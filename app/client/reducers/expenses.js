/**
 *
 *	Reducers for the expenses section of our store
 *
**/


import ApiCall from '../utils/serverCalls';
import { store } from '../store';


export default (state = {}, action) => {
	
	switch (action.type) {
	

		case 'CLEAR_EXPENSES': {
			return {};
		}


		case 'CREATE_EXPENSES': {
			ApiCall
				.createExpenses(action.expenses)
				.then(res => {
					store.dispatch({ type: 'HYDRATE_EXPENSES', expenses: res.data });
				})
				.catch(err => {
					console.error(err);
				});
		
			return state;
		}


		case 'DEHYDRATE_EXPENSES': {
			let expenses = Object.assign({}, state);

			action.ids.forEach(id => delete expenses[id]);

			return expenses;
		}


		case 'DELETE_EXPENSE': {
			ApiCall
				.deleteExpense(action.id)
				.then(() => {
					store.dispatch({ type: 'DEHYDRATE_EXPENSES', ids: [ action.id ] });
				})
				.catch(err => {
					console.err(err);
				});

			return state;
		}


		case 'GET_EXPENSES': {
			ApiCall
				.getExpenses(action.projIDs)
				.then(res => {
					store.dispatch({ type: 'HYDRATE_EXPENSES', expenses: res.data });
				})
				.catch(err => {
					console.error(err);
				});
		
			return state;
		}


		case 'HYDRATE_EXPENSES': {
			let newBudgets = Object.assign({}, state);

			action.budgets.forEach(budget => {
				let id = budget.id;
				delete budget.id;
				newBudgets[id] = budget;
			});

			return newBudgets;
		}


		case 'UPDATE_EXPENSE': {
			ApiCall
				.updateExpense(action.expense)
				.then(res => {
					store.dispatch({ type: 'HYDRATE_EXPENSES', expenses: [ res.data ] });
				})
				.catch(err => {
					console.error(err);
				});
		
			return state;
		}


		default: {
			return state;
		}
	}
};

