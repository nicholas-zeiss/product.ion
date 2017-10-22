/**
 *
 *	Dumb component for rendering expense items
 *
**/


import React from 'react';
import { Button, DropdownButton, FormControl, InputGroup } from 'react-bootstrap';

import { dropDownOptions, glCodeToExpense } from '../data/public';

import { paymentMethods } from '../utils/expenseUtils';


const ExpenseNode = props => {
	let readOnly = props.readOnly ? { readOnly: true } : {};

	return (
		<tr>
			<td>
				<FormControl
					{ ...readOnly }
					name='vendor'
					onChange={ props.handleChange }
					style={ { minWidth: '100px' } }
					type='text'
					value={ props.expense.vendor }
				/>
			</td>
			
			<td>
				<FormControl
					{ ...readOnly }
					name='description'
					onChange={ props.handleChange }
					style={ { minWidth: '100px' } }
					type='text'
					value={ props.expense.description }
				/>
			</td>
			
			<td>
				<InputGroup>
					<InputGroup.Addon> $ </InputGroup.Addon>
					<FormControl
						{ ...readOnly }
						name='cost'
						onChange={ props.handleChange }
						style={ { width: '40px' } }
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
					style={ { width: '100px' } }
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

			<td>
				<DropdownButton 
					disabled={ props.readOnly }
					id='expenseCategory'
					name='glCode'
					onSelect={ props.handleGlCode }
					style={ { overflow: 'hidden', width: 'auto' } }
					title={ props.expense.glCode ? glCodeToExpense[props.expense.glCode] : 'Type' }
					dropup
				>
					{ dropDownOptions() }
				</DropdownButton>
			</td>


			<td>
				<FormControl
					style={ { width: '80px' } }
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
					style={ { width: '170px' } }
					type='date'
					value={ props.expense.dateSpent }
				/>
			</td>
			
			{ 
				props.readOnly &&
					<td>
						<FormControl
							style={ { width: '120px' } }
							type='date'
							value={ props.expense.dateTracked }
							readOnly
						/>
					</td>
			}

			<td>
				{ 
					props.readOnly ?
						<Button onClick={ props.deleteExpense.bind(null, props.expense.id) } style={ { width: 'auto' } }>
							X
						</Button>
						:
						<Button onClick={ props.addExpense } style={ { width: 'auto' } }>
							Add
						</Button>
				}
			</td>
		</tr>
	);
};


export default ExpenseNode;

