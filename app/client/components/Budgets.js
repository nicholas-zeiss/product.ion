


import React from 'react';


import BudgetNode from './BudgetNode';

import { categoryToGlcode } from '../data/public';
import { budgetDefaults } from '../utils/projectUtils';


class Budgets extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			newBudget: budgetDefaults()
		};
	}




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



	handleGlCode(e) {
		console.log(e)
		let [ type, category ] = e.split('---');
		let glCode = categoryToGlcode[category][type];

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

