/**
 *
 *	Reducers for the projects section of our store
 *
**/


export default (state = [], action) => {
	
	switch (action.type) {

		case 'CLEAR_PROJECTS': {
			return [];
		}


		case 'DEHYDRATE_PROJECTS': {
			return state.filter(project => !action.IDs.includes(project.id));
		}	


		case 'HYDRATE_PROJECTS': {
			let projects = state.concat(action.projects);
			projects.sort((a, b) => a.name > b.name ? 1 : a.name < b.name ? -1 : 0);

			return projects;
		}


		case 'UPDATE_PROJECT_COST': {
			let projects = state.map(proj => {
				proj = Object.assign({}, proj);
				
				if (proj.id == action.projID) {
					proj.costToDate = action.cost;
				}

				return proj;
			});

			return projects;
		}


		default: {
			return state;
		}
	}
};

