

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actionCreators from '../actions/actionCreators';
import * as authActions from '../actions/auth';
import * as hydrateActions from '../actions/hydrate';

import Main from './Main';

function mapStateToProps(state) {
	return {
		organization: state.organization,
		projects: state.projects,
		budgets: state.budgets,
		expenses: state.expenses,
		messages: state.messages,
		modals: state.modals,
		navBar: state.navBar,
		csv: state.parseCSV
	};
}

let actions = Object.assign({}, actionCreators, authActions, hydrateActions);

function mapDispachToProps(dispatch) {
	return bindActionCreators(actions, dispatch);
}

const App = connect(mapStateToProps, mapDispachToProps)(Main);

export default App;
