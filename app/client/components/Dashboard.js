/**
 *
 *  Component for the home page of the organization
 *
**/


import React from 'react';
import { Link } from 'react-router';
import { Button, Modal, Panel, Table } from 'react-bootstrap';

import Papa from 'papaparse';

import { fields, expandExpenses } from '../utils/csvUtils';
import { projectTableHeader } from '../utils/projectUtils';

import DashCharts from './DashCharts';
import NavBar from './NavBar';
import Pitch from './Pitch';
import ProjectNode from './ProjectNode';


class Dashboard extends React.Component {
	constructor(props) {
		super(props);

		props.setMessages({ password: '', user: '' });
	
		if (props.budgets.loaded == false || props.expenses.loaded == false) {
			const projIDs = props.projects.map(project => project.id);

			props.getBudgets(projIDs);
			props.getExpenses(projIDs);
		}
	}


	exportCSV() {
		let expenses = this.props.projects.reduce((expenses, project) => {
			project.expenses.forEach(expense => {
				expenses.push({ expense, project });
			});

			return expenses;
		}, []);

		let csv = Papa.unparse({ fields, data: expandExpenses(expenses) });
		
		let hiddenElement = document.createElement('a');
		hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
		hiddenElement.target = '_blank';
		hiddenElement.download = 'data.csv';
		hiddenElement.click();
	}


	render() {
		
		// will hold link to master financial sheet if client can view it
		let mastersheet;

		// determine which pitches are visible based off app state and the client account's permission level
		let pitches = this.props.projects.filter(proj => proj.status == 'Pitch');
		let pitchHeader = this.props.organization.user.permissions == 'user' ? 'Your pitches awaiting approval:' : 'Pitches to be Approved:';


		if (this.props.organization.user.permissions == 'user') {
			pitches = pitches.filter(proj => proj.userID == this.props.organization.user.id);		

		} else {
			mastersheet =	(
				<Link to='/mastersheet'>
					<Button bsStyle='primary' style={ { 'float': 'right', 'marginRight': '5px' } }>
						Click for Master Sheet
					</Button>
				</Link>
			);
		}


		pitches = pitches.map((pitch, idx) => <ProjectNode { ...this.props } key={ idx } project={ pitch }/>, this);


		// determine the three most recently edited projects
		let mostRecentThree = this.props.projects
			.slice()
			.sort((a, b) => a.lastEdited > b.lastEdited ? -1 : a.lastEdited < b.lastEdited ? 1 : 0)
			.slice(0, 3)
			.map((project, idx) => (
				<ProjectNode
					{ ...this.props }
					key={ idx }
					project={ project }
				/>
			), this);
	

		return (
			<div className='dashboard'>
				<NavBar { ...this.props }/>

				<div>
					<Modal onHide={ this.props.closePitchModal } show={ this.props.UI.views.pitch }>
						<Modal.Body>
							<Pitch { ...this.props } />
						</Modal.Body>
						<Modal.Footer/>
					</Modal>

					<Panel>
						<div>
							<b style={ { 'fontSize': '30px' } }>{ `Welcome to ${this.props.organization.name}'s dashboard` }</b>
							
							<Button
								bsStyle='primary'
								id='csvExport'
								onClick={ this.exportCSV.bind(this) }
								style={ { 'float': 'right', 'marginRight': '5px' } }
							>
								Export Projects/Expenses to a CSV
							</Button>
							
							<Button 
								bsStyle='primary'
								onClick={ this.props.toggleCharts }
								style={ { 'float': 'right', 'marginRight': '5px' } }
							>
								Toggle Visuals
							</Button>
							
							{ mastersheet }
							{ this.props.UI.views.charts ?  <DashCharts { ...this.props }/> : null }
						</div>

						<h3> Most Recently Edited Three Projects </h3>
						
						<Table bordered striped>
							{ projectTableHeader }
							<tbody>{ mostRecentThree }</tbody>
						</Table>

						<div>
							<h3>{ pitchHeader }</h3>
							
							<Table bordered striped>
								{ projectTableHeader }
								<tbody>{ pitches }</tbody>
							</Table>
						</div>
					</Panel>
				</div>
			</div>
		);
	}
}


export default Dashboard;

