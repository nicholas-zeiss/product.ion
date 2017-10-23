/**
 *
 *	Action creators that affect the expenses section of the store. It is a map of project IDs to arrays of expense objects.
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
 *	down the line after we we call handleSuccess. This could lead to a large number of errors
 *	occurring/subsequently cascading and should be avoided.
 *
**/


import ApiCall from '../utils/serverCalls';


// helper
const getProjCost = (state, projID) => (
	state()
		.expenses[projID]
		.reduce((total, expense) => total + Number(expense.cost), 0)
);


// reset section of store
export const clearExpenses = () => ({ type: 'CLEAR_EXPENSES' });


// create a single expense linked to projID in server and store
export const createExpense = (expense, projID) => (
	(dispatch, getState) => ApiCall
		.createExpense(expense, projID)
		.then(
			res => res,
			err => console.error(err)
		)
		.then(res => {
			if (res) {
				dispatch({ type: 'HYDRATE_EXPENSES', expenses: res.data });
				
				let cost = getProjCost(getState, projID);

				// update expenses in editProject section of store and total cost in project section
				dispatch({ type: 'UPDATE_EDIT_EXPENSES', dehydrate: [], hydrate: res.data });
				dispatch({ type: 'UPDATE_PROJECT_COST', projID, cost });	
			}
		})
);


// remove expense w/ id linked to projID from store
export const dehydrateExpense = (id, projID) => ({ type: 'DEHYDRATE_EXPENSES', id, projID });


// remove expense w/ id linked to projID from server and store
export const deleteExpense = (id, projID) => (
	(dispatch, getState) => ApiCall
		.deleteExpense(id, projID)
		.then(
			res => res,
			err => console.error(err)
		)
		.then(res => {
			if (res) {
				dispatch({ type: 'DEHYDRATE_EXPENSE', id, projID });
				
				let cost = getProjCost(getState, projID);

				dispatch({ type: 'UPDATE_EDIT_EXPENSES', dehydrate: [ id ], hydrate: [] });
				dispatch({ type: 'UPDATE_PROJECT_COST', projID, cost });
			}
		})
);


// load expenses w/ projID in projIDs from server into store
export const getExpenses = projIDs => {

	// while seemingly pointless this makes the expenses section of the store
	// indicate it is loaded and that this action does not need to run again
	if (!projIDs.length) {
		return dispatch => dispatch({ type: 'HYDRATE_EXPENSES', expenses: [] });
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


// load array of expenses into store
export const hydrateExpenses = expenses => ({ type: 'HYDRATE_EXPENSES', expenses });


// create multiple expenses w/ projID in server and store
export const parseCSV = (expenses, projID) => (
	(dispatch, getState) => ApiCall
		.createExpense(expenses, projID)
		.then(
			res => res,
			err => console.error(err)
		)
		.then(res => {
			if (res) {
				dispatch({ type: 'HYDRATE_EXPENSES', expenses: res.data });
				
				let cost = getProjCost(getState, projID);
				
				dispatch({ type: 'UPDATE_EDIT_EXPENSES', dehydrate: [], hydrate: res.data });
				dispatch({ type: 'UPDATE_PROJECT_COST', projID, cost });
			}
		})
);

