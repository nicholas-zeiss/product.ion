/**
 *
 *	Reducers for the organization section of our store
 *
**/


export const defaultOrganizationState = Object.freeze({
	id: null,
	name: null,
	user: null,
	users: []
});

	
export default (state = defaultOrganizationState, action) => {

	switch (action.type) {

		case 'ADD_USER': {
			return Object.assign({}, state, { users: state.users.concat(action.user)});
		}

		case 'CLEAR_ORGANIZATION': {
			return defaultOrganizationState;
		}

		case 'HYDRATE_ORGANIZATION': {
			return Object.assign({}, state, action.organization);
		}


		case 'REHYDRATE_USER': {
			return Object.assign({}, state, { users: state.users.map(user => user.id == action.user.id ? Object.assign({}, user, action.user) : user)});
		}

		case 'REMOVE_USER': {
			return Object.assign({}, state, { users: state.users.filter(user => user.id != action.id) });
		}

		default: {
			return state;
		}
	}
};

