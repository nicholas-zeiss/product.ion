/**
 *
 *  Component for the login page which is the view for the root url. 
 *
**/


import React from 'react';
import { Link } from 'react-router';
import { Button, ControlLabel, Form, FormControl, FormGroup, Panel } from 'react-bootstrap';


class Login extends React.Component {

	// as login is our index route, loading the page with any url path will first come here
	// so, we check for an auth token and login in that case before proceeding with the actual
	// login view
	constructor(props) {
		super(props);

		// if client already has a token try logging in with that. if successful, data is
		// loaded from server and client is pathed to the dashboard. if not, token is removed.
		if (sessionStorage.token) {
			this.props.refreshLogin(sessionStorage.token);
		}

		// reset any old error messages
		this.props.clearUI();
		
		this.state = {
			password: '',
			username: ''
		};
	}


	// update state to reflect changes in username/password fields
	handleChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}


	handleSubmit(e) {
		e.preventDefault();
		this.props.login(this.state.username, this.state.password);
	}


	render() {
		return (
			<div id='loginPanel'>
				<Panel bsStyle='primary' header={ <h2>Happy Budgeting!</h2> }>
					<Form onSubmit={ this.handleSubmit.bind(this) }>

						<Link to={ '/register' }>
							<Button bsClass='createOrgButton' bsSize='small'>
								Create Organization
							</Button>
						</Link>
						
						<FormGroup controlId='userInput'>
							<ControlLabel bsClass='userLabel'>
								Username
							</ControlLabel>
							
							<FormControl
								name='username'
								onChange={ this.handleChange.bind(this) }
								placeholder='Enter text'
								type='text'
								value={ this.state.username }
								required
							/>
						</FormGroup>
						
						<FormGroup controlId='userInput'>
							<ControlLabel bsClass='userLabel'>
								Password
							</ControlLabel>
							
							<FormControl
								name='password'
								onChange={ this.handleChange.bind(this) }
								placeholder='•••••••••••'
								type='password'
								value={ this.state.password }
								required
							/>
						</FormGroup>
						
						<p id='loginMessage'>
							{ this.props.UI.messages.user }
						</p>
						
						<Button
							bsSize='large'
							bsStyle='primary'
							type='submit'
							block
						>
							Login
						</Button>
					</Form>
				</Panel>
			</div>
		);
	}
}

export default Login;

