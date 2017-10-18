/**
 *
 *	Action creators that effect the budgets section of the store
 *
 *  Some async action creaters have a seemingly illogical syntax of 
 *		asyncServerCall()
 *			.then(res => res, err => handleError())			// where handleError does not return a value
 *			.then(res => if (res) handleSuccess())
 *
 *	as opposed to a more intuitive
 *		asyncServerCall()
 *			.then(res => handleSuccess())
 *			.catch(err => handleError())
 *
 *	This is because catch would be called both for an HTTP error and an error incurred anywhere
 *	down the line after we call handleSuccess. This could lead to a large number of errors
 *	occurring/subsequently cascading and should be avoided.
 *
**/


import ApiCall from '../utils/serverCalls';


export const clearBudgets = () => ({ type: 'CLEAR_BUDGETS' });


export const createBudgets = (budgets, projID) => (
	dispatch => ApiCall
		.createBudgets(budgets, projID)
		.then(
			res => res,
			err => console.error(err)
		)
		.then(res => {
			if (res) {
				dispatch({ type: 'HYDRATE_BUDGETS', budgets: res.data });
			}
		})
);


export const dehydrateBudget = (id, projID) => ({ type: 'DEHYDRATE_BUDGET', id, projID });


export const deleteBudget = (id, projID) => (
	dispatch => ApiCall
		.deleteBudget(id, projID)
		.then(
			res => res,
			err => console.error(err)
		)
		.then(res => {
			if (res) {
				dispatch({type: 'DEHYDRATE_BUDGET', id, projID });
			}
		})
);


export const getBudgets = projIDs => {
	
	// while seemingly pointless this makes the budgets section of the store
	// indicate it is loaded and that this action does not need to run again
	if (!projIDs.length) {
		return dispatch => dispatch({ type: 'HYDRATE_BUDGETS', budgets: [] });
	}

	return dispatch => ApiCall
		.getBudgets(projIDs)
		.then(
			res => res,
			err => console.error(err)
		)
		.then(res => {
			if (res) {
				dispatch({type: 'HYDRATE_BUDGETS', budgets: res.data });
			}
		});
};


export const hydrateBudgets = budgets => ({ type: 'HYDRATE_BUDGETS', budgets });


export const updateBudget = budget => (
	dispatch => ApiCall
		.updateBudget(budget)
		.then(
			res => res,
			err => console.error(err)
		)
		.then(res => {
			if (res) {
				dispatch({type: 'HYDRATE_BUDGETS', budgets: [ budget ] });
			}
		})
);

