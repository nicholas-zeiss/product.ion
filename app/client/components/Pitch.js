/**
 *
 *  Component for the pitch modal, which allows you to create a new pitch or edit an existing one.
 *	The vast majority of the actual view for the modal is rendered in PitchSummary and Budget;
 *	this component acts as a controller.
 *
**/


import React from 'react';
import { Tab, Tabs } from 'react-bootstrap';

import BudgetNode from './BudgetNode';
import PitchSummary from './PitchSummary';

import { categoryToGlcode } from '../data/public';
import { approvalStringOrder, budgetDefaults } from '../utils/projectUtils';


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
			newBudget: budgetDefaults(),
			newProject: !props.editProject.project.id,		// new projects lack IDs as they are created by database
			project: props.editProject.project
		};
	}


	updateBudgets() {
		// To create budgets we need the id of the project to attach them to. If this is a new project,
		// we obtain the id from the projects section of the store which will have the newly created project
		
		let projID;

		if (this.state.newProject) {
			// note this works as names are required to be unique
			projID = this.props.projects
				.find(project => project.name == this.state.project.name)
				.id;

		} else {
			projID = this.state.project.id;
		}
		
		if (this.state.budgetsToCreate.length) {
			this.props.createBudgets(this.state.budgetsToCreate, projID);
		}

		if (this.state.budgetsToDelete.length) {
			this.props.deleteBudgets(this.state.budgetsToDelete, projID);
		}
	}

	
	handlePitchSubmit(e) {
		e.preventDefault();

		if (this.state.newProject) {
			let nameUnique = this.props.projects
				.every(project => project.name != this.state.project.name);

			if (nameUnique) {
				this.props.createProject(this.state.project);

			} else {
				// project name is already in use, project cannot be created
				this.props.setMessages({ projectName: 'That name is already taken' });
				return;
			}

		} else {
			this.props.updateProject(this.state.project);
		}

		if (this.state.budgetsToCreate.length || this.state.budgetsToDelete.length) {
			this.updateBudgets();
		}

		this.props.clearEditProject();
		this.props.closePitchModal();	
	}


	handleTabSelect(key) {
		this.setState({	activeTab: key });
	}


	handleProjAttrChange(e) {
		if (e.target.name == 'name' && this.props.UI.messages.projectName) {
			this.props.setMessages({ projectName: '' });
		}

		this.setState({ 
			project: Object.assign({}, this.state.project, { [e.target.name]: e.target.value }) 
		});
	}


	handleBudgAttrChange(e) {
		let newBudget = { [e.target.name]: e.target.value };

		if (e.target.name == 'cost' || e.target.name == 'quantity') {
			let other = e.target.name == 'cost' ? 'quantity' : 'cost';
			newBudget.total = e.target.value * this.state.newBudget[other];
		}

		this.setState({ 
			newBudget: Object.assign({}, this.state.newBudget,  newBudget)
		});
	}


	handleGlCode(e) {
		let [ type, category ] = e.split('---');
		let glCode = categoryToGlcode[category][type];

		this.setState({ 
			newBudget: Object.assign({}, this.state.newBudget, { glCode })
		});
	}


	handleApprovalChange(attr) {
		console.log(attr);
		let approvals = this.state.project.approvals;
		let index = approvalStringOrder.indexOf(attr);

		let newApproval = approvals[index] == '1' ? '0' : '1';

		approvals = approvals.slice(0, index) + newApproval + approvals.slice(index + 1);
	
		this.setState({ 
			project: Object.assign({}, this.state.project, { approvals })
		});
	}


	addBudget(e) {
		e.preventDefault();


	}


	deleteBudget(e) {
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
					{
						this.state.budgets
							.map((budget, index) => (
								<BudgetNode
									approved={ this.state.project.approvals[5] == '1' ? true : false }
									budget={ budget }
									handleChange={ this.handleBudgAttrChange.bind(this) }
									handleGlCode={ this.handleGlCode.bind(this) }
									isNew={ false }
									key={ index }
									reqBudget={ this.state.project.reqBudget }
									save={ this.deleteBudget.bind(this) }
								/>
							))
					}
					
					<BudgetNode
						approved={ this.state.project.approvals[5] == '1' ? true : false }
						budget={ this.state.newBudget }
						handleChange={ this.handleBudgAttrChange.bind(this) }
						handleGlCode={ this.handleGlCode.bind(this) }
						isNew={ true }
						reqBudget={ this.state.project.reqBudget }
						submit={ this.addBudget.bind(this) }
					/>
				</Tab>
			</Tabs>
		);
	}
}


export default Pitch;

