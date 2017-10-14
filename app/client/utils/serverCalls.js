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

ApiCall.getProject = projId => axios.get('/api/proj/' + projId);

ApiCall.getProjects = projIds => axios.post('/api/proj', { projIds });

ApiCall.getOrg = orgName => axios.get('/api/org/' + orgName);



//------------------------------
//      create new data
//------------------------------

ApiCall.addBudget = budget => axios.post('/api/register/budget', budget);

ApiCall.addExpense = exp => axios.post('/api/register/expense', exp);

ApiCall.addProject = proj => axios.post('/api/register/project', proj);

ApiCall.addUser = (username, password, orgs_id, perm) => axios.post('/signup', { username, password, orgs_id, perm });

ApiCall.parseCSV = (data, id) => axios.post('/api/register/csv', { data, id });



//------------------------------
//     update extant data
//------------------------------

ApiCall.updateExpense = exp => axios.post('/api/update/expense', exp);

ApiCall.updatePassword = (username, password) => axios.post('/api/update/user', { username, password });

ApiCall.updateProject = (data, projId) => axios.post('/api/update/proj', data);

ApiCall.updateProjectBudgets = list => axios.post('/api/update/budgets', list);

ApiCall.updateUser = user => axios.post('/api/update/user', user);



//------------------------------
//     delete extant data
//------------------------------

ApiCall.deleteBudget = id => axios.post('/api/remove/budget', { id });

ApiCall.deleteExpense = exp => axios.post('/api/remove/expense', exp);



export default ApiCall;

