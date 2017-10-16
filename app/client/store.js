/**
 *
 *	Define our initial state for the redux store, import all our reducers, creat the store and export it
 *
 *	Our store is split into the following sections:
 *
 *		budgets - unapproved expenses linked to a project
 *		expenses - a collection of all expenses for all projects in the organization
 *		organization - holds data about the organization (name, ID, users list) and the logged in user
 *		projects - a collection of all projects in the organization
 *		UI - view state that is not local to a single react component, such as whether to display a modal, error messages, etc.
 *
**/


import { browserHistory } from 'react-router';
import { syncHistoryWithStore, routerMiddleware} from 'react-router-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import rootReducer from './reducers/index';


const defaultState = {
	budgets: {},
	expenses: {},
	organization: {
		orgID: null,
		orgName: null,
		user: null,
		users: []
	},
	projects: {},
	UI: {
		modals: {
			addUser: false,
			pitch: false,
			pitchProject: null
		},
		messages: {
			pitch: '',
			username: ''
		}
	}
};


const middleware = applyMiddleware(routerMiddleware(browserHistory), reduxThunk);
const store = createStore(rootReducer, defaultState, middleware);
const history = syncHistoryWithStore(browserHistory, store);


export { history, store };

