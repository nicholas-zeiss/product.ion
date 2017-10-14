/**
 *
 *  Here we set up our server calls
 *
**/

import axios from 'axios';

const ApiCall = {};


//-------------------------------
//        authorization
//-------------------------------

//when app reloads and a token is present, this is called to verify the token is valid and
//associated with the current username
ApiCall.checkToken = token => axios.post('/token', { token });

ApiCall.login = (username, password) => (
	axios.post('/login', { 
		username,
		password
	})
);

//for creating a new organization/admin
ApiCall.registerOrganization = (orgName, username, password) => (
	axios.post('/createOrganization', { 
		orgName,
		username,
		password 
	})
);

//attach our token to all axios requests
ApiCall.setToken = () => axios.defaults.headers.Authorization = 'Bearer ' + sessionStorage.token;



//-------------------------------
//      get extant data
//-------------------------------

ApiCall.getProject = projID => axios.get('/api/project/' + projID);

ApiCall.getProjects = projIDs => axios.post('/api/project', { projIDs });

ApiCall.getOrganization = orgName => axios.get('/api/organization/' + orgName);



//------------------------------
//      create new data
//------------------------------

ApiCall.addBudget = budget => axios.post('/api/budget', budget);

ApiCall.addExpense = expense => axios.post('/api/expense', expense);

ApiCall.addProject = project => axios.post('/api/project', project);

ApiCall.addUser = (username, password, orgID, permissions) => (
	axios.post('/api/user', { 
		username,
		password,
		orgID,
		permissions
	})
);

ApiCall.parseCSV = (data, id) => axios.post('/api/csv', { data, id });



//------------------------------
//     update extant data
//------------------------------

ApiCall.updateExpense = exp => axios.post('/api/expense', exp);

ApiCall.updatePassword = (username, password) => axios.post('/api/user', { username, password });

ApiCall.updateProject = (data, projID) => axios.post('/api/project', data);

ApiCall.updateProjectBudgets = budgets => axios.post('/api/budgets', budgets);

ApiCall.updateUser = user => axios.post('/api/user', user);



//------------------------------
//     delete extant data
//------------------------------

ApiCall.deleteBudget = id => axios.post('/api/budget', { id });

ApiCall.deleteExpense = exp => axios.post('/api/expense', exp);



export default ApiCall;

