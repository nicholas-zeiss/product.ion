/*
 *
 *	Dumb component that gives us a form with which we edit a project pitch. Used by the Pitch component.
 *	The project is held in Pitch's state, and Pitch provides us with props to propogate changes to it.
 *
**/


import React from 'react';
import { Button, ControlLabel, Form, FormControl, FormGroup, InputGroup } from 'react-bootstrap';

import { inputLabels, inputStyles, inputTypes, options } from '../data/public';
import { moneyString } from '../utils/misc';
import { genApprovalObject } from '../utils/projectUtils';



//------------------------------------------------------------------------------------------------------
//																			Helper Functions
//------------------------------------------------------------------------------------------------------

// To reduce the tremendous amount of code repititon that writing this component out verbatim
// would entail we instead rely on these helper functions. Rather than include them in the scope
// of the component and rewrite the functions on every render we define them here, and then wrap
// them inside the component so that we need only give the attr argument to call them.




// Note that the validation state in the following two functions reflects whether the option
// has been approved/rejected by an admin/producer, not the validity of the input itself
const validationState = (approvals, userType, attr) => (
	approvals[attr] ? userType == 'user' ? null : 'success' : 'error'
);




// wraps an input in its approval state and, if user is admin/producer a button to change its approval state
const approvalWrapper = (approvals, userType, changeApproval, attr) => {
	let style;

	if (userType == 'user') {
		style = approvals[attr] ? inputStyles.approvedUser : inputStyles.rejected;
	} else {
		style = approvals[attr] ? inputStyles.approved : inputStyles.rejected;
	}


	if (userType == 'user') {
		return <InputGroup.Addon>{ style.status }</InputGroup.Addon>;

	} else {
		return (
			<InputGroup.Button>
				<Button bsStyle={ style.style } name={ attr } onClick={ changeApproval.bind(null, attr) }>
					{ style.status }
				</Button>
			</InputGroup.Button>
		);
	}
};






// puts the above together and generates the full input element
const getAttrInput = (props, approvalState, valid, attr) => {
	let input;
	let label = <ControlLabel>{ inputLabels[attr] }</ControlLabel>;

	if (attr == 'reqBudget') {
		input = (
			<InputGroup>
				<FormControl
					name='reqBudget'
					onChange={ props.handleAttrChange }
					type='text'
					value={ moneyString(props.project.reqBudget) }
					readOnly
				/>

				<InputGroup.Button>
					<Button onClick={ props.budgetTab }>
						Switch to Detailed Budget Breakdown
					</Button>
				</InputGroup.Button>

				{ approvalState('reqBudget') }
			</InputGroup>
		);

	} else if (inputTypes[attr] == 'date') {
		label = null;
		input = (
			<InputGroup>
				<InputGroup.Addon>{ inputLabels[attr] }</InputGroup.Addon>
				
				<FormControl
					name={ attr }
					onChange={ props.handleAttrChange }
					type='date'
					value={ props.project[attr] }
					required
				/>
				
				{ approvalState(attr) }
			</InputGroup>
		);

	} else if (inputTypes[attr] == 'select') {
		input = (
			<InputGroup>	
				<FormControl
					componentClass='select'
					name={ attr }
					onChange={ props.handleAttrChange }
					value={ props.project[attr] }
					required
				>

					{ 
						options[attr].map(option => (
							<option key={ option } value={ option }>{ option }</option>
						))
					}

				</FormControl>
				{ approvalState( attr ) }
			</InputGroup>
		);

	} else {
		input = (
			<InputGroup>	
				<FormControl
					name={ attr }
					onChange={ props.handleAttrChange }
					type={ inputTypes[attr] }
					value={ props.project[attr] }
					required
				/>		

				{ approvalState(attr) }	
			</InputGroup>
		);
	}
	return (
		<FormGroup validationState={ valid(attr) }>
			{ label }
			{ input }
		</FormGroup>
	);
};





//--------------------------------------------------------------------------------------
//																		Component
//--------------------------------------------------------------------------------------

const PitchSummary = props => {

	// convert approvals from a magic string to a readable object
	let approvals = genApprovalObject(props.project.approvals);


	let valid = attr => validationState(approvals, props.userType, attr);

	let approvalState = attr => approvalWrapper(
		approvals,
		props.userType,
		props.handleApprovalChange,
		attr
	);

	let getInput = attr => getAttrInput(
		props,
		approvalState,
		valid,
		attr
	);


	return (
		<div className='Pitch'>
			<Form onSubmit={ props.handlePitchSubmit }>
				{ getInput('name') }
				{ getInput('vertical') }
				{ getInput('tier') }
				{ getInput('numAssets') }
				{ getInput('type') }
				{ getInput('reqBudget') }

				<ControlLabel>
					Project Dates
				</ControlLabel>
				
				{ getInput('startDate') }
				{ getInput('endDate') }
				{ getInput('editDate') }
				{ getInput('releaseDate') }
				
				{ 
					props.userType == 'user' && props.project.adminNotes &&
						<p>{ props.project.adminNotes }</p>
				}

				{ 
					props.userType != 'user' &&
						<FormGroup>
							<ControlLabel> Admin Notes </ControlLabel>
							
							<FormControl
								componentClass='textarea'
								name='adminNotes'
								onChange={ props.handleAttrChange }
								placeholder='If rejecting please explain why here.'
								value={ props.project.adminNotes }
							/>
						</FormGroup>
				}

				<h4>{ props.errorMessage }</h4>

				{
					props.userType == 'user' &&
						<Button type='submit'>
							Submit pitch for approval
						</Button>
				}

				{
					props.userType != 'user' && 
					props.project.approvals == '1111111111' &&
						<FormGroup>
							<Button bsStyle='success' type='submit'>
								{ props.newProject ? 'Create Project' : 'Approve Pitch' }
							</Button>
						</FormGroup>
				}

				{
					props.userType != 'user' && 
					props.project.approvals != '1111111111' &&
						<FormGroup>
							<Button bsStyle='danger' type='submit'>
								Reject Pitch
							</Button>
						</FormGroup>
				}
			</Form>
		</div>
	);
};


export default PitchSummary;

