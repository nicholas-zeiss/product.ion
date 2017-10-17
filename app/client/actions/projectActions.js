/**
 *
 *	Action creators that effect the projects section of the store
 *
**/


export const clearProjects = () => ({ type: 'CLEAR_PROJECTS' });


export function hydrateProjects(projects) {
	return {
		type: 'HYDRATE_PROJECTS',
		projects
	};
}


export function getProject(projID) {
	return {
		type: 'GET_PROJECT',
		projID
	};
}


export function postNewProject(pitch) {
	return {
		type: 'POST_NEW_PROJECT',
		pitch
	};
}


export function updateProject(project) {
	return {type: 'UPDATE_PROJECT', project};
}


