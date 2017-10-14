

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actionCreators from '../actions/actionCreators';
import * as authActions from '../actions/auth';
import * as hydrateActions from '../actions/hydrate';

import Main from './Main';

function mapStateToProps(state) {
	return {
		budgets: state.budgets,
		csv: state.parseCSV,
		expenses: state.expenses,
		messages: state.messages,
		modals: state.modals,
		navBar: state.navBar,
		organization: state.organization,
		projects: state.projects
	};
}

let actions = Object.assign({}, actionCreators, authActions, hydrateActions);

function mapDispachToProps(dispatch) {
	return bindActionCreators(actions, dispatch);
}

const App = connect(mapStateToProps, mapDispachToProps)(Main);

export default App;
