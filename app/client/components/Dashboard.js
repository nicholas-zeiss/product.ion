/**
 *
 *  Component for the main view of the organization
 *
**/


import React from 'react';
import { Link } from 'react-router';
import { Button, Modal, Panel, Table } from 'react-bootstrap';

import Papa from 'papaparse';

import { FIELDS, expandExpenses } from '../utils/csvUtils';

import DashCharts from './DashCharts';
import NavBar from './NavBar';
import Pitch from './Pitch';
import ProjectNode from './ProjectNode';
import Projects from './Projects';


class Dashboard extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			editProject: null,
			chartsOpen: false
		};
	}


	//on mounting hydrate the app state with all the needed projects
	componentWillMount() {
		this.props.getOrganizationProjects(this.props.organization.orgName);
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

		let csv = Papa.unparse({ FIELDS, data: expandExpenses(expenses) });
		
		let hiddenElement = document.createElement('a');
		hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
		hiddenElement.target = '_blank';
		hiddenElement.download = 'data.csv';
		hiddenElement.click();
	}


	render() {
		
		//determine whether or not to show charts/which pitches are visible based off app state and
		//the client account's permission level
		let charts = this.state.chartsOpen ? <DashCharts { ...this.props }/> : null;
		let pitchHeader = this.props.organization.user.permissions ? 'Your pitches awaiting approval:' : 'Pitches to be Approved';
		

		let pitches = this.props.projects.filter(proj => proj.status == 'Pitch');

		//if not an admin account, client can only view pitches they created
		if (this.props.organization.user.permissions != 0) {
			pitches = pitches.filter(proj => proj.createdBy == this.props.organization.user.id);
		}

		pitches = pitches.map((pitch, idx) => (
			<ProjectNode key={ idx } { ...this.props } project={ pitch } switchModal={ this.switchModal.bind(this) }/>
		), this);


		//show mastersheet if admin, determine the three most recently edited projects
		let mastersheet = null;		
		let mostRecentThree = null;

		if (this.props.organization.user.perm == 0) {
			mastersheet =	(
				<Link to='/mastersheet'>
					<Button bsStyle='primary' style={ { 'float': 'right', 'marginRight': '5px' } }>Click for Master Sheet</Button>
				</Link>
			);
		}

		if (this.props.projects.length > 0) {
			mostRecentThree = this.props.projects
				.slice()
				.sort((a, b) => a.lastEdited > b.lastEdited ? -1 : a.lastEdited < b.lastEdited ? 1 : 0)
				.slice(0, 3)
				.map((proj, idx) => (
					<ProjectNode key={ idx } { ...this.props } project={ proj } switchModal={ this.switchModal }/>
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
							{ charts }
						</div>

						<h3> Most Recently Edited Three Projects </h3>
						
						<Table bordered striped>
							<thead>
								<tr id='readOnlyHeader'>
									<th> Name </th>
									<th> Project ID </th>
									<th> Created By </th>
									<th> Project Status </th>
									<th> Estimate to Complete </th>
									<th> Cost to Date </th>
								</tr>
							</thead>
							
							<tbody>{ mostRecentThree }</tbody>
						</Table>

						<div>
							<h3>{ pitchHeader }</h3>
							
							<Table bordered striped>
								<thead>
									<tr id='readOnlyHeader'>
										<th>Name</th>
										<th>Project ID</th>
										<th>Created By</th>
										<th>Project Status</th>
										<th>Estimate to Complete</th>
										<th>Cost to Date</th>
									</tr>
								</thead>
								
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

