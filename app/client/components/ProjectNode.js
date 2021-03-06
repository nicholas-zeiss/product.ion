/**
 *
 *  Dumb component that renders individual projects. When clicked, if client has ownership of 
 *  project or is producer/admin, allows for editing.
 *
**/


import React from 'react';
import { browserHistory } from 'react-router';

import { moneyString } from '../utils/misc';


const ProjectNode = props => {

	// shorthand
	let project = props.project;


	let estimateToComplete = () => {
		if (project.costToDate > project.reqBudget) {
			return 'Already overbudget';

		} else {
			return moneyString(project.reqBudget - project.costToDate);
		}
	};
	

	let editProject = () => {
		let user = props.organization.user;

		// only allow editing if client created project or is admin/producer
		if (project.userID == user.id || user.permissions != 'user') {
			let budgets = props.budgets[project.id] || [];
			let expenses = props.expenses[project.id] || [];

			props.setEditProject(budgets, expenses, project.id, project);

			if (project.status == 'Pitch') {
				props.togglePitchModal();
			} else {
				browserHistory.push('/expenses');
			}
		}
	};


	// find the username of the account in the organization that created this project, if it exists
	// as users can be deleted sometimes the user will not exist
	let createdBy = props.organization.users.find(user => user.id == project.userID);
	createdBy = createdBy ? createdBy.username : '?';

	return (
		<tr id='readOnlyBody' onClick={ editProject }>
			<td>{ project.name }</td>
			<td>{ project.id }</td>
			<td>{ createdBy }</td>
			<td>{ project.status }</td>
			<td>{ moneyString(project.costToDate) }</td>
			<td>{ estimateToComplete() }</td>
		</tr>
	);
};


export default ProjectNode;

