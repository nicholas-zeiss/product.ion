/**
 *
 *	Creates the root of our react app and inserts it into the DOM. Imports the action creators
 *  and binds them to redux, connects redux to react, and maps urls to components for react-router.
 *
**/


import React from 'react';
import { render } from 'react-dom';
import { IndexRoute, Route, Router } from 'react-router';
import { Provider } from 'react-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


//-------------------------------
//			  Action Creators
//-------------------------------
import * as budgetActions from './actions/budgetActions';
import * as editProjectActions from './actions/editProjectActions';
import * as expenseActions from './actions/expenseActions';
import * as organizationActions from './actions/organizationActions';
import * as projectActions from './actions/projectActions';
import * as UIActions from './actions/UIActions';


//-------------------------------
//			  React Components
//-------------------------------
import App from './components/App';
import Dashboard from './components/Dashboard';
import Expenses from './components/Expenses';
import Login from './components/Login';
import MasterSheet from './components/MasterSheet';
import Projects from './components/Projects';
import Register from './components/Register';
import Settings from './components/Settings';


//-------------------------------
//            Store
//-------------------------------
import { history, store } from './store';


const actions = Object.assign({}, budgetActions, editProjectActions, expenseActions, organizationActions, projectActions, UIActions);

const mapDispachToProps = dispatch => bindActionCreators(actions, dispatch);

const mapStateToProps = state => ({
	budgets: state.budgets,
	editProject: state.editProject,
	expenses: state.expenses,
	organization: state.organization,
	projects: state.projects,
	UI: state.UI
});

// takes the component App which holds all visible components and connects to store, returns wrapped component
const reduxWrapper = connect(mapStateToProps, mapDispachToProps)(App);


const production = (
	<Provider store={ store }>
		<Router history={ history }>
			<Route component={ reduxWrapper } path='/'>
				<IndexRoute component={ Login }></IndexRoute>
				<Route component={ Register } path='/register'></Route>
				<Route component={ Login } path='/login'></Route>
				<Route component={ Dashboard } path='/dashboard'></Route>
				<Route component={ Expenses } path='/expenses'></Route>
				<Route component={ Settings } path='/settings'></Route>
				<Route component={ MasterSheet } path='/mastersheet'></Route>
				<Route component={ Projects } path='/projects'></Route>
			</Route>
		</Router>
	</Provider>
);


render(production, document.getElementById('root'));

