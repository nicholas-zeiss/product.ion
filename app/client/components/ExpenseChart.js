/**
 *
 *  Component that displays a project's financial details graphically using highcharts.
 *
**/


import React from 'react';
import { ControlLabel, Form, FormControl, FormGroup } from 'react-bootstrap';

import { glCodeToExpense } from '../data/public';


class ExpenseChart extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			budgetsData: [],
			budgetsSortBy: 'description',
			expensesData: [],
			expensesSortBy: 'vendor'
		};
	}


	componentDidMount() {
		this.sortBy('budgets');
		this.sortBy('expenses');
	}


	handleSortChange(type, e) {
		e.preventDefault();

		this.setState({ [type + 'SortBy']: e.target.value }, this.sortBy.bind(this, type));
	}


	sortBy(type) {
		let data = [];
		let temp = {};
		let attr = this.state[type + 'SortBy'];
		
		this.props.editProject[type]
			.forEach(exp => {
				let key = attr == 'glCode' ? glCodeToExpense[exp[attr]] : exp[attr];
				temp[key] = (temp[key] || 0) + exp.cost;
			});
		
		for (let key in temp) {
			data.push([key, temp[key]]);
		}

		this.setState({ [type + 'Data']: data }, this.loadChart.bind(this, type));
	}


	loadChart(type) {
		new Highcharts.Chart({
			chart: {
				type: 'pie',
				options3d: {
					enabled: true,
					alpha: 45,
					beta: 0
				},
				renderTo: type + 'ChartContainer'
			},
			title: {
				text: `Breakdown of ${type} for ${this.props.projName}`
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
				name: type + ' share',
				data: this.state[type + 'Data']
			}]
		});
	}


	render() {
		return (
			<div style={ { display: 'inline-block', width: '100%' } }>
				<div style={ { display: 'inline-block', float: 'left', width: '50%' } }>
					<Form inline>
						<FormGroup controlId='formControlsSelect'>
							<ControlLabel bsClass='chartSortSelector'>
								Sort by
							</ControlLabel>
							&nbsp;&nbsp;
							<FormControl
								componentClass='select'
								onChange={ this.handleSortChange.bind(this, 'budgets') }
								placeholder='Description'
								value={ this.state.budgetsSortBy }
							>
								<option value='description'>Description</option>
								<option value='glCode'>Expense Label</option>
							</FormControl>
						</FormGroup>
					</Form>
					<div id='budgetsChartContainer' style={ { marginTop: '10px' } }></div>
				</div>
				
				<div style={ { dipslay:'inline-block', float: 'right', width: '50%' } }>
					<Form inline>
						<FormGroup controlId='formControlsSelect'>
							<ControlLabel bsClass='chartSortSelector'>
								Sort by
							</ControlLabel>
							&nbsp;&nbsp;
							<FormControl
								componentClass='select'
								onChange={ this.handleSortChange.bind(this, 'expenses') }
								placeholder='Vendor'
								value={ this.state.expensesSortBy }
							>
								<option value='vendor'>Vendor</option>
								<option value='method'>Method</option>
								<option value='glCode'>Expense Label</option>
							</FormControl>
						</FormGroup>
					</Form>
					<div id='expensesChartContainer' style={ { marginTop: '10px' } }></div>
				</div>
			</div>
		);
	}
}


export default ExpenseChart;

