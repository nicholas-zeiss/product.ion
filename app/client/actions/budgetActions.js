/**
 *
 *	Action creators that effect the budgets section of the store
 *
 *  Some async action creaters have a seemingly illogical syntax of 
 *		asyncServerCall()
 *			.then(res => res, err => handleError())			//where handleError does not return a value
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

export const createBudgets = budgets => (
	dispatch => ApiCall
		.createBudgets(budgets)
		.then(res => res, err => console.error(err))
		.then(res => res ? dispatch({ type: 'HYDRATE_BUDGETS', budgets: res.data }) : null)
);

export const dehydrateBudgets = ids => ({ type: 'DEHYDRATE_BUDGETS', ids });

export const deleteBudget = id => (
	dispatch => ApiCall
		.deleteBudget(id)
		.then(res => res, err => console.error(err))
		.then(res => res ? dispatch({type: 'DEHYDRATE_BUDGETS', ids: [ id ] }) : null)
);

export const getBudgets = projIDs => (
	dispatch => ApiCall
		.getBudgets(projIDs)
		.then(res => res, err => console.error(err))
		.then(res => res ? dispatch({ type: 'HYDRATE_BUDGETS', budgets: res.data }) : null)
);

export const hydrateBudgets = budgets => ({ type: 'HYDRATE_BUDGETS', budgets });

export const updateBudgets = budgets => (
	dispatch => ApiCall
		.updateBudgets(budgets)
		.then(res => res, err => console.error(err))
		.then(res => res ? dispatch({ type: 'HYDRATE_BUDGETS', budgets: res.data }) : null)
);

