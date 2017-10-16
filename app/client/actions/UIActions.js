/**
 *
 *	Action creators that effect the  section of the store
 *
**/




export function setPasswordMessage(message) {
	return {
		type: 'SET_PASSWORD_MESSAGE',
		message
	};
}


export function setUserOrgMessage(message) {
	return {
		type: 'SET_USER/ORG_MESSAGE',
		message
	};
}


export function setCurrentExpenseProject(expenses) {
	return {type: 'SET_CURRENT_EXPENSE_PROJECT', expenses};
}


export function toggleModal(name) {
	return {
		type: 'TOGGLE_MODAL',
		name
	};
}

