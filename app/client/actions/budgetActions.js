/**
 *
 *	Action creators that effect the budgets section of the store
 *
**/


export function hydrateProjectBudgets(id, list) {
	return {
		type: 'HYDRATE_PROJECT_BUDGETS',
		id,
		list
	};
}


export function getProjBudgets(projID) {
	return {
		type: 'GET_PROJECT_BUDGETS',
		projID
	};
}


export function postNewBudget(budget) {
	return {
		type: 'POST_NEW_BUDGET',
		budget
	};
}


export function updateMultipleBudgets(list) {
	return {
		type: 'UPDATE_MULTIPLE_BUDGETS',
		list
	};
}


export function deleteBudgetNode(node) {
	return {type:'DELETE_BUDGET_NODE', node};
}

