/**
 *
 *  Component for the home page of the organization
 *
**/


import React from 'react';
import { Link } from 'react-router';
import { Button, Modal, Panel, Table } from 'react-bootstrap';

import Papa from 'papaparse';

import projectTableHeader from '../data/projectTableHeader';
import { fields, expandExpenses } from '../utils/csvUtils';

import DashCharts from './DashCharts';
import NavBar from './NavBar';
import Pitch from './Pitch';
import ProjectNode from './ProjectNode';


class Dashboard extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			editProject: null,
			chartsOpen: false
		};
	}


	//toggle visibility of charts
	switchChart() {
		this.setState({ chartsOpen: !this.state.chartsOpen });
	}


	//change which project to edit, activate/deactivate modal
	switchModal(project) {
		if (project) {
			this.setState({ editProject: project });

		} else {
			this.setState({ editProject: null });
		}

		this.props.changeModal('pitch');
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
		
		//only admins can view mastersheet, this changes as appropriate below
		let mastersheet = null;

		//determine which pitches are visible based off app state and the client account's permission level
		let pitchHeader = this.props.organization.user.permissions ? 'Your pitches awaiting approval:' : 'Pitches to be Approved';
		let pitches = this.props.projects.filter(proj => proj.status == 'Pitch');

		if (this.props.organization.user.permissions != 0) {
			//if not an admin account, client can only view pitches they created
			pitches = pitches.filter(proj => proj.createdBy == this.props.organization.user.id);
		
		} else {
			mastersheet =	(
				<Link to='/mastersheet'>
					<Button bsStyle='primary' style={ { 'float': 'right', 'marginRight': '5px' } }>Click for Master Sheet</Button>
				</Link>
			);
		}

		pitches = pitches.map((pitch, idx) => (
			<ProjectNode key={ idx } { ...this.props } project={ pitch } switchModal={ this.switchModal.bind(this) }/>
		), this);


		//determine the three most recently edited projects
		let mostRecentThree = null;

		if (this.props.projects.length) {
			mostRecentThree = this.props.projects
				.slice()
				.sort((a, b) => a.lastEdited > b.lastEdited ? -1 : a.lastEdited < b.lastEdited ? 1 : 0)
				.slice(0, 3)
				.map((project, idx) => (
					<ProjectNode key={ idx } { ...this.props } project={ project } switchModal={ this.switchModal }/>
				), this);
		}
	

		return (
			<div className='dashboard'>
				<NavBar { ...this.props }/>

				<div>
					<Modal onHide={ this.switchModal.bind(this) } show={ this.props.modals.pitch }>
						<Modal.Body>
							<Pitch { ...this.props } data={ this.state.editProject }/>
						</Modal.Body>
						<Modal.Footer/>
					</Modal>

					<Panel>
						<div>
							<b style={ { 'fontSize': '30px' } }>{ `Welcome to ${this.props.organization.orgName}'s dashboard` }</b>
							
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
								onClick={ this.switchChart.bind(this) }
								style={ { 'float': 'right', 'marginRight': '5px' } }
							>
								Toggle Visuals
							</Button>
							
							{ mastersheet }
							{ this.state.chartsOpen ?  <DashCharts { ...this.props }/> : null }
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

