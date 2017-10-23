/**
 *
 *	Action creators that affect the projects section of the store
 *
 *  Some async action creaters have a seemingly illogical syntax of 
 *		asyncServerCall()
 *			.then(res => res, err => handleError())			// where handleError does not return a value
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


// reset this section of store
export const clearProjects = () => ({ type: 'CLEAR_PROJECTS' });


// create project in server and store, along with attached budgets
export const createProject = (project, budgets) => (
	dispatch => ApiCall
		.createProject(project)
		.then(
			res => res,
			err => {
				dispatch({
					type: 'SET_MESSAGES',
					messages: { projectName: 'Unable to create project' }
				});
			}
		)
		.then(res => {
			if (res) {
				dispatch({ type: 'HYDRATE_PROJECTS', projects: [ res.data ] });
				
				if (budgets.length) {
					budgets.forEach(b => b.projID = res.data.id);
					
					ApiCall
						.createBudgets(budgets, res.data.id)
						.then(
							res => res,
							err => console.error(err)
						)
						.then(res => {
							if (res) {
								dispatch({ type: 'HYDRATE_BUDGETS', budgets: res.data });
							}
						});
				}
			}
		})
);


// remove projects from store
export const dehydrateProjects = IDs => ({ type: 'DEHYDRATE_PROJECTS', IDs });


// add projects to store
export const hydrateProjects = projects => ({ type: 'HYDRATE_PROJECTS', projects });


// update a projects total cost to date
export const updateProjectCost = (projID, cost) => ({ type: 'UPDATE_PROJECT_COST', projID, cost });


// update a project in server and store
export const updateProject = project => (
	dispatch => ApiCall
		.updateProject(project)
		.then(
			res => res,
			err => console.error(err)
		)
		.then(res => {
			if (res) {
				dispatch({ type: 'DEHYDRATE_PROJECTS', IDs: [ project.id ]});
				dispatch({ type: 'HYDRATE_PROJECTS', projects: [ res.data ] });
			}
		})
);

