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
		this.props.clearUI();
	}


	//update state to reflect changes to organization and admin name, 
	//clear error message if one exists (error message is only generated on submit)
	handleUserOrgChange(e) {
		if (this.props.UI.messages.name) {
			this.props.setMessages({ name: '' });
		}

		this.setState({ [e.target.name]: e.target.value });
	}


	//update state to reflect changes to password inputs, update error message
	//as appropriate
	handlePassChange(e) {
		let otherPass = e.target.name == 'pass' ? this.state.pass2 : this.state.pass;

		if (e.target.value.length < 6) {
			this.props.setMessages({ password: 'Password must be longer than 6 characters' });

		} else if (e.target.value != otherPass) {
			this.props.setMessages({ password: 'Passwords do not match' });

		} else if (this.props.UI.messages.password) {
			this.props.setMessages({ password: '' });
		}

		this.setState({ [e.target.name]: e.target.value });
	}


	handleSubmit(e) {
		e.preventDefault();

		if (this.state.pass == this.state.pass2) {
			this.props.signup(this.state.organization, this.state.admin, this.state.pass);
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
								onChange={ this.handleUserOrgChange.bind(this) }
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
								onChange={ this.handleUserOrgChange.bind(this) }
								placeholder='the company leader'
								type='text'
								value={ this.state.admin }
								required
							/>
						</FormGroup>

						<p id='registerUserOrgMessage'>
							{ this.props.UI.messages.user }
						</p>
						
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
									onChange={ this.handlePassChange.bind(this) }
									placeholder='Re-enter Password'
									type='password'
									value={ this.state.pass2 }
								/>
								
								<FormControl.Feedback />
								
								<p id='registerPasswordMessage'>
									{ this.props.UI.messages.password }
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

