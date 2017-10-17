/**
 *
 *  Here we set up our server API calls
 *
**/


import axios from 'axios';


export default {


	//-------------------------------
	//        authorization
	//-------------------------------

	//when app reloads and a token is present, this is called to verify the token is valid 
	//and if so we receive the data to hydrate organization section of store
	checkToken: token => axios.post('/token', { token }),

	//send username/password, on success receive info to hydrate organization section of store
	login: (username, password) => axios.post('/login', { username, password}),

	//attach our token to all axios requests once we verify it
	setToken: token => axios.defaults.headers.Authorization = 'Bearer ' + token,

	//for creating a new organization/admin
	signup: (orgName, username, password) => axios.post('/signup', { orgName, username, password }),



	//------------------------------
	//      create data
	//------------------------------

	createBudgets: budgets => axios.post('/api/budgets', budgets),

	createExpenses: (expenses, projID) => axios.post('/api/expenses/' + projID, expenses),

	createProject: project => axios.post('/api/projects', project),

	createUser: user => axios.post('/api/users', user),



	//------------------------------
	//     		delete data
	//------------------------------

	deleteBudgets: IDs => axios.delete('/api/budgets/' + IDs.join('-')),

	deleteExpense: id => axios.delete('/api/expenses/' + id),



	//-------------------------------
	//      		get data
	//-------------------------------

	getBudgets: projIDs => axios.get('/api/budgets/' + projIDs.join('-')),

	getExpenses: projIDs => axios.get('/api/expenses/' + projIDs.join('-')),



	//------------------------------
	//     			update data
	//------------------------------

	updateBudget: (budget, id) => axios.patch('/api/budgets/' + id, budget),

	updateExpense: (expense, id) => axios.patch('/api/expenses/' + id, expense),

	updateProject: (project, id) => axios.patch('/api/projects/' + id, project),

	updateUser: (user, id) => axios.patch('/api/users/' + id, user),

};

