


export function getExpenses(projectId, id) {
	return {
		type: 'GET_EXPENSES',
		projectId,
		id
	};
}

export function getOrganizationProjects(orgName) {
	return {
		type: 'GET_ORG_PROJECTS',
		orgName
	};
}

export function getProject(projID) {
	return {
		type: 'GET_PROJECT',
		projID
	};
}

export function getProjBudgets(projID) {
	return {
		type: 'GET_PROJECT_BUDGETS',
		projID
	};
}

export function getProjectExpenses(projIDs) {
	return {
		type: 'GET_PROJ_EXPENSES',
		projIDs
	};
}





export function addNewOrg(orgName, username, password) {
	return {
		type: 'ADD_NEW_ORG',
		orgName,
		username,
		password
	};
}

export function addNewUser(username, password, orgs_id, perm) {
	return {
		type: 'ADD_NEW_USER',
		username,
		password,
		orgs_id,
		perm
	};
}

export function postNewBudget(budget) {
	return {
		type: 'POST_NEW_BUDGET',
		budget
	};
}

export function postNewExpense(singleExpense, projID) {
	return {
		type: 'NEW_EXPENSE',
		singleExpense,
		projID
	};
}

export function postNewProject(pitch) {
	return {
		type: 'POST_NEW_PROJECT',
		pitch
	};
}






export function toggleModal(name) {
	return {
		type: 'TOGGLE_MODAL',
		name
	};
}


export function updateExpense(singleExpense, projID) {
	return {
		type: 'UPDATE_EXPENSE',
		singleExpense,
		projID
	};
}

export function updateMultipleBudgets(list) {
	return {
		type: 'UPDATE_MULTIPLE_BUDGETS',
		list
	};
}

export function updateProject(project) {
	return {type: 'UPDATE_PROJECT', project};
}

export function updateUser(user) {
	return {
		type: 'UPDATE_USER',
		user
	};
}

export function changePassword(username, password, newPassword) {
	return {
		type: 'CHANGE_PASSWORD',
		username,
		password,
		newPassword
	};
}





export function clearExpenses() {
	return {
		type: 'CLEAR_EXPENSES'
	};
}

export function clearProjects() {
	return {
		type: 'CLEAR_PROJECTS'
	};
}

export function deleteBudgetNode(node) {
	return {type:'DELETE_BUDGET_NODE', node};
}

export function deleteUser(user) {
	return {
		type: 'DELETE_USER',
		user
	};
}

export function removeExpense(singleExpense, projID) {
	return {
		type: 'REMOVE_EXPENSE',
		singleExpense,
		projID
	};
}



export function setUsers(users) {
	return {
		type: 'SET_USERS',
		users
	};
}

export function setCurrentExpenseProject(expenses) {
	return {type: 'SET_CURRENT_EXPENSE_PROJECT', expenses};
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

