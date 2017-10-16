/**
 *
 *	Combines the reducers specific to each section of our store
 *
**/


import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import budgets from './budgets';
import expenses from './expenses';
import organization from './organization';
import projects from './projects';
import UI from './UI';


const rootReducer = combineReducers({
	budgets,
	expenses,
	organization,
	projects,
	routing: routerReducer,
	UI
});

export default rootReducer;

