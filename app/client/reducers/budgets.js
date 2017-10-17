/**
 *
 *	Reducers for the budgets section of our store
 *
**/


import ApiCall from '../utils/serverCalls';
import { store } from '../store';


export default (state = [], action) => {

	switch (action.type) {
		

		case 'POST_NEW_BUDGET': {
			ApiCall
				.addBudget(action.budget)
				.then(res => {
					store.dispatch({
						type: 'HYDRATE_PROJECT_BUDGETS',
						budgets: [ res.data ],
						projID: action.budget.projID
					});
				})
				.catch(err => {
					console.error('Error posting budget', err);
				});
			
			break;
		}


		case 'HYDRATE_PROJECT_BUDGETS': {
			let newBudgets = [];

			if (store[action.projID]) {
				newBudgets = store[action.projID].concat(action.budgets);
			}

			return Object.assign({}, store, { [ action.projID ]: newBudgets });
		}


		


		case 'DELETE_BUDGET': {
			ApiCall.deleteBudget(action.node.id)
				.then(res => {
	
					store.dispatch({type: 'REMOVE_BUDGET_FROM_STORE', node: action.node});
				})
				.catch(err => {
					console.error(err);
				});
			break;
		}


		case 'UPDATE_MULTIPLE_BUDGETS': {
			ApiCall.updateProjBudgets(action.list)
				.then(res => {
					if (res.status===201) {
		
					} else {
						console.error('Update user failed. Resopnse was not 201');
					}
				})
				.catch(err => console.error(err));
			break;
		}


		default: {
			return state;
		}
	}
};

