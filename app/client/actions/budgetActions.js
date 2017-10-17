/**
 *
 *	Action creators that effect the budgets section of the store
 *
**/


export const clearBudgets = () => ({ type: 'CLEAR_BUDGETS' });


export const createBudgets = budgets => ({ type: 'CREATE_BUDGETS', budgets });


export const dehydrateBudgets = ids => ({ type: 'DEHYDRATE_BUDGETS', ids });


export const deleteBudget = id => ({ type:'DELETE_BUDGET', id });


export const getBudgets = projIDs => ({ type: 'GET_BUDGETS', projIDs });


export const hydrateBudgets = budgets => ({ type: 'HYDRATE_BUDGETS', budgets });


export const updateBudgets = budgets => ({ type: 'UPDATE_BUDGETS', budgets });

