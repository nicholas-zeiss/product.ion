/**
 *
 *	Dumb component for rendering expense items
 *
**/


import React from 'react';
import { Button, DropdownButton, FormControl, InputGroup } from 'react-bootstrap';

import { dropDownOptions, glCodeToExpense } from '../data/public';

import { paymentMethods } from '../utils/expenseUtils';
import { formatDate, moneyString } from '../utils/misc';


// css for description/vendor in read only mode
const longText = {
	fontSize: '14px',
	overflow: 'hidden',
	overflowWrap: 'break-word',
	width: '150px'
};

const ExpenseNode = props => {
	let readOnly = props.readOnly ? { readOnly: true } : {};

	return (
		<tr>
			<td>
				{
					props.readOnly ? 
						<p style={ longText }>{ props.expense.vendor }</p>
						:
						<FormControl
							{ ...readOnly }
							maxLength='50'
							name='vendor'
							onChange={ props.handleChange }
							style={ { minWidth: '100px' } }
							type='text'
							value={ props.expense.vendor }
						/>
				}
			</td>
			
			<td>
				{
					props.readOnly ? 
						<p style={ longText }>{ props.expense.description }</p>
						:
						<FormControl
							{ ...readOnly }
							maxLength='50'
							name='description'
							onChange={ props.handleChange }
							style={ { minWidth: '100px' } }
							type='text'
							value={ props.expense.description }
						/>
				}
			</td>
			
			<td>
				{
					props.readOnly ? 
						<p>{ moneyString(props.expense.cost) }</p>
						:
						<InputGroup>
							<InputGroup.Addon> $ </InputGroup.Addon>
							<FormControl
								min='0'
								name='cost'
								onChange={ props.handleChange }
								style={ { textAlign: 'right', width: '80px' } }
								type='number'
								value={ props.expense.cost }
							/>
						</InputGroup>
				}
			</td>

			<td>
				{
					props.readOnly ? 
						<p>{ props.expense.method }</p>
						:
						<FormControl
							componentClass='select'
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
				}
			</td>

			<td>
				{
					props.readOnly ? 
						<p>{ props.expense.glCode ? glCodeToExpense[props.expense.glCode] : 'Type' }</p>
						:
						<DropdownButton 
							id='expenseCategory'
							name='glCode'
							onSelect={ props.handleGlCode }
							style={ { overflow: 'hidden', width: 'auto' } }
							title={ props.expense.glCode ? glCodeToExpense[props.expense.glCode] : 'Type' }
							dropup
						>
							{ dropDownOptions() }
						</DropdownButton>
				}
			</td>


			<td>
				{
					props.readOnly ? 
						<p>{ props.expense.glCode }</p>
						:
						<FormControl
							style={ { width: '80px' } }
							type='text'
							value={ props.expense.glCode }
							readOnly
						/>
				}
			</td>

			<td>
				{
					props.readOnly ? 
						<p>{ formatDate(props.expense.dateSpent) }</p>
						:
						<FormControl
							name='dateSpent'
							onChange={ props.handleChange }
							style={ { fontSize: '12px', width: '150px' } }
							type='date'
							value={ props.expense.dateSpent }
						/>
				}
			</td>
			
			{ 
				props.readOnly &&
					<td>
						<p>{ formatDate(props.expense.dateTracked) }</p>
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

