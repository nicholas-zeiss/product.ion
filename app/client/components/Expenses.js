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

import { categoryToGlCode } from '../data/public';

import { defaultExpense, expenseTableHeader, newExpenseHeader } from '../utils/expenseUtils';
import { currDateString } from '../utils/misc';
import { detailsFirstHeader, detailsFirstRow, detailsSecondHeader, detailsSecondRow, projectDetailsEntry } from '../utils/projectUtils';





class Expenses extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			error: '',
			newExpense: defaultExpense(props.editProject.id)
		};
	}


	componentWillUnmount() {
		if (this.props.UI.views.csvModal) {
			this.props.toggleCSVModal();
		}

		if (this.props.UI.views.expenseCharts) {
			this.props.toggleExpenseCharts();
		}
	}


	addExpense() {
		let toCreate = Object.assign(
			{},
			this.state.newExpense,
			{ dateTracked: currDateString() }
		);

		if (Object.keys(toCreate).every(attr => toCreate[attr])) {
			this.props.createExpense(toCreate, this.props.editProject.id);

			this.setState({
				newExpense: defaultExpense(this.props.editProject.id)
			});
		} else {
			this.setState({ error: 'Missing fields'});	
		}
	}


	deleteExpense(id) {
		this.props.deleteExpense(id, this.props.editProject.id);
	}


	handleChange(e) {
		let newExpense = { [e.target.name]: e.target.value };

		this.setState({ 
			error: '',
			newExpense: Object.assign({}, this.state.newExpense, newExpense)
		});
	}


	handleGlCode(e) {
		let [ type, category ] = e.split('---');
		let glCode = categoryToGlCode[category][type];

		this.setState({ 
			error: '',
			newExpense: Object.assign({}, this.state.newExpense, { glCode })
		});
	}


	render() {
		// just for shorthand
		let project = this.props.projects.find(proj => proj.id == this.props.editProject.id);
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
					
					{ this.props.UI.views.expenseCharts && <ExpenseChart { ...this.props } projName={ this.props.editProject.project.name }/> }

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
						<tbody className='read-only-expenses'>
							{ 
								this.props.editProject.expenses.map((item, index) =>
									<ExpenseNode 
										deleteExpense={ this.deleteExpense.bind(this) }
										expense={ item }
										key={ index }
										readOnly={ true } 
									/>
								)
							}
						</tbody>
					</Table>
					
					<Panel style={ { marginTop: '20px' } }>
						<Table>
							<thead>
								{ newExpenseHeader }
							</thead>
							<tbody>
								<ExpenseNode
									addExpense={ this.addExpense.bind(this) }
									expense={ this.state.newExpense }
									handleChange={ this.handleChange.bind(this) }
									handleGlCode={ this.handleGlCode.bind(this) }
									readOnly={ false }
								/>
							</tbody>
						</Table>
						<p>{ this.state.error }</p>
					</Panel>
				</Panel>
			</div>
		);
	}
}

export default Expenses;

