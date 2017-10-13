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

ApiCall.login = (username, password) => axios.post('/login', { username, password });

//for creating a new organization/admin
ApiCall.registerOrg = (orgName, username, password) => axios.post('/createOrganization', { orgName, username, password });

//attach our token to all axios requests
ApiCall.setToken = () => axios.defaults.headers.Authorization = 'Bearer ' + sessionStorage.token;



//-------------------------------
//        get extant data
//-------------------------------

ApiCall.getExpenses = projIds => axios.post('/api/get/expenses', { projIds });

ApiCall.getExpensesByProjectId = projId => axios.post('/api/get/proj', { projId });

ApiCall.getProjectByProjId = projId => axios.post('/api/get/proj', { projId });

ApiCall.getProjectsByOrgName = orgName => axios.post('/api/get/org', { orgName });



//------------------------------
//      create new data
//------------------------------

ApiCall.addBudget = budget => axios.post('/api/register/budget', budget);

ApiCall.parseCSV = (data, id) => axios.post('/api/register/csv', { data, id });

ApiCall.registerExpense = exp => axios.post('/api/register/expense', exp);

ApiCall.registerUser = (username, password, orgs_id, perm) => axios.post('/signup', { username, password, orgs_id, perm });

ApiCall.registerProject = proj => axios.post('/api/register/project', proj);



//------------------------------
//     update extant data
//------------------------------

ApiCall.changePassword = (username, password) => axios.post('/api/update/user', { username, password });

ApiCall.updateExpense = exp => axios.post('/api/update/expense', exp);

ApiCall.updateProjBudgets = list => axios.post('/api/update/budgets', list);

ApiCall.updateProject = (data, projId) => axios.post('/api/update/proj', data);

ApiCall.updateUser = user => axios.post('/api/update/user', user);



//------------------------------
//     delete extant data
//------------------------------

ApiCall.deleteBudget = id => axios.post('/api/remove/budget', { id });

ApiCall.removeExpense = exp => axios.post('/api/remove/expense', exp);



export default ApiCall;

