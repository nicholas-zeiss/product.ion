




export function addNewOrg(orgName, username, password) {
	return {
		type: 'ADD_NEW_ORG',
		orgName,
		username,
		password
	};
}

export function changeNavKey(key) {
	return {
		type: 'CHANGE_NAV_KEY',
		key
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

export function updateUser(user) {
	return {
		type: 'UPDATE_USER',
		user
	};
}

export function deleteUser(user) {
	return {
		type: 'DELETE_USER',
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


export function clearExp() {
	return {
		type: 'CLEAR_EXP'
	};
}

export function clearProj() {
	return {
		type: 'CLEAR_PROJ'
	};
}


export function setUsers(users) {
	return {
		type: 'SET_USERS',
		users
	};
}
//PROJECTS:

//get a list of an organizations Projects

export function postNewProject(pitch) {
	return {
		type: 'POST_NEW_PROJECT',
		pitch
	};
}

export function getOrgProjects(orgName) {
	return {
		type: 'GET_ORG_PROJECTS',
		orgName
	};
}


export function getProjExpenses(projIDs) {
	return {
		type: 'GET_PROJ_EXPENSES',
		projIDs
	};
}

export function getProject(projID) {
	return {
		type: 'GET_PROJECT',
		projID
	};
}

export function changeModal(name) {
	return {
		type: 'CHANGE_MODAL',
		name
	};
}

export function updateProject(project) {
	return {type: 'UPDATE_PROJECT', project};
}

//Expenses:

export function getExpenses(projectId, id) {
	return {
		type: 'GET_EXPENSES',
		projectId,
		id
	};
}


export function postNewExpense(singleExpense, projID) {
	return {
		type: 'NEW_EXPENSE',
		singleExpense,
		projID
	};
}

export function removeExpense(singleExpense, projID) {
	return {
		type: 'REMOVE_EXPENSE',
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

export function setCurrentExpenseProject(expenses) {
	return {type: 'SET_CURRENT_EXPENSE_PROJECT', expenses};
}


export function postNewBudget(budget) {
	return {
		type: 'POST_NEW_BUDGET',
		budget
	};
}

export function getProjBudgets(projID) {
	return {
		type: 'GET_PROJECT_BUDGETS',
		projID
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
// CSV PARSING:

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

