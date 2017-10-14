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
	
	
	resetErrorMessages() {
		this.props.resetRegistrationMessages();
	}


	handleChange(e) {
		this.setState({ [ e.target.name ]: e.target.value });
	}


	handlePassChange(e) {
		if (this.state.pass.length < 6) {
			this.props.registrationPasswordError('Password must be longer than 6 characters');
		
		} else if (this.props.messages.registerPassword || this.props.messages.registerOrganization) {
			this.props.resetRegistrationMessages();
		}
		
		this.setState({ [ e.target.name ]: e.target.value });
	}


	handleSubmit(e) {
		e.preventDefault();
		this.props.registerOrganization(this.state.organization, this.state.admin, this.state.pass);
	}


	render() {
		return (
			<div id='loginPanel'>
				<Panel bsStyle='primary' header={ <h2>We're happy you want to do this</h2> }>
					<Form onSubmit={ this.handleSubmit.bind(this) } onBlur={ this.resetErrorMessages.bind(this) }>
						
						<Link to={'/login'}>
							<Button bsSize='small' bsClass='createOrgButton'>
								Login
							</Button>
						</Link>
						
						<br></br>
						
						<FormGroup controlId='userInput'>
							<ControlLabel id='loginLabel'>
								Organization
							</ControlLabel>
							
							<FormControl 
								type='text'
								value={ this.state.organization }
								placeholder='name it something catchy'
								onChange={ this.handleChange.bind(this) }
								name='organization'
								required
							/>
						</FormGroup>
						
						<FormGroup controlId='userInput'>
							<ControlLabel id='loginLabel'>
								Admin
							</ControlLabel>
							
							<FormControl
								type='text'
								value={ this.state.admin }
								placeholder='the company leader'
								onChange={ this.handleChange.bind(this) }
								name='admin'
								required
							/>
							
							<p id='registerOrgMessage'>
								{ this.props.messages.registerOrg }
							</p>
						</FormGroup>
						
						<div>
							<ControlLabel id='loginLabel'>Password</ControlLabel>
							
							<FormGroup controlId='passwordControl' validationState={ this.state.pass.length < 6 ? 'warning' : 'success' }>
								<FormControl
									type='password'
									value={ this.state.pass }
									placeholder='••••••••••'
									onChange={ this.handlePassChange.bind(this) }
									name='pass'
									required
								/>
								
								<FormControl.Feedback />
								
								<p id='registerPasswordMessage'>
									{ this.props.messages.registerPassword }
								</p>
								
								<FormControl
									type='password'
									value={ this.state.pass2 }
									placeholder='Re-enter Password'
									onChange={ this.handlePassChange.bind(this) }
									name='pass2'
								/>
								
								<FormControl.Feedback />
							</FormGroup>
						</div>
						
						<ButtonToolbar bsClass='loginButton'>
							<Button
								type='submit'
								bsStyle='primary'
								bsSize='large'
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

