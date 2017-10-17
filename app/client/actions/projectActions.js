/**
 *
 *	Action creators that effect the projects section of the store
 *
 *  Some async action creaters have a seemingly illogical syntax of 
 *		asyncServerCall()
 *			.then(res => res, err => handleError())			//where handleError does not return a value
 *			.then(res => if (res) handleSuccess())
 *
 *	as opposed to a more intuitive
 *		asyncServerCall()
 *			.then(res => handleSuccess())
 *			.catch(err => handleError())
 *
 *	This is because catch would be called both for an HTTP error and an error incurred anywhere
 *	down the line after we we call handleSuccess. This could lead to a large number of errors
 *	occurring/subsequently cascading and should be avoided.
 *
**/


import ApiCall from '../utils/serverCalls';


export const clearProjects = () => ({ type: 'CLEAR_PROJECTS' });


export const createProject = project => (
	dispatch => ApiCall
		.createProject(project)
		.then(
			res => res,
			err => console.error(err)
		)
		.then(res => {
			if (res) {
				dispatch({ type: 'HYDRATE_PROJECTS', projects: [ res.data ] });
			}
		})
);


export const dehydrateProjects = ids => ({ type: 'DEHYDRATE_PROJECTS', ids });


export const hydrateProjects = projects => ({ type: 'HYDRATE_PROJECTS', projects });


export const updateProject = project => (
	dispatch => ApiCall
		.updateProject(project)
		.then(
			res => res,
			err => console.error(err)
		)
		.then(res => {
			if (res) {
				dispatch({ type: 'HYDRATE_PROJECTS', projects: [ res.data ] });
			}
		})
);

