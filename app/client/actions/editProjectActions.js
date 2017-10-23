/**
 *
 *	Action creators for the section of our store holding the project being edited, either in the pitch modal or expenses view. It
 *	holds a copy of the project and arrays of copies of the budgets, expenses for the project. These will be changed here and 
 *	according to user input and the changes will be applied in batch.
 *
**/


// reset this section of the store
export const clearEditProject = () => ({ type: 'CLEAR_EDIT_PROJECT' });


// create a blank project template
export const newEditProject = (orgID, userID) => ({ type: 'NEW_EDIT_PROJECT', orgID, userID });


export const setEditProject = (budgets, expenses, id, project) => ({ 
	type: 'SET_EDIT_PROJECT',
	budgets,
	expenses,
	id,
	project
});


// updates the state with budgets/expenses from master budgets and expenses sections of store
// dehydrate is array of expense IDs, hydrate array of expense objects
export const updateEditExpenses = (expenses, dehydrate, hydrate) => ({
	type: 'UPDATE_EDIT_EXPENSES',
	dehydrate,
	hydrate 
});

