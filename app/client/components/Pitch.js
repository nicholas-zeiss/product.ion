/**
 *
 *  Component for the pitch modal, which allows you to create a new pitch or edit an existing one.
 *	The vast majority of the actual view for the modal is rendered in component PitchSummary,
 *	this component acts more as a controller.
 *
**/


import React from 'react';
import { Tab, Tabs } from 'react-bootstrap';

import Budget from './Budget';
import PitchSummary from './PitchSummary';


class Pitch extends React.Component {
	constructor(props) {
		super(props);

		if (props.editProject.project == null) {
			props.newEditProject(props.organization.id, props.organization.user.id);
		}

		// shorthand refs for convenience
		this.budgets = this.props.editProject.budgets;
		this.project = this.props.editProject.project;

		// tracks the active tab of the modal, which has a tab for project info
		// and a tab for adding budget items
		this.state = { activeTab: 1 };
	}


	handlePitchSubmit(e) {
		e.preventDefault();
		
		this.props.createProject(this.project);
		this.props.createBudgets(this.budgets, this.props.editProject.id);

		this.props.clearEditProject();
		this.props.closePitchModal();
	}


	postAllBudgets() {
		this.props.updateMultipleBudgets(this.state.budgets);
	}


	handleReject(e) {
		var data = this.buildPitch();

		this.props.updateProject(data, this.props.projID);
		this.closeModal();
	}


	handleApprove(e) {
		var data = this.buildPitch();
		data.status = 'Production';

		console.log('Pitch approved. Pitch is ', data);
		this.state.newPitch ? this.props.postNewProject(data)
			: this.props.updateProject(data, this.props.projID);

		this.closeModal();
	}


	handleTabSelect(key) {
		this.setState({	activeTab: key });
	}


	tabToBudget() {
		this.handleSelect(2);
	}


	updateBudget(newTotal) {
		this.setState({reqBudget: newTotal});
	}


	handleChange(e) {
		this.setState({[e.target.name]: e.target.value});
	}


	handleBudgetChange(e, idx) {
		let newBudget = this.state.budgets;
		newBudget[idx][e.name] = e.value;

		this.setState({budgets: newBudget});
	}


	handleBudgetSelect(e, idx) {
		let newBudgets = this.state.budgets;
		newBudgets[idx].glCode = e;

		this.setState({budgets: newBudgets});
	}


	calculateTotalBudget() {
		let budgetTotal = 0;
		this.state.budgets.forEach(budget => budgetTotal+=budget.total);

		this.setState({reqBudget: budgetTotal});
	}


	addNewBudget(budget) {
		this.props.postNewBudget(budget);
	}


	deleteBudgetNode(node) {
		this.props.deleteBudgetNode(node);
	}


	updateApproval(index) {
		var approvals = this.state.approvals.split('');

		approvals[index] = Number(!(approvals[index]/1));

		this.setState({approvals: approvals.join('')});
	}


	handleJudgement(e) {
		const name = e.target.name,
			good = {val: 'success', style: 'success', action: 'Reject'},
			bad = {val: 'error', style: 'danger', action: 'Approve'},
			newJudge = this.state.judge;

		//set the judgement props of each field to the inverse
		newJudge[name].vars =
						this.state.judge[name].vars.action === 'Reject' ? bad
							: good;

		this.updateApproval(newJudge[name].index);
		this.setState({judge: newJudge});
	}


	render() {
		return (
			<Tabs
				activeKey={ this.state.activeTab }
				id='pitchTabs'
				onSelect={ this.handleTabSelect }
			>
				<Tab eventKey={ 1 } title='Pitch'>
					
					<PitchSummary 
						{ ...this.props.organization } 
						{ ...this.state }
						handleApprove={ this.handleApprove }
						handleChange={ this.handleChange }
						handleJudgement={ this.handleJudgement }
						handlePitchSubmit={ this.handlePitchSubmit }
						handleReject={ this.handleReject }
						tabToBudget={ this.tabToBudget }
						updatePitch={ this.updatePitch }
					/>

				</Tab>
				
				<Tab eventKey={ 2 } title='Budget'>
					<Budget
						addNewBudget={ this.addNewBudget }
						budgets={ this.props.budgets['proj' + this.state.id] }
						deleteBudgetNode = { this.deleteBudgetNode }
						handleBudgetChange={ this.handleBudgetChange }
						handleBudgetSelect={ this.handleBudgetSelect }
						postAllBudgets={ this.postAllBudgets }
						total={ this.state.reqBudget }
					/>
				</Tab>
			</Tabs>
		);
	}
}


export default Pitch;

