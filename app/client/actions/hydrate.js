/**
 *
 *	Action creators for actions used hydrate the redux store
 *
**/


export function hydrateExpenses(projectId, id, expenses) {
	return {
		type: 'HYDRATE_EXPENSES',
		projectId,
		id,
		expenses
	};
}


export function hydrateOrganization(orgID, orgName, user, users) {
	return {
		type: 'HYDRATE_ORGANIZATION',
		orgName,
		orgID,
		user,
		users
	};
}


export function hydrateProjectBudgets(id, list) {
	return {
		type: 'HYDRATE_PROJECT_BUDGETS',
		id,
		list
	};
}


export function hydrateProjectExpenses(expenses) {
	return {
		type: 'HYDRATE_PROJECT_EXPENSES',
		expenses
	};
}


export function hydrateProjects(projects) {
	return {
		type: 'HYDRATE_PROJECTS',
		projects
	};
}

