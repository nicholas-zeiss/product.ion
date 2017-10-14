



import React from 'react';
import { render } from 'react-dom';
import { browserHistory, IndexRoute, Route, Router } from 'react-router';
import { Provider } from 'react-redux';

import App from './components/App';
import Dashboard from './components/Dashboard';
import Expenses from './components/Expenses';
import Login from './components/Login';
import MasterSheet from './components/MasterSheet';
import Projects from './components/Projects';
import Register from './components/Register';
import Settings from './components/Settings';

import { history, store } from './store';


// Provider tag exposes store to the entire application.
// that is why we wrap the entire router in the Provider.
// router must know about created store.
const router = (
	<Provider store={ store }>
		<Router history={ history }>
			<Route component={ App } path='/'>
				<IndexRoute component={ Login }></IndexRoute>
				<Route component={ Register } path='/register'></Route>
				<Route component={ Login } path='/login'></Route>
				<Route component={ Dashboard } path='/dashboard/:orgName'></Route>
				<Route component={ Expenses } path='/expenses'></Route>
				<Route component={ Settings } path='/settings'></Route>
				<Route component={ MasterSheet } path='/mastersheet'></Route>
				<Route component={ Projects } path='/projects'></Route>
			</Route>
		</Router>
	</Provider>
);

// we can render Main because we imported it.
render(router, document.getElementById('root'));

