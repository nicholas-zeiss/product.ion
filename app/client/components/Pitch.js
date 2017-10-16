/**
 *
 *  Component for the pitch modal, which allows you to create a new pitch
 *
**/


import React from 'react';
import { Tab, Tabs } from 'react-bootstrap';

import Budget from './Budget';
import PitchSummary from './PitchSummary';

import { projectDefaults } from '../data/public';


class Pitch extends React.Component {
	constructor(props) {
		super(props);

		// let { data } = this.props,
		// 	goodProd = {val: undefined, style: undefined, action: 'No Issues'},
		// 	badProd = {val: 'error', style: 'danger', action: 'Rejected'},
		// 	good = {val: 'success', style: 'success', action: 'Reject'},
		// 	bad = {val: 'error', style: 'danger', action: 'Approve'},
		// 	notAdmin = {val: null, action: undefined};
		// let judge = {},
		// 	counter = 0;

		//set default approval data if none present.
		// data = data.approvals ? data :  { approvals:'11111111111' };
		//sets validation object to be mapped to each field in PitchSummary
		// for (var key in emptyProject) {
		// 	judge[key] = {vars: this.props.organization.user.perm ?
		// 		data.approvals[counter] == 1 ? goodProd : badProd
		// 		: data.approvals[counter] == 1 ? good : bad};
		// 	judge[key].index = counter;
		// 	counter ++;
		// }

		
		let defaults = projectDefaults(this.props.organization.user.id);
		let project = props.project || {};

		this.state = Object.assign({}, defaults, project, {
			activeTab: 1,
			budgets: [],
			newPitch: !!props.project
		});
	}


	buildPitch() {
		return {
			orgs_id: this.props.organization.orgs_id,
			id: this.state.id,
			createdBy: this.props.organization.user.id,
			name: this.state.projName,
			projID: this.state.projID,
			vertical: this.state.vertical,
			tier: this.state.tier,
			numAssets: this.state.numAssets,
			type: this.state.videoType,
			status: 'Pitch',
			estimateToComplete: this.state.reqBudget,
			startDate: this.state.startDate,
			endDate: this.state.endDate,
			editDate: this.state.editDate,
			releaseDate: this.state.releaseDate,
			approvals: this.state.approvals,
			adminNotes: this.state.adminNotes
		};
	}


	componentWillReceiveProps(newProps) {
		if (newProps.budgets) {
			const proj = 'proj' + this.state.id;
			
			this.setState(
				{budgets: newProps.budgets[proj]},
				this.calculateTotalBudget
			);
		}
	}


	handlePitchSubmit(event) {
		event.preventDefault();
		var data = this.buildPitch();

		this.props.postNewProject(data);
		this.closeModal();
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


	closeModal() {
		this.props.getOrgProjects(this.props.organization.orgName);
		this.props.toggleModal('pitch');
	}


	handleSelect(key) {
		//budget set here to accomodate asynchronous budget list hydration.
		this.setState({
			budgets: this.props.budgets['proj' + this.state.id],
			activeTab: key,
		});
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
				onSelect={ this.handleSelect }
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

