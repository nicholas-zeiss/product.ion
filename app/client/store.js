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
import { routerMiddleware, routerReducer, syncHistoryWithStore } from 'react-router-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import reduxThunk from 'redux-thunk';

import budgetsReducer, { defaultBudgetsState } from './reducers/budgets';
import editProjectReducer, { defaultEditProjectState } from './reducers/editProject';
import expensesReducer, { defaultExpensesState } from './reducers/expenses';
import organizationReducer, { defaultOrganizationState } from './reducers/organization';
import projectsReducer from './reducers/projects';
import UIReducer, { defaultUIState } from './reducers/UI';


const defaultState = {
	budgets: defaultBudgetsState,
	editProject: defaultEditProjectState,
	expenses: defaultExpensesState,
	organization: defaultOrganizationState,
	projects: [],
	UI: defaultUIState
};


const rootReducer = combineReducers({
	budgets: budgetsReducer,
	editProject: editProjectReducer,
	expenses: expensesReducer,
	organization: organizationReducer,
	projects: projectsReducer,
	routing: routerReducer,
	UI: UIReducer
});


const middleware = applyMiddleware(routerMiddleware(browserHistory), reduxThunk);
const store = createStore(rootReducer, defaultState, middleware);
const history = syncHistoryWithStore(browserHistory, store);


export { history, store };

