/**
 *
 *	Reducers for the projects section of our store
 *
**/


import ApiCall from '../utils/serverCalls';
import { store } from '../store';


export default (state = [], action) => {
	
	switch (action.type) {


		case 'CLEAR_PROJECTS': {
			return [];
		}


		case 'CREATE_PROJECT': {
			ApiCall
				.createProject(action.project)
				.then(res => {
					store.dispatch({ type: 'HYDRATE_PROJECTS', projects: [ res.data ] });
				})
				.catch(err => {
					console.error(err);
				});

			return state;
		}
		

		case 'DEHYDRATE_PROJECTS': {
			return state.filter(project => !action.ids.includes(project.id));
		}
			

		case 'HYDRATE_PROJECTS': {
			return state.concat(action.projects);
		}


		case 'UPDATE_PROJECT': {
			ApiCall
				.updateProject(action.project)
				.then(res => {
					store.dispatch({ type: 'HYDRATE_PROJECTS', projects: [ res.data ] });
				})
				.catch(err => {
					console.error(err);
				});

			return state;
		}


		default: {
			return state;
		}
	}
};

