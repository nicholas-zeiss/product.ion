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

	componentWillMount() {
		this.props.setAuthMessage('');
		
		if (sessionStorage.token) {
			this.props.refreshLogin(sessionStorage.token);
		}
	}


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
				<Panel bsStyle='primary' header={ <h2 bsClass='happy'>Happy Budgeting!</h2> }>
					<Form onSubmit={ this.handleSubmit.bind(this) }>

						<Link to={ '/register' }>
							<Button bsSize='small' bsClass='createOrgButton'>
								Create Organization
							</Button>
						</Link>
						
						<FormGroup controlId='userInput'>
							<ControlLabel bsClass='userLabel'>
								Username
							</ControlLabel>
							
							<FormControl
								type='text'
								value={ this.state.username }
								placeholder='Enter text'
								onChange={ this.handleChange.bind(this) }
								name='username'
								required
							/>
						</FormGroup>
						
						<FormGroup controlId='userInput'>
							<ControlLabel bsClass='userLabel'>
								Password
							</ControlLabel>
							
							<FormControl
								type='password'
								value={ this.state.password }
								placeholder='•••••••••••'
								onChange={ this.handleChange.bind(this) }
								name='password'
								required
							/>
						</FormGroup>
						
						<div className='loginButton'>
							<p id='loginMessage'>{ this.props.messages.auth }</p>
						</div>
						
						<ButtonToolbar bsClass='loginButton'>
							<Button
								type='submit'
								bsStyle='primary'
								bsSize='large'
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

