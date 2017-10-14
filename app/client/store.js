

import { createStore, applyMiddleware } from 'redux';
import { syncHistoryWithStore, routerMiddleware} from 'react-router-redux';
import { browserHistory } from 'react-router';

// import the root reducer
import rootReducer from './reducers/index';


// create objects for the default data
const projects = [];
const budgets = {};
		//budgets{proj15: []}
const expenses = {};
const organization = {};
const messages = {
	csv: "",
	login: "",
	register: "",
	pitch: "",
	registerOrg: "",
	registerUser: "",
	password: ""
};
const modals = {
	pitch: false,
	addUser: false,
	csv: false
};
const navBar = {
	key: 1
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
	navBar,
	parseCSV
};

//middleware for logging changes in state.
// const middleware = applyMiddleware(logger());
const middleware = applyMiddleware(routerMiddleware(browserHistory));
const store = createStore(rootReducer, defaultState, middleware);
const history = syncHistoryWithStore(browserHistory, store);


export { history, store };

