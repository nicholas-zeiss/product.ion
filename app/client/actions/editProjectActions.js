/**
 *
 *	Action creators for the section of our store holding the project being edited
 *
**/




export const clearEditProject = () => ({ type: 'CLEAR_EDIT_PROJECT' });


export const newEditProject = (orgID, userID) => ({ type: 'NEW_EDIT_PROJECT', orgID, userID });


// budgets and expenses are arrays of budget/expense objects, id is project id, project is project object
export const setEditProject = (budgets, expenses, id, project) => ({ 
	type: 'SET_EDIT_PROJECT',
	budgets,
	expenses,
	id,
	project
});


// dehydrate is array of expense IDs, hydrate array of expense objects
export const updateEditExpenses = (expenses, dehydrate, hydrate) => ({
	type: 'UPDATE_EDIT_EXPENSES',
	dehydrate,
	hydrate 
});

