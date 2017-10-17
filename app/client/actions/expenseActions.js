/**
 *
 *	Action creators that effect the expenses section of the store
 *
**/


import ApiCall from '../utils/serverCalls';


export const clearExpenses = () => ({ type: 'CLEAR_EXPENSES' });


export const createExpenses = expenses => (
	dispatch => ApiCall
		.createExpenses(expenses)
		.then(res => res, err => console.error(err))
		.then(res => {
			dispatch({ type: 'HYDRATE_EXPENSES', expenses: res.data });
		})
);


export const dehydrateExpenses = ids => ({ type: 'DEHYDRATE_EXPENSES', ids });


export const deleteExpense = id => (
	dispatch => ApiCall
		.deleteExpense(id)
		.then(res => res, err => console.error(err))
		.then(() => {
			dispatch({ type: 'DEHYDRATE_EXPENSES', ids: [ id ] });
		})
);


export const getExpenses = projIDs => (
	dispatch => ApiCall
		.getExpenses(projIDs)
		.then(res => res, err => console.error(err))
		.then(res => {
			dispatch({ type: 'HYDRATE_EXPENSES', expenses: res.data });
		})
);


export const hydrateExpenses = expenses => ({ type: 'HYDRATE_EXPENSES', expenses });


export const updateExpense = expense => (
	dispatch => ApiCall
		.updateExpense(expense)
		.then(res => res, err => console.error(err))
		.then(res => {
			dispatch({ type: 'HYDRATE_EXPENSES', expenses: [ res.data ] });
		})
);

