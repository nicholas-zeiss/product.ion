/**
 *
 *	Action creators that effect the budgets section of the store
 *
**/


import ApiCall from '../utils/serverCalls';


export const clearBudgets = () => ({ type: 'CLEAR_BUDGETS' });


export const createBudgets = budgets => (
	dispatch => ApiCall
		.createBudgets(budgets)
		.then(res => res, err => console.error(err))
		.then(res => {
			dispatch({ type: 'HYDRATE_BUDGETS', budgets: res.data });
		})
);


export const dehydrateBudgets = ids => ({ type: 'DEHYDRATE_BUDGETS', ids });


export const deleteBudget = id => (
	dispatch => ApiCall
		.deleteBudget(id)
		.then(res => res, err => console.error(err))
		.then(() => {
			dispatch({type: 'DEHYDRATE_BUDGETS', ids: [ id ] });
		})
);


export const getBudgets = projIDs => (
	dispatch => ApiCall
		.getBudgets(projIDs)
		.then(res => res, err => console.error(err))
		.then(res => {
			dispatch({ type: 'HYDRATE_BUDGETS', budgets: res.data });
		})	
);


export const hydrateBudgets = budgets => ({ type: 'HYDRATE_BUDGETS', budgets });


export const updateBudgets = budgets => (
	dispatch => ApiCall
		.updateBudgets(budgets)
		.then(res => res, err => console.error(err))
		.then(res => {
			dispatch({ type: 'HYDRATE_BUDGETS', budgets: res.data });
		})
);

