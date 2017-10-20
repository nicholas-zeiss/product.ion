/**
 *
 *  Component for the expenses view, which allows you to add/edit expenses to a project.
 *	The vast majority of the actual view for the modal is rendered in PitchSummary and Budgets;
 *	this component acts as a controller.
 *
**/


import React from 'react';
import { Button, FormControl, Modal, Panel, Table } from 'react-bootstrap';

import CSVDrop from './CSVDrop';
import ExpenseChart from './ExpenseChart';
import ExpenseNode from './ExpenseNode';
import NavBar from './NavBar';

import { moneyString } from '../utils/misc';
import { detailsFirstHeader, detailsFirstRow, detailsSecondHeader, detailsSecondRow, tableWidths } from '../utils/projectUtils';

// maps columns of project details to their widths



class Expenses extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			open: false,
			count: 0,
			addedExpenses: [0],
			newExpenses: [],
			modal: false,
			newView: false
		};
	}


	handleNewExpense(singleExpense) {
		// singleExpense.projs_id = this.props.expenses.id;
		// var newExpenses = this.state.newExpenses;
		// newExpenses.push(singleExpense);
		// this.setState({newExpenses: newExpenses});
		// console.log('Handle NEW Expense ', singleExpense);
		// this.props.postNewExpense(singleExpense, this.props.expenses.projID);
	}


	handleExpenseToDelete(singleExpense) {
		// singleExpense.projs_id = this.props.expenses.id;
		// console.log('Handle DELETE ', singleExpense);
		// this.props.removeExpense(singleExpense, this.props.expenses.projID);
	}


	handleExpenseUpdate(singleExpense) {
		// singleExpense.projs_id = this.props.expenses.id;
		// console.log('Handle UPDATE ', singleExpense);
		// this.props.updateExpense(singleExpense, this.props.expenses.projID);
	}


	switchModal () {
		// this.setState({newView: true, modal: !this.state.modal});
	}


	switchChart() {
		// console.log('switching chart', !this.state.open);
		// this.setState({newView: true, open: !this.state.open});
	}


	formatDate(date) {
		let [ year, month, day ] = date.split('-');

		// remove padding
		month = '' + Number(month);
		day = '' + Number(day);

		return [ month, day, year ].join('/');
	}


	// creates table data elements for the project details table
	projectDetailTable(attr) {
		let value;
		let project = this.props.editProject.project;

		if (attr == 'username') {
			value = this.props.organization.users.find(user => user.id == project.userID);
			value = value ? value.username : '?';

		} else if (attr == 'costToDate' || attr == 'reqBudget') {
			value = moneyString(project[attr]);

		} else if (/Date/.test(attr)) {
			value = this.formatDate(project[attr]);

		} else {
			value = project[attr];
		}

		return (
			<td key={ attr } width={ tableWidths[attr] }>
				<FormControl value={ value } readOnly/>
			</td>
		);
	}


	render() {
		// just for shorthand
		let project = this.props.editProject.project;


		return (
			<div>
				<Modal onHide={ this.switchModal } show={ this.state.modal }>
					<Modal.Header>
						<Modal.Title>
							{ `Add Expenses to ${project.name} with a CSV` }
						</Modal.Title>
					</Modal.Header>
					
					<Modal.Body>
						<CSVDrop { ...this.props }/>
					</Modal.Body>
					
					<Modal.Footer />
				</Modal>
				
				<NavBar { ...this.props }/>
				
				<Panel>
					<span style={ { fontSize: '30px' } }>
						{ `Project Details for ${project.name}` }
					</span>
					
					<Button bsStyle='primary' onClick={ this.switchChart } style={ { float: 'right' } } >
						Toggle Visuals
					</Button>
					
					<div style={ {'marginTop':'20px'} }>
						<Table className='table'>
							{ detailsFirstHeader }
						
							<tbody>
								<tr id='readOnlyBody'>
									{ 
										detailsFirstRow.map(attr => this.projectDetailTable(attr))
									}
								</tr>
							</tbody>
						</Table>
						
						<Table className='table'>
							{ detailsSecondHeader }

							<tbody>
								<tr id='readOnlyBody'>
									{ 
										detailsSecondRow.map(attr => this.projectDetailTable(attr))
									}
								</tr>
							</tbody>
						</Table>
					</div>
					
					{ this.state.open ? <ExpenseChart { ...this.props } projName={ project.name }/> : null }
	
				</Panel>
				
				<Panel>
					<span style={ { fontSize: '30px' } }>{ `Expenses for ${project.name}` }</span>
					<Button bsStyle='primary' onClick={ this.switchModal } style={ { float: 'right'} }>Add Expenses with a CSV</Button>
					<Table>
						<thead>
							<tr id='readOnlyHeader'>
								<th>Vendor</th>
								<th>Description</th>
								<th>Cost</th>
								<th>Method</th>
								<th>Expense Category</th>
								<th>GL Code</th>
								<th>Date Spent</th>
								<th>Date Tracked</th>
							</tr>
						</thead>
						<tbody>
							{ this.props.editProject.expenses.map((item, index) =>
								<ExpenseNode expense={ item }
									handleExpenseToDelete={ this.handleExpenseToDelete }
									handleExpenseUpdate={ this.handleExpenseUpdate }
									projs_id={ this.state.projs_id }
									key={ index }
									readOnlyStatus={ true } />)
							}
						</tbody>
					</Table>
					<Panel>
						<Table>
							<thead>
								<tr>
									<th>Vendor</th>
									<th>Description</th>
									<th>Cost</th>
									<th>Method</th>
									<th>Expense Category</th>
									<th>GL Code</th>
									<th>Date Spent</th>
								</tr>
							</thead>
							<tbody>
								{ this.state.addedExpenses.map((item, index) =>
									<ExpenseNode
										expense={ item }
										handleNewExpense={ this.handleNewExpense }
										key={ index }
										projs_id={ this.state.projs_id }
										readOnlyStatus={ false }/>)
								}
							</tbody>
						</Table>
					</Panel>
				</Panel>
			</div>
		);
	}
}

export default Expenses;

