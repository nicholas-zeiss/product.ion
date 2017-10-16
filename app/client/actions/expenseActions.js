/**
 *
 *	Action creators that effect the expenses section of the store
 *
**/


export function hydrateProjectExpenses(expenses) {
	return {
		type: 'HYDRATE_PROJECT_EXPENSES',
		expenses
	};
}


export function hydrateExpenses(projectId, id, expenses) {
	return {
		type: 'HYDRATE_EXPENSES',
		projectId,
		id,
		expenses
	};
}


export function getExpenses(id) {
	return {
		type: 'GET_EXPENSES',
		id
	};
}


export function getOrganizationProjects(orgName) {
	return {
		type: 'GET_ORG_PROJECTS',
		orgName
	};
}


export function getProjectExpenses(projIDs) {
	return {
		type: 'GET_PROJ_EXPENSES',
		projIDs
	};
}


export function postNewExpense(singleExpense, projID) {
	return {
		type: 'NEW_EXPENSE',
		singleExpense,
		projID
	};
}


export function updateExpense(singleExpense, projID) {
	return {
		type: 'UPDATE_EXPENSE',
		singleExpense,
		projID
	};
}


export function updateProject(project) {
	return {type: 'UPDATE_PROJECT', project};
}


export function clearExpenses() {
	return {
		type: 'CLEAR_EXPENSES'
	};
}


export function removeExpense(singleExpense, projID) {
	return {
		type: 'REMOVE_EXPENSE',
		singleExpense,
		projID
	};
}


export function parseCSV(object, id) {
	console.log('object ', object);
	return {
		type: 'PARSE_CSV',
		object,
		id
	};
}

export function badCSV(message) {
	return {
		type: 'BAD_CSV',
		message
	};
}

