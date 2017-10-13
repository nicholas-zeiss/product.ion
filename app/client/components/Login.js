/**
 *
 *  Here we set up the login page
 *
**/


import React from 'react';
import { Link, browserHistory } from 'react-router';
import ApiCall from '../utils/serverCalls';

import { Button, Panel, FormGroup, FormControl, Form, ControlLabel, ButtonToolbar, Col } from 'react-bootstrap';

const Login = React.createClass({
	getInitialState() {
		return {
			username: '',
			password: '',
			renderStuff: true
		};
	},

	componentWillMount() {
		this.props.resetLoginMessage();
		
		if (sessionStorage.token) {
			this.props.refreshLogin(sessionStorage.token);
			this.setState({ renderStuff: false });
		}
	},

	handleUserChange(e) {
		this.setState({ username: e.target.value });
	},

	handlePassChange(e) {
		this.setState({ password: e.target.value });
	},

	handleSubmit(e) {
		e.preventDefault();
		this.props.login(this.state.username, this.state.password);
	},

	render() {
		if (this.state.renderStuff) {
			return (
				<div id='loginPanel'>
					<Panel bsStyle="primary" header={<h2 bsClass="happy">Happy Budgeting!</h2>}>
						<Form className='' onSubmit={this.handleSubmit} onBlur={this.props.resetLoginMessage}>
							<Button bsStyle="default" bsSize="small" bsClass="createOrgButton">
								<Link to={'/register'}>
									Create Organization
								</Link>
							</Button>
							<FormGroup controlId="userInput">
								<ControlLabel bsClass="userLabel" htmlFor="username">Username</ControlLabel>
								<FormControl type="text" value={this.state.username} placeholder="Enter text"
									onChange={this.handleUserChange} required/>
							</FormGroup>
							<FormGroup controlId="userInput">
								<ControlLabel bsClass="userLabel" htmlFor="password">Password</ControlLabel>
								<FormControl type="password" value={this.state.password} placeholder="•••••••••••"
									onChange={this.handlePassChange} required/>
							</FormGroup>
							<div className="loginButton">
								<p id="loginMessage">{this.props.messages.login}</p>
							</div>
							<ButtonToolbar bsClass="loginButton">
								<Button type="submit" bsStyle="primary" bsSize="large" block>Login</Button>
							</ButtonToolbar>
						</Form>
					</Panel>
				</div>
			);

		} else {
			return <div id='loginPanel'></div>;
		}
	}
});

export default Login;

