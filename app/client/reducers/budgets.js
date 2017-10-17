/**
 *
 *	Reducers for the budgets section of our store
 *
**/


import ApiCall from '../utils/serverCalls';
import { store } from '../store';


export default (state = {}, action) => {

	switch (action.type) {
		

		case 'CLEAR_BUDGETS': {
			return {};
		}


		case 'CREATE_BUDGETS': {
			ApiCall
				.createBudgets(action.budgets)
				.then(res => {

					store.dispatch({
						type: 'HYDRATE_BUDGETS',
						budgets: res.data
					});

				})
				.catch(err => {
					console.error('Error posting budgets: ', err);
				});
			
			return state;
		}


		case 'DEHYDRATE_BUDGETS': {
			let budgets = Object.assign({}, state);

			action.ids.forEach(id => delete budgets[id]);

			return budgets;
		}


		case 'DELETE_BUDGET': {
			ApiCall
				.deleteBudget(action.id)
				.then(() => {
					store.dispatch({type: 'DEHYDRATE_BUDGETS', ids: action.id });
				})
				.catch(err => {
					console.error(err);
				});

			return state;
		}


		case 'GET_BUDGETS': {
			ApiCall
				.getBudgets(action.projIDs)
				.then(res => {
					store.dispatch({ type: 'HYDRATE_BUDGETS', budgets: res.data });
				})
				.catch(err => {
					console.error(err);
				});

			return state;
		}


		case 'HYDRATE_BUDGETS': {
			let newBudgets = Object.assign({}, state);

			action.budgets.forEach(budget => {
				let id = budget.id;
				delete budget.id;
				newBudgets[id] = budget;
			});

			return newBudgets;
		}


		case 'UPDATE_BUDGETS': {
			ApiCall
				.updateBudgets(action.budgets)
				.then(res => {
					store.dispatch({ type: 'HYDRATE_BUDGETS', budgets: res.data });
				})
				.catch(err => {
					console.err(err);
				});

			return state;
		}


		default: {
			return state;
		}
	}
};

