/**
 *
 *  Component for the login page
 *
**/


import React from 'react';
import { Link } from 'react-router';
import { Button, ButtonToolbar, ControlLabel, Form, FormControl, FormGroup, Panel } from 'react-bootstrap';


class Login extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			password: '',
			username: ''
		};
	}


	//reset any old login/signup error message
	componentWillMount() {
		this.props.setAuthMessage('');
		
		//If client already has an authorization token, check it. If valid the client
		//will route directly to the dashboard. If invalid the token will be destroyed.
		if (sessionStorage.token) {
			this.props.refreshLogin(sessionStorage.token);
		}
	}


	//update state to reflect changes in username/password fields
	handleChange(e) {
		this.setState({ [ e.target.name ]: e.target.value });
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
						
						<div className='loginButton'>
							<p id='loginMessage'>{ this.props.messages.auth }</p>
						</div>
						
						<ButtonToolbar bsClass='loginButton'>
							<Button
								bsSize='large'
								bsStyle='primary'
								type='submit'
								block
							>
								Login
							</Button>
						</ButtonToolbar>
					</Form>
				</Panel>
			</div>
		);
	}
}

export default Login;

