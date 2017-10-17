/**
 *
 *	Action creators that effect the projects section of the store
 *
**/


export const clearProjects = () => ({ type: 'CLEAR_PROJECTS' });


export const createProject = project => ({ type: 'POST_NEW_PROJECT', project });


export const hydrateProjects = projects => ({ type: 'HYDRATE_PROJECTS', projects });


export const updateProject = project => ({ type: 'UPDATE_PROJECT', project });


