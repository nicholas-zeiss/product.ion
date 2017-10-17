/**
 *
 *	Action creators that effect the budgets section of the store
 *
**/


export const clearBudgets = () => ({ type: 'CLEAR_BUDGETS' });


export function deleteBudget(budgetID) {
	return {
		type:'DELETE_BUDGET',
		budgetID
	};
}


export function getProjectBudgets(projID) {
	return {
		type: 'GET_PROJECT_BUDGETS',
		projID
	};
}


export function hydrateProjectBudgets(projID, budgets) {
	return {
		type: 'HYDRATE_PROJECT_BUDGETS',
		budgets,
		projID
	};
}


export function postNewBudget(budget) {
	return {
		type: 'POST_NEW_BUDGET',
		budget
	};
}


export function updateMultipleBudgets(budgets) {
	return {
		type: 'UPDATE_MULTIPLE_BUDGETS',
		budgets
	};
}

