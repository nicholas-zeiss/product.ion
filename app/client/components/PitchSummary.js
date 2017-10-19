/*
 *
 *	Dumb component that gives us a form with which we edit a project pitch. Used by the Pitch component.
 *	The project is held in Pitch's state, and Pitch provides us with props to propogate changes to it.
 *
**/


import React from 'react';
import { Button, ControlLabel, Form, FormControl, FormGroup, InputGroup } from 'react-bootstrap';

import { moneyString } from '../utils/misc';
import { genApprovalObject, genApprovalString } from '../utils/projectUtils';


// These are the various validation states for our bootstrap form components.
// Validition states do not reflect the correctness of input values, but whether
// that detail of the project has been approved or rejected by an admin or producer.
// As such users and admin/producers have slightly different views for this form.
const formStyles ={
	approved: {
		status: 'Approved',
		style: 'success',
		val: 'success'
	},
	approvedUser: {
		status: 'No issues',
		style: '',
		val: null
	},
	rejected: {
		status: 'Rejected',
		style: 'danger',
		val: 'error'
	}
};


const validationState = (approvals, userType, attr) => (
	approvals[attr] ? userType == 'user' ? null : 'success' : 'error'
);


// helper function for wrapping an input in its approval state and, if user is admin/producer
// a button to change its approval state
const approvalWrapper = (approvals, userType, changeApproval, attr) => {
	let style;

	if (userType == 'user') {
		style = approvals[attr] ? formStyles.approvedUser : formStyles.rejected;
	} else {
		style = approvals[attr] ? formStyles.approved : formStyles.rejected;
	}


	if (userType == 'user') {
		return (
			<InputGroup.Addon>
				{ style.status }
			</InputGroup.Addon>
		);

	} else {
		return (
			<InputGroup.Button>
				<Button bsStyle={ style.style } name={ attr } onClick={ changeApproval }>
					{ style.status }
				</Button>
			</InputGroup.Button>
		);
	}
};


