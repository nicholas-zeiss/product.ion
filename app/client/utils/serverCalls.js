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

	createBudgets: budgets => axios.post('/api/budget', budgets),

	createExpenses: expenses => axios.post('/api/expense', expenses),

	createProject: project => axios.post('/api/project', project),

	createUser: user => axios.post('/api/user', user),



	//------------------------------
	//     		delete data
	//------------------------------

	deleteBudget: id => axios.delete('/api/budget/' + id),

	deleteExpense: id => axios.delete('/api/expense/' + id),

	deleteUser: id => axios.delete('/api/user/' + id),



	//-------------------------------
	//      		get data
	//-------------------------------

	getBudgets: projID => axios.get('/api/project/' + projID),

	getExpenses: projID => axios.get('/api/project/' + projID),



	//------------------------------
	//     			update data
	//------------------------------

	updateBudget: (budget, id) => axios.patch('/api/budget/' + id, budget),

	updateExpense: (expense, id) => axios.post('/api/expense/' + id, expense),

	updateProject: (project, id) => axios.post('/api/project/' + id, project),

	updateUser: (user, id) => axios.post('/api/user/' + id, user),

};

