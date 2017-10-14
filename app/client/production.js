



import React from 'react';
import { render } from 'react-dom';


// import components
import App from './components/App';
import Dashboard from './components/Dashboard';
import Expenses from './components/Expenses';
import Login from './components/Login';
import MasterSheet from './components/MasterSheet';
import Projects from './components/Projects';
import Register from './components/Register';
import Settings from './components/Settings';


// Set up routers
import { browserHistory, IndexRoute, Route, Router } from 'react-router';
import { Provider } from 'react-redux';
import store, { history } from './store';

// Provider tag exposes store to the entire application.
// that is why we wrap the entire router in the Provider.
// router must know about created store.
const router = (
	<Provider store={ store }>
		<Router history={ history }>
			<Route path='/' component={ App }>
				<IndexRoute component={ Login }></IndexRoute>
				<Route path='/register' component={ Register }></Route>
				<Route path='/login' component={ Login }></Route>
				<Route path='/dashboard/:orgName' component={ Dashboard }></Route>
				<Route path='/expenses' component={ Expenses }></Route>
				<Route path='/settings' component={ Settings }></Route>
				<Route path='/mastersheet' component={ MasterSheet }></Route>
				<Route path='/projects' component={ Projects }></Route>
			</Route>
		</Router>
	</Provider>
);

// we can render Main because we imported it.
render(router, document.getElementById('root'));

