/**
 *
 *	Action creators for the section of our store holding the project being edited
 *
**/


export const clearEditProject = () => ({ type: 'CLEAR_EDIT_PROJECT' });


export const newEditProject = (orgID, userID) => ({ type: 'NEW_EDIT_PROJECT', orgID, userID });


export const setEditProject = (budgets, expenses, id, project) => ({ 
	type: 'SET_EDIT_PROJECT',
	budgets,
	expenses,
	id,
	project
});

