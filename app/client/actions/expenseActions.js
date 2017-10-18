/**
 *
 *	Action creators that effect the expenses section of the store
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
 *	down the line after we we call handleSuccess. This could lead to a large number of errors
 *	occurring/subsequently cascading and should be avoided.
 *
**/


import ApiCall from '../utils/serverCalls';


export const clearExpenses = () => ({ type: 'CLEAR_EXPENSES' });


export const createExpenses = (expenses, projID) => (
	dispatch => ApiCall
		.createExpenses(expenses, projID)
		.then(
			res => res,
			err => console.error(err)
		)
		.then(res => {
			if (res) {
				dispatch({ type: 'HYDRATE_EXPENSES', expenses: res.data });
			}
		})
);


export const dehydrateExpense = (id, projID) => ({ type: 'DEHYDRATE_EXPENSES', id, projID });


export const deleteExpense = (id, projID) => (
	dispatch => ApiCall
		.deleteExpense(id, projID)
		.then(
			res => res,
			err => console.error(err)
		)
		.then(res => {
			if (res) {
				dispatch({ type: 'DEHYDRATE_EXPENSE', id, projID });
			}
		})
);


export const getExpenses = projIDs => {

	//while seemingly pointless this makes the expenses section of the store
	//indicate it is loaded and that this action does not need to run again
	if (!projIDs.length) {
		return dispatch => dispatch({ type: 'HYDRATE_BUDGETS', budgets: [] });
	}

	return dispatch => ApiCall
		.getExpenses(projIDs)
		.then(
			res => res,
			err => console.error(err)
		)
		.then(res => {
			if (res) {
				dispatch({ type: 'HYDRATE_EXPENSES', expenses: res.data });
			}
		});
};


export const hydrateExpenses = expenses => ({ type: 'HYDRATE_EXPENSES', expenses });


export const updateExpense = expense => (
	dispatch => ApiCall
		.updateExpense(expense)
		.then(
			res => res,
			err => console.error(err)
		)
		.then(res => {
			if (res) {
				dispatch({ type: 'HYDRATE_EXPENSES', expenses: [ expense ] });
			}
		})
);

