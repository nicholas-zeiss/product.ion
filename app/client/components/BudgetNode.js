/**
 *
 *	Dumb component for rendering budget items
 *
**/


import React from 'react';
import { Button, ControlLabel, DropdownButton, Form, FormControl, FormGroup, InputGroup } from 'react-bootstrap';

import { dropDownOptions } from '../data/public';
import { moneyString } from '../utils/misc';


const BudgetNode = props => {	
	// if budget has save prop (instead of delete) it is new
	const isNew = !!props.save;
	const readOnly = isNew ? {} : { readOnly: true };
	const disabled = isNew ? {} : { disabled: true };


	let header = (
		<FormGroup style={ { display: 'block', margin: '20px 0' } }>
			<ControlLabel style={ { fontSize: '14px' } }>Add New Budget Item:</ControlLabel>
		</FormGroup>
	);


	let footer = (
		<FormGroup style={ { marginTop: '20px' } } validationState={ props.approved ? 'success' : 'error' }>
			<InputGroup id='requestedBudget'>
				<InputGroup.Addon>Requested budget: </InputGroup.Addon>
				<FormControl value={ props.reqBudget != undefined ? moneyString(props.reqBudget) : '' } readOnly/>
			</InputGroup>
		</FormGroup>
	);


	return (
		<Form
			className='budgetForm'
			onSubmit={ isNew ? props.save.bind(null, props.budget) : props.delete.bind(null, props.budget) }
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
					onChange={ props.handleChange }
					type='text' 
					value={ props.budget.description } 
					required 
				/>
			</InputGroup>
			
			<DropdownButton 
				{ ...disabled }
				id='budgetCategory'
				onSelect={ props.handleGlCode }
				title={ props.budget.glCode ? props.budget.glCode : 'Category' }
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
					onChange={ props.handleChange }
					type='number'
					value={ props.budget.cost }
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
					onChange={ props.handleChange }
					type='number'
					value={ props.budget.quantity }
					required
				/>
			</InputGroup>
			
			<InputGroup id='budgetTotal'>
				<InputGroup.Addon>
					Total
				</InputGroup.Addon>
				
				<FormControl
					placeholder='Total Item Cost'
					type='text'
					value={ moneyString(props.budget.total) }
					readOnly
				/>
			</InputGroup>
			
			<Button id='budgetSave' type='submit'>
				{ isNew ? 'Add' : 'X' }
			</Button>

			{ isNew ? footer : null }

		</Form>
	);
};

export default BudgetNode;