const PitchSummary = props => {

	// convert approvals from a magic number to a readable object
	let approvals = genApprovalObject(props.project.approvals);

	// Including the above two helper functions in this scope would require recreating them every
	// time this component is rerendered and would be wasteful, as would binding them here (same problem).
	// Instead, we provide these wrappers to avoid writing them out in full below.
	let valid = attr => validationState(approvals, props.userType, attr);

	let approvalState = attr => approvalWrapper(
		approvals,
		props.userType,
		props.handleApprovalChange,
		attr
	);


	return (
		<div className='Pitch'>
			<Form onSubmit={ props.handlePitchSubmit }>
				<FormGroup controlId='formProjName' validationState={ valid('name') }>
					<ControlLabel>
						Project Name
					</ControlLabel>
					
					<InputGroup>	
						<FormControl
							name='name'
							onChange={ props.handleAttrChange }
							type='text'
							value={ props.project.name }
							required
						/>		
						{ approvalState('name') }	
					</InputGroup>
					
					<p>{ props.errorMessage }</p>
				</FormGroup>
				
				<FormGroup controlId='formVertical' validationState={ valid('vertical') }>
					<ControlLabel>
						Vertical
					</ControlLabel>
					
					<InputGroup>
						<FormControl
							componentClass='select'
							name='vertical'
							onChange={ props.handleAttrChange }
							value={ props.project.vertical }
							required
						>
							<option value='food'>Food</option>
							<option value='beauty'>Bearty</option>
							<option value='fashionStyle'>Fashion & Style</option>
							<option value='newsPolitics'>News/Politics</option>
							<option value='newsWeb'>News/Web</option>
							<option value='wellness'>Wellness</option>
							<option value='entertainment'>Entertainment</option>
						</FormControl>
						
						{ approvalState('vertical') }
					</InputGroup>
				</FormGroup>
				
				<FormGroup controlId='formTier' validationState={ valid('tier') }>
					<ControlLabel>
						Tier
					</ControlLabel>
					
					<InputGroup>
						<FormControl
							componentClass='select'
							name='tier'
							onChange={ props.handleAttrChange }
							value={ props.project.tier }
							required
						>
							<option value='br'>BR</option>
							<option value='t1'>T1</option>
							<option value='t2'>T2</option>
							<option value='t3'>T3</option>
							<option value='t4'>T4</option>
							<option value='t5'>T5</option>
							<option value='r29'>R29</option>
						</FormControl>

						{ approvalState('tier') }
					</InputGroup>
				</FormGroup>
				
				<FormGroup controlId='formNumAssets' validationState={ valid('numAssets') }>
					<ControlLabel>
						Number of Assets
					</ControlLabel>
					
					<InputGroup>
						<FormControl
							name='numAssets'
							onChange={ props.handleAttrChange }										
							placeholder='How many episodes?'
							type='number'
							value={ props.project.numAssets }
							required
						/>

						{ approvalState('numAssets') }
					</InputGroup>
				</FormGroup>
				
				<FormGroup controlId='formVideoType' validationState={ valid('type') }>
					<ControlLabel>
						Video Type
					</ControlLabel>
					
					<InputGroup>
						<FormControl
							componentClass='select'
							name='type'
							onChange={ props.handleAttrChange }
							value={ props.project.type }
							required
						>
							<option value='feature'>Feature</option>
							<option value='short'>Short</option>
							<option value='television'>Television</option>
							<option value='web'>Web</option>
							<option value='episode'>Episode</option>
						</FormControl>

						{ approvalState('type') }
					</InputGroup>
				</FormGroup>

				<FormGroup controlId='formBudget' validationState={ valid('reqBudget') }>
					<ControlLabel>
						Requested Budget
					</ControlLabel>
					
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
				</FormGroup>
				
				<ControlLabel>
					Project Dates
				</ControlLabel>
				
				<FormGroup controlId='formStartDate' validationState={ valid('startDate') }>
					<InputGroup>
						<InputGroup.Addon>
							Start Date
						</InputGroup.Addon>
						
						<FormControl
							name='startDate'
							onChange={ props.handleAttrChange }
							type='date'
							value={ props.startDate }
							required
						/>
						
						{ approvalState('startDate') }
					</InputGroup>
				</FormGroup>
				
				<FormGroup controlId='formEndDate' validationState={ valid('endDate') }>
					<InputGroup>
						<InputGroup.Addon>
							End Date
						</InputGroup.Addon>
						
						<FormControl
							name='endDate'
							onChange={ props.handleAttrChange }
							type='date'
							value={ props.project.endDate }
							required
						/>

						{ approvalState('endDate') }
					</InputGroup>
				</FormGroup>
				
				<FormGroup controlId='formEditDate' validationState={ valid('editDate') }>
					<InputGroup>
						<InputGroup.Addon>
							Edit Date
						</InputGroup.Addon>
						
						<FormControl
							name='editDate'
							onChange={ props.handleAttrChange }
							type='date'
							value={ props.project.editDate }
							required
						/>
						
						{ approvalState('editDate') }
					</InputGroup>
				</FormGroup>
				
				<FormGroup controlId='formReleaseDate' validationState={ valid('releaseDate') }>
					<InputGroup>
						<InputGroup.Addon>
							Release Date
						</InputGroup.Addon>
						
						<FormControl
							name='releaseDate'
							onChange={ props.handleAttrChange }
							type='date'
							value={ props.project.releaseDate }
							required
						/>
						
						{ approvalState('releaseDate') }
					</InputGroup>
				</FormGroup>
				
				{ 
					props.userType == 'user' && props.project.adminNotes &&
						<p>{ props.project.adminNotes }</p>
				}

				{ props.userType != 'user' &&
						<FormGroup>
							<ControlLabel>
								Admin Notes
							</ControlLabel>
							
							<FormControl
								componentClass='textarea'
								name='adminNotes'
								onChange={ props.handleAttrChange }
								placeholder='If rejecting please explain why here.'
								value={ props.project.adminNotes }
							/>
						</FormGroup>
				}

				{
					props.userType == 'user' ?
						
						<Button type='submit'>
							Submit pitch for approval
						</Button>
						
						: 
						
						<FormGroup>
							<Button bsStyle='success' onClick={ props.handlePitchApproval } type='submit'>
								Approve Proposal
							</Button>
							&nbsp;

							{
								props.project.id &&
									<Button bsStyle='danger' type='submit'>
										Reject with Reasons
									</Button>
							}

						</FormGroup>
				}
			</Form>
		</div>
	);
};


export default PitchSummary;

