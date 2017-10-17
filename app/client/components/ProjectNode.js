/**
 *
 *  Dumb component that renders individual projects. When clicked, if client has ownership of 
 *  project or is producer/admin, allows for editing.
 *
**/


import React from 'react';


const ProjectNode = props => {

	let numToDollar = num => '$' + num.toFixed(2);


	let estimateToComplete = () => {
		if (props.project.costToDate > props.project.reqBudget) {
			return 'Already overbudget';

		} else {
			return numToDollar(props.project.reqBudget - props.project.costToDate);
		}
	};
	

	let setProject = () => {
		let user = props.organization.user;

		//only allow editing if user either created project or is admin/producer
		if (props.project.userID == user.id || user.permissions != 'user') {
			
			if (props.project.status == 'Pitch') {
				props.viewPitchModal(props.project.id);
			} else {
				props.viewExpenses(props.project.id);
			}
		
		}
	};


	//find the username of the account in the organization that created this project, if it exists
	//as users can be deleted sometimes the user will not exist
	let createdBy = props.organization.users.find(user => user.id == props.project.userID);
	createdBy = createdBy ? createdBy.username : '?';

	return (
		<tr id='readOnlyBody' onClick={ setProject }>
			<td>{ props.project.name }</td>
			<td>{ props.project.id }</td>
			<td>{ createdBy }</td>
			<td>{ props.project.status }</td>
			<td>{ numToDollar(props.project.costToDate) }</td>
			<td>{ estimateToComplete() }</td>
		</tr>
	);
};


export default ProjectNode;

