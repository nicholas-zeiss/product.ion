/*
 *
 *	Component held in the Pitch component that displays existing budget items and allows the client to create/delete them.
 *  The items are rendered by the BudgetNode dumb component. This component handles the state of the budget to add.
 *
**/


import React from 'react';


import BudgetNode from './BudgetNode';

import { categoryToGlCode } from '../data/public';
import { budgetDefaults } from '../utils/budgetUtils';


class Budgets extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			newBudget: budgetDefaults()
		};
	}


	// If a budget item has just been added we reset the new budget form
	componentWillReceiveProps(nextProps) {
		if (this.props.budgets.length < nextProps.budgets.length) {
			this.setState({ newBudget: budgetDefaults() });
		}
	}


	// handle change in user input
	handleAttrChange(e) {
		let newBudget = { [e.target.name]: e.target.value };

		if (e.target.name == 'cost' || e.target.name == 'quantity') {
			let other = e.target.name == 'cost' ? 'quantity' : 'cost';
			newBudget.total = e.target.value * this.state.newBudget[other];
		}

		this.setState({ 
			newBudget: Object.assign({}, this.state.newBudget,  newBudget)
		});
	}


	// handle change to glcode in user input, maps type of cost to glcode
	handleGlCode(e) {
		let [ type, category ] = e.split('---');
		let glCode = categoryToGlCode[category][type];

		this.setState({ 
			newBudget: Object.assign({}, this.state.newBudget, { glCode })
		});
	}


	render() {
		return (
			<div>
				{
					this.props.budgets
						.map((budget, index) => (
							<BudgetNode
								budget={ budget }
								delete={ this.props.deleteBudget }
								key={ index }
							/>
						))
				}
						
				<BudgetNode
					approved={ this.props.approved }
					budget={ this.state.newBudget }
					handleChange={ this.handleAttrChange.bind(this) }
					handleGlCode={ this.handleGlCode.bind(this) }
					reqBudget={ this.props.reqBudget }
					save={ this.props.addBudget }
				/>
			</div>
		);
	}
}


export default Budgets;

