/**
 *
 *  Component for the signup page (for new organization)
 *
**/


import React from 'react';
import { Link } from 'react-router';
import { Button, ButtonToolbar, ControlLabel, Form, FormControl, FormGroup, Panel } from 'react-bootstrap';


class Register extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			organization: '',
			admin: '',
			pass: '',
			pass2: ''
		};
	}


	//clear any old warning messages about login/signup
	componentWillMount() {
		this.props.setAuthMessage('');
	}


	//update state to reflect changes to organization name/admin username fields
	handleChange(e) {
		this.setState({ [ e.target.name ]: e.target.value });
	}


	//update state and error message when first password field changes
	handlePassChange(e) {
		if (this.state.pass.length < 6) {
			this.props.setAuthMessage('Password must be longer than 6 characters');
		
		} else if (this.state.pass != this.state.pass2) {
			this.props.setAuthMessage('Passwords do not match');

		} else if (this.props.messages.auth) {
			this.props.setAuthMessage('');
		}
		
		this.setState({ [ e.target.name ]: e.target.value });
	}


	handleSubmit(e) {
		e.preventDefault();

		if (this.state.pass == this.state.pass2) {
			this.props.registerOrganization(this.state.organization, this.state.admin, this.state.pass);
		
		} else {
			this.props.setAuthMessage('Passwords do not match');
		}
	}


	//to validate password forms
	passValidation() {
		if (this.state.pass.length < 6 || this.state.pass != this.state.pass2) {
			return 'warning';
		
		} else {
			return 'success';
		}
	}


	render() {
		return (
			<div id='loginPanel'>
				<Panel bsStyle='primary' header={ <h2>{ 'Wer\'e happy you want to do this' }</h2> }>
					<Form onSubmit={ this.handleSubmit.bind(this) }>
						
						<Link to={ '/login' }>
							<Button bsClass='createOrgButton' bsSize='small'>
								Login
							</Button>
						</Link>
						
						<br></br>
						
						<FormGroup controlId='userInput'>
							<ControlLabel id='loginLabel'>
								Organization
							</ControlLabel>
							
							<FormControl 
								name='organization'
								onChange={ this.handleChange.bind(this) }
								placeholder='name it something catchy'
								type='text'
								value={ this.state.organization }
								required
							/>
						</FormGroup>
						
						<FormGroup controlId='userInput'>
							<ControlLabel id='loginLabel'>
								Admin
							</ControlLabel>
							
							<FormControl
								name='admin'
								onChange={ this.handleChange.bind(this) }
								placeholder='the company leader'
								type='text'
								value={ this.state.admin }
								required
							/>
						</FormGroup>
						
						<div>
							<ControlLabel id='loginLabel'>Password</ControlLabel>
							
							<FormGroup controlId='passwordControl' validationState={ this.passValidation.apply(this) }>
								<FormControl
									name='pass'
									onChange={ this.handlePassChange.bind(this) }
									placeholder='••••••••••'
									type='password'
									value={ this.state.pass }
									required
								/>
								
								<FormControl.Feedback />
								
								<FormControl
									name='pass2'
									onChange={ this.handleChange.bind(this) }
									placeholder='Re-enter Password'
									type='password'
									value={ this.state.pass2 }
								/>
								
								<FormControl.Feedback />
								
								<p id='registerPasswordMessage'>
									{ this.props.messages.auth }
								</p>

							</FormGroup>
						</div>
						
						<ButtonToolbar bsClass='loginButton'>
							<Button
								bsSize='large'
								bsStyle='primary'
								type='submit'
								block
							>
								Create
							</Button>
						</ButtonToolbar>
					
					</Form>
				</Panel>
			</div>
		);
	}
}

export default Register;

