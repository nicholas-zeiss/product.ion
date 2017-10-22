/**
 *
 *  Component that displays a project's financial details graphically using highcharts.
 *
**/


import React from 'react';
import { Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

import { glCodeToExpense } from '../data/public';


class DashCharts extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			data: [],
			expenses: [],
			projectNames: {},
			sortBy: 'vendor'
		};
	}


	componentWillMount() {
		this.parseExpenses();
	}


	parseExpenses() {
		let expenses = [];
		
		let projectNames = this.props.projects.reduce((names, proj) => {
			names[proj.id] = proj.name;
			return names;
		}, {});
		
		for (let projID in this.props.expenses) {
			expenses = expenses.concat(this.props.expenses[projID]);
		}

		this.setState({ expenses, projectNames }, this.sortBy);
	}


	handleSortChange(e) {
		e.preventDefault();

		this.setState({ sortBy: e.target.value }, this.sortBy);
	}


	sortBy() {
		let data = [];
		let temp = {};
		let attr = this.state.sortBy; 	// shorthand

		this.state.expenses.forEach(exp => {
			let key;

			if (attr == 'project') {
				key = this.state.projectNames[exp.projID];
			} else if (attr == 'glCode') {
				key = glCodeToExpense[exp[attr]];
			} else {
				key = exp[attr];
			}

			temp[key] = (temp[key] || 0) + exp.cost;
		});

		for (let key in temp) {
			data.push([key, temp[key]]);
		}

		this.setState({ data: data }, this.loadChart);
	}


	loadChart() {
		new Highcharts.Chart({
			chart: {
				type: 'pie',
				options3d: {
					enabled: true,
					alpha: 45,
					beta: 0
				},
				renderTo: 'dashChartContainer'
			},
			title: {
				text: 'Breakdown of Expenses for All Projects'
			},
			tooltip: {
				pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
			},
			plotOptions: {
				pie: {
					allowPointSelect: true,
					cursor: 'pointer',
					depth: 35,
					dataLabels: {
						enabled: true,
						format: '{point.name}'
					}
				}
			},
			series: [{
				type: 'pie',
				name: 'Expenses share',
				data: this.state.data
			}]
		});
	}


	render() {
		return (
			<div>
				<Form inline>
					<FormGroup controlId='formControlsSelect'>
						<ControlLabel bsClass='chartSortSelector'>Sort by</ControlLabel>&nbsp;&nbsp;
						<FormControl componentClass='select' onChange={ this.handleSortChange.bind(this) } placeholder='Type' value={ this.state.sortBy }>
							<option value='vendor'>Vendor</option>
							<option value='method'>Method</option>
							<option value='glCode'>Type</option>
							<option value='project'>Project</option>
						</FormControl>
					</FormGroup>
				</Form>
				<div id='dashChartContainer' style={ {'marginTop':'10px'} }></div>
			</div>
		);
	}
}


export default DashCharts;

