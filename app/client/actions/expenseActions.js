/**
 *
 *	Action creators that effect the expenses section of the store
 *
**/


export const clearExpenses = () => ({ type: 'CLEAR_EXPENSES' });


export const createExpenses = expenses => ({ type: 'CREATE_EXPENSES', expenses });


export const dehydrateExpenses = ids => ({ type: 'DEHYDRATE_EXPENSES', ids });


export const deleteExpense = id => ({ type: 'DELETE_EXPENSE', id });


export const getExpenses = projIDs => ({ type: 'GET_EXPENSES', projIDs });


export const hydrateExpenses = expenses => ({ type: 'HYDRATE_EXPENSES', expenses });


export const updateExpense = expense => ({ type: 'UPDATE_EXPENSE', expense });

