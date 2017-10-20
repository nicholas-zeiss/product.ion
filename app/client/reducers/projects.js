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
			return state.filter(project => !action.ids.includes(project.id));
		}	

		case 'HYDRATE_PROJECTS': {
			return state.concat(action.projects);
		}

		default: {
			return state;
		}
	}
};

