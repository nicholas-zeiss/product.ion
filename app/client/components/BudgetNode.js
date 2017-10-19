/**
 *
 *	Dumb component for rendering budget items
 *
**/


import React from 'react';
import { Button, ControlLabel, DropdownButton, Form, FormControl, FormGroup, InputGroup, MenuItem } from 'react-bootstrap';

import { categoryToGlcode, glCodeToCategory } from '../data/public';
import { moneyString } from '../utils/misc';



const dropDownOptions = () => {
	let items = [];

	Object
		.keys(categoryToGlcode)
		.forEach((category) => {
			items.push(<MenuItem key={ category } header>{ category }</MenuItem>);

			Object
				.keys(categoryToGlcode[category])
				.forEach(type => {
					items.push(<MenuItem key={ type } >{ type }</MenuItem>);
				});
		});

	return items;
};



const BudgetNode = props => {
	let { budget, isNew, reqBudget, save } = props;

	let readOnly = !isNew ? { readOnly: true } : {};

	let header = (
		<FormGroup style={ { display: 'block', margin: '20px 0' } } validationState='success'>
			<ControlLabel>Add New Budget Item:</ControlLabel>
		</FormGroup>
	);


	let footer = (
		<FormGroup style={ { marginTop: '20px' } } validationState='success'>
			<InputGroup>
				<InputGroup.Addon>Requested budget: </InputGroup.Addon>
				<FormControl value={ moneyString(reqBudget) } readOnly/>
			</InputGroup>
		</FormGroup>
	);


	return (
		<Form
			className='budgetForm'
			onSubmit={ save }
			style={ { marginTop: '20px' } }
			inline
		>
			{ isNew ? header : null }

			<InputGroup id='budgetDescription'>
				<InputGroup.Addon>
					Description
				</InputGroup.Addon>
			
				<FormControl
					{ ...readOnly }
					name='description' 
					placeholder='Description' 
					type='text' 
					value={ budget.description } 
					required 
				/>
			</InputGroup>
			
			<DropdownButton 
				{ ...readOnly }
				id='budgetCategory'
				title={ budget.glCode ? `${glCodeToCategory}: ${budget.glCode}` : 'Category' }
			>
				{ dropDownOptions() }
			</DropdownButton>

			<InputGroup id='budgetCost'>
				<InputGroup.Addon>
					Cost
				</InputGroup.Addon>
				
				<FormControl
					{ ...readOnly }
					name='cost'
					placeholder='Cost'
					type='number'
					value={ budget.cost }
					required
				/>
			</InputGroup>
			
			<InputGroup id='budgetQuantity'>
				<InputGroup.Addon>
					Quant
				</InputGroup.Addon>
				
				<FormControl
					{ ...readOnly }
					name='quantity'
					placeholder='Units'
					type='number'
					value={ budget.quantity }
					required
				/>
			</InputGroup>
			
			<InputGroup id='budgetTotal'>
				<InputGroup.Addon>
					Total
				</InputGroup.Addon>
				
				<FormControl
					{ ...readOnly }
					placeholder='Total Item Cost'
					type='text'
					value={ moneyString(budget.cost * budget.quantity) }
					readOnly
					required
				/>
			</InputGroup>
			
			<Button id='budgetSave'>{ isNew ? 'Add' : 'X' }</Button>

			{ isNew ? footer : null }

		</Form>
	);
};

export default BudgetNode;

