/**
 *
 *  Component for the pitch modal, which allows you to create a new pitch or edit an existing one.
 *	The vast majority of the actual view for the modal is rendered in PitchSummary and Budgets;
 *	this component acts as a controller.
 *
**/


import React from 'react';
import { Tab, Tabs } from 'react-bootstrap';

import Budgets from './Budgets';
import PitchSummary from './PitchSummary';

import { approvalStringOrder } from '../utils/projectUtils';


class Pitch extends React.Component {
	constructor(props) {
		super(props);

		// budgets holds the array of budget items we actually display
		// we track which of these have just been created, and what original budgets
		// were deleted so that we can updated our store/the server with the changes
		this.state = {
			activeTab: 1,
			budgets: props.editProject.budgets,
			budgetsToCreate: [],
			budgetsToDelete: [],
			newProject: !props.editProject.project.id,		// new projects lack IDs as IDs are created by database
			project: props.editProject.project
		};
	}

	
	// when the client attempts to submit changes made in the modal
	handlePitchSubmit(e) {
		e.preventDefault();

		// to avoid mutating state
		let project = Object.assign({}, this.state.project);

		// if everything is approved and user is admin/producer, move the project pitch into production
		if (project.approvals == '1111111111' && this.props.organization.user.permissions != 'user') {
			project.status = 'Production';
		}


		if (this.state.newProject) {
			this.props.createProject(project, this.state.budgetsToCreate);

		} else {
			this.props.updateProject(project);
			
			if (this.state.budgetsToCreate.length || this.state.budgetsToDelete.length) {
				this.updateBudgets();
			}
		}


		this.props.clearEditProject();
		this.props.closePitchModal();	
	}


	// Used on existing projects, not projects created in modal. When creating a new project
	// budgets are handled by the createProject action called in handlePitchSubmit.
	updateBudgets() {
		let	projID = this.state.project.id;
		
		if (this.state.budgetsToCreate.length) {
			this.state.budgets.forEach(b => b.projID = projID);
			this.props.createBudgets(this.state.budgetsToCreate, projID);
		}

		if (this.state.budgetsToDelete.length) {
			this.props.deleteBudgets(this.state.budgetsToDelete, projID);
		}
	}


	handleTabSelect(key) {
		this.setState({	activeTab: key });
	}


	handleProjAttrChange(e) {
		// reset non unique name error message
		if (e.target.name == 'name' && this.props.UI.messages.projectName) {
			this.props.setMessages({ projectName: '' });
		}

		this.setState({ 
			project: Object.assign({}, this.state.project, { [e.target.name]: e.target.value }) 
		});
	}


	handleApprovalChange(attr) {
		let approvals = this.state.project.approvals;
		let index = approvalStringOrder.indexOf(attr);

		let newApproval = approvals[index] == '1' ? '0' : '1';

		approvals = approvals.slice(0, index) + newApproval + approvals.slice(index + 1);
	
		this.setState({ 
			project: Object.assign({}, this.state.project, { approvals })
		});
	}


	// add a budget item
	addBudget(budget, e) {
		e.preventDefault();

		this.setState({
			budgets: this.state.budgets.concat(budget),
			budgetsToCreate: this.state.budgetsToCreate.concat(budget)
		}, this.updateReqBudget);
	}


	// delete a budget item
	deleteBudget(budget, e) {
		e.preventDefault();

		let budgets = this.state.budgets.slice();
		let budgetsToCreate = this.state.budgetsToCreate.slice();
		let budgetsToDelete = this.state.budgetsToDelete.slice();

		// if id exists, budget exists in server and we must delete it on submitting project
		// if not, simply remove it from list of budgets to create
		if (budget.id != undefined) {
			budgetsToDelete.push(budget.id);
		} else {
			budgetsToCreate = budgetsToCreate.filter(b => b != budget);
		}

		budgets = budgets.filter(b => b != budget);

		this.setState({ budgets, budgetsToCreate, budgetsToDelete}, this.updateReqBudget);
	}


	updateReqBudget() {
		let reqBudget = this.state.budgets.reduce((total, budget) => total + budget.total, 0);

		this.setState({
			project: Object.assign({}, this.state.project, { reqBudget })
		});
	}


	render() {
		return (
			<Tabs
				activeKey={ this.state.activeTab }
				id='pitchTabs'
				onSelect={ this.handleTabSelect.bind(this) }
			>
				<Tab eventKey={ 1 } title='Pitch'>
					<PitchSummary
						budgetTab={ this.handleTabSelect.bind(this, 2) }
						errorMessage={ this.props.UI.messages.projectName }
						handleApprovalChange={ this.handleApprovalChange.bind(this) }
						handleAttrChange={ this.handleProjAttrChange.bind(this) }
						handlePitchSubmit={ this.handlePitchSubmit.bind(this) }
						newProject={ this.state.newProject }
						project={ this.state.project }
						userType={ this.props.organization.user.permissions }
					/>
				</Tab>
				
				<Tab eventKey={ 2 } title='Budget'>
					<Budgets
						addBudget={ this.addBudget.bind(this) }
						approved={ this.state.project.approvals[5] == '1' }
						budgets={ this.state.budgets }
						deleteBudget={ this.deleteBudget.bind(this) }
						reqBudget={ this.state.project.reqBudget }
					/>
				</Tab>
			</Tabs>
		);
	}
}


export default Pitch;

