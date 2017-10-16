/**
 *
 *	Define our initial state for the redux store, import all our reducers, creat the store and export it
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
	projects: {},
	organization: {},
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

