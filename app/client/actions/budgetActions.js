/**
 *
 *	Action creators that affect the budgets section of the store. The budgets section of the store
 *	is a map of project IDs to array's of their budget objects.
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


// reset this section
export const clearBudgets = () => ({ type: 'CLEAR_BUDGETS' });


// create budgets linked to projID in server and add to store
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


// remove budgets w/ id in IDs from store
export const dehydrateBudgets = (IDs, projID) => ({ type: 'DEHYDRATE_BUDGETS', IDs, projID });


// remove budgets w/ id in IDs from store and server
export const deleteBudgets = (IDs, projID) => (
	dispatch => ApiCall
		.deleteBudgets(IDs, projID)
		.then(
			res => res,
			err => console.error(err)
		)
		.then(res => {
			if (res) {
				dispatch({type: 'DEHYDRATE_BUDGETS', IDs, projID });
			}
		})
);


// load budgets from server into store
export const getBudgets = projIDs => {
	
	// while seemingly pointless this makes the budgets section of the store
	// indicate it is loaded and doesn't need to be loaded again
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


// load array budgets into store
export const hydrateBudgets = budgets => ({ type: 'HYDRATE_BUDGETS', budgets });

