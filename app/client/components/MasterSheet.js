


import React from 'react';
import { ControlLabel, Form, FormControl, FormGroup, Panel, Table } from 'react-bootstrap';

import NavBar from './NavBar';


const Months = [ 
	'Jan',
	'Feb',
	'Mar',
	'Apr',
	'May',
	'Jun',
	'Jul',
	'Aug',
	'Sept',
	'Nov',
	'Dec' 
];


class MasterSheet extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			chartData: {},
			sortBy: 'All',
			tableData: []
		};
	}

	componentWillMount() {
		this.parseData();
	}


	parseData() {
		let tableData = [];
		let chartData = { All: new Array(12).fill(0) };	// 0 - 11 cost that month

		this.props.projects.forEach(proj => {
			let yearExps = new Array(12).fill(0);

			yearExps.name = proj.name;
			yearExps.total = 0;
			
			(this.props.expenses[proj.id] || []).forEach(exp => {
				// date stored as 'YYYY-MM-DD' w/ months starting at 01
				let month = exp.dateSpent.slice(5, 7) - 1;

				yearExps[month] += exp.cost;
				yearExps.total += exp.cost;
				chartData.All[month] += exp.cost;
			});

			tableData.push(yearExps);
			chartData[proj.id] = yearExps.slice(0,12);
		});
		console.log(chartData, tableData)
		this.setState({ chartData, tableData }, this.loadChart);
	}


	loadChart() {
		new Highcharts.Chart({
			chart: {
				type: 'line',
				renderTo: 'chartContainer'
			},
			xAxis: {
				categories: Months.slice()
			},
			yAxis: {
				title: {
					text: 'Dollars'
				}
			},
			title: {
				text: 'Yearly Expenditure'
			},
			plotOptions: {
				line: {
					allowPointSelect: true,
					dataLabels: {
						enabled: true,
						format: '{point.name}'
					}
				}
			},
			series: [{
				type: 'line',
				name: 'Expenses this Month',
				data: this.state.chartData[this.state.sortBy]
			}]
		});
	}


	handleSortChange(e) {
		e.preventDefault();
		this.setState({sortBy: e.target.value}, this.loadChart);
	}


	render() {
		return (
			<div>
					
				<NavBar { ...this.props }/>

				<Panel>
					<Form inline>
						<FormGroup controlId='formControlsSelect'>
							<ControlLabel bsClass='chartSortSelector'>Choose Project</ControlLabel>&nbsp;&nbsp;
							<FormControl componentClass='select' onChange={ this.handleSortChange.bind(this) } value={ this.state.sortBy }>
								<option value='All'>All</option>
								{ 
									this.props.projects
										.map((proj, idx) => <option key={ idx } value={ proj.id }>{ proj.name }</option>)
								}
							</FormControl>
						</FormGroup>
					</Form>	

					<div id='chartContainer' style={ { marginTop: '10px' } }></div>

					<Table bordered striped>
						<thead>
							<tr>
								<th>Project</th>
								{
									Months.map((m, i) => <th key={ i }>{ m }</th>)
								}
								<th>Total</th>
							</tr>
						</thead>
						
						<tbody>
							{ 
								this.state.tableData
									.map((row, index) => (
										<tr key={ index }>
											<td>{ row.name }</td>
											{
												row.map((month, index) => <td key={ index }>{ month }</td>)
											}
											<td>{ row.total }</td>
										</tr>
									))
							}
						</tbody>
					</Table>
				</Panel>
			</div>
		);
	}
}


export default MasterSheet;

