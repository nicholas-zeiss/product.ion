

import { createStore, applyMiddleware } from 'redux';
import { syncHistoryWithStore, routerMiddleware} from 'react-router-redux';
import { browserHistory } from 'react-router';

// import the root reducer
import rootReducer from './reducers/index';


// create objects for the default data
const projects = [];
const budgets = {};
const expenses = {};
const organization = {};
const messages = {
	csv: "",
	pitch: "",
	registerOrg: "",
	registerUser: "",
	password: '',
	username: ''
};
const modals = {
	pitch: false,
	addUser: false,
	csv: false
};
const parseCSV = [];
// this state shall be passed from smart to dumb components.
const defaultState = {
	projects,
	budgets,
	expenses,
	organization,
	messages,
	modals,
	parseCSV
};

//middleware for logging changes in state.
// const middleware = applyMiddleware(logger());
const middleware = applyMiddleware(routerMiddleware(browserHistory));
const store = createStore(rootReducer, defaultState, middleware);
const history = syncHistoryWithStore(browserHistory, store);


export { history, store };

