/**
 *
 *	Dumb component for rendering expense items
 *
**/


import React from 'react';
import { Button, FormControl, InputGroup } from 'react-bootstrap';

import expenseTypes from '../data/expenseCategories';

import { paymentMethods } from '../utils/expenseUtils';


const ExpenseNode = props => {

	let readOnly = props.readOnly ? { readOnly: true } : {};

	return (
		<tr>
			<td>
				<FormControl
					{ ...readOnly }
					name='vendor'
					type='text'
					value={ props.expense.vendor }
				/>
			</td>
			
			<td>
				<FormControl
					{ ...readOnly }
					name='description'
					type='text'
					value={ props.expense.description }
				/>
			</td>
			
			<td width='110'>
				<InputGroup>
					<InputGroup.Addon> $ </InputGroup.Addon>
					<FormControl
						{ ...readOnly }
						name='cost'
						type='text'
						value={ props.expense.cost }
					/>
				</InputGroup>
			</td>

			<td>
				<FormControl
					componentClass='select'
					disabled={ props.readOnly }
					name='method'
					onChange={ props.handleChange }
					value={ props.expense.method }
				>
					{
						paymentMethods.map(method => (
							<option key={ method } value={ method }>
								{ method }
							</option>
						))
					}
				</FormControl>
			</td>

			<td width='135'>
				<FormControl
					componentClass='select'
					disabled={ props.readOnly }
					name='category'
					onChange={ props.handleChange }
					value={ props.expense.category }
				>
					{
						expenseTypes.map(type => (
							<option key={ type } value={ type }>
								{ type }
							</option>
						))
					}
				</FormControl>
			</td>

			<td width='93'>
				<FormControl
					type='text'
					value={ props.expense.glCode }
					readOnly
				/>
			</td>

			<td>
				<FormControl
					{ ...readOnly }
					name='dateSpent'
					onChange={ props.handleChange }
					type='date'
					value={ props.expense.dateSpent }
				/>
			</td>
			
			{ 
				props.readOnly &&
					<td>
						<FormControl
							type='date'
							value={ props.expense.dateTracked }
							readOnly
						/>
					</td>
			}

			<td width='auto'>
				{ 
					props.readOnly ?
						<Button onClick={ props.deleteExpense }> Delete </Button>
						:
						<Button onClick={ props.addExpense }> Add Expense </Button>
				}
			</td>
		</tr>
	);
};


export default ExpenseNode;

