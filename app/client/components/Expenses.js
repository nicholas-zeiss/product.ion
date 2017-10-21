/**
 *
 *  Component for the expenses view, which allows you to add/edit expenses to a project.
 *	The vast majority of the actual view for the modal is rendered in PitchSummary and Budgets;
 *	this component acts as a controller.
 *
**/


import React from 'react';
import { Button, Modal, Panel, Table } from 'react-bootstrap';

import CSVDrop from './CSVDrop';
import ExpenseChart from './ExpenseChart';
import ExpenseNode from './ExpenseNode';
import NavBar from './NavBar';

import { defaultExpense, expenseTableHeader, newExpenseHeader } from '../utils/expenseUtils';
import { detailsFirstHeader, detailsFirstRow, detailsSecondHeader, detailsSecondRow, projectDetailsEntry } from '../utils/projectUtils';





class Expenses extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			expenses: props.editProject.expenses.slice(),
			expensesToAdd: [],
			expensesToDelete: [],
			newExpense: defaultExpense(props.editProject.project.id)
		};
	}


	addExpense() {

	}


	deleteExpense() {

	}


	handleChange(e) {

	}


	render() {
		// just for shorthand
		let project = this.props.editProject.project;
		let users = this.props.organization.users;


		return (
			<div>
				<Modal onHide={ this.props.toggleCSVModal } show={ this.props.UI.views.csvModal }>
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
					
					<Button bsStyle='primary' onClick={ this.props.toggleExpenseCharts } style={ { float: 'right' } } >
						Toggle Visuals
					</Button>
					
					<div style={ {'marginTop':'20px'} }>
						<Table className='table'>
							{ detailsFirstHeader }
						
							<tbody>
								<tr id='readOnlyBody'>
									{ 
										detailsFirstRow.map(attr => projectDetailsEntry(attr, project, users))
									}
								</tr>
							</tbody>
						</Table>
						
						<Table className='table'>
							{ detailsSecondHeader }

							<tbody>
								<tr id='readOnlyBody'>
									{ 
										detailsSecondRow.map(attr => projectDetailsEntry(attr, project, users))
									}
								</tr>
							</tbody>
						</Table>
					</div>
					
					{ this.props.UI.views.expenseCharts && <ExpenseChart { ...this.props } projName={ project.name }/> }

				</Panel>
				

				<Panel>
					<span style={ { fontSize: '30px' } }>
						{ `Expenses for ${project.name}` }
					</span>
					
					<Button bsStyle='primary' onClick={ this.props.toggleCSVModal } style={ { float: 'right'} }>
						Add Expenses with a CSV
					</Button>
					
					<Table style={ { marginTop: '20px' } }>
						<thead>
							{ expenseTableHeader }
						</thead>
						<tbody>
							{ 
								this.state.expenses.map((item, index) =>
									<ExpenseNode 
										expense={ item }
										handleDelete={ this.handleDelete.bind(this) }
										key={ index }
										readOnly={ true } 
									/>
								)
							}
						</tbody>
					</Table>
					
					<Panel>
						<Table>
							<thead>
								{ newExpenseHeader }
							</thead>
							<tbody>
								<ExpenseNode
									addExpense={ this.addExpense.bind(this) }
									expense={ this.state.newExpense }
									handleChange={ this.handleChange.bind(this) }
									readOnly={ false }
								/>
							</tbody>
						</Table>
					</Panel>
				</Panel>
			</div>
		);
	}
}

export default Expenses;

