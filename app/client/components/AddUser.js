


import React from 'react';
import { Button, ControlLabel, Form, FormControl, FormGroup, Radio } from 'react-bootstrap';


class AddUser extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			pass1: '',
			pass2: '',
			permissions: 'user',
			validate: undefined,
			validateMessage: '',
			username: ''
		};
	}


	handleSubmit(e) {
		e.preventDefault();

		if (!this.state.validate) {
			this.props.createUser({
				orgID: this.props.organization.id,
				password: this.state.pass1,
				permissions: this.state.permissions,
				username: this.state.username
			});


		}
	}


	handleChange(e) {
		e.preventDefault();
		this.setState({ [e.target.name]: e.target.value }, this.validate);
	}


	validate() {
		if (this.state.username.length < 4 || /\W/.test(this.state.username)) {
			this.setState({ validate: 'error', validateMessage: 'Username must be at least 4 characters and not contain spaces' });
		} else if (this.state.pass1.length < 6) {
			this.setState({ validate: 'error', validateMessage: 'Password must be at least 6 characters' });
		} else if (this.state.pass1 != this.state.pass2) {
			this.setState({ validate: 'error', validateMessage: 'Passwords do not match' });
		} else {
			this.setState({ validate: undefined, validateMessage: '' });
		}
	}


	setPermissions(permissions) {
		this.setState({ permissions });
	}


	render() {
		return (
			<div style={ { textAlign: 'center' } }>
				<ControlLabel style={ { fontSize: '17px' } }>
					Select a permission level
				</ControlLabel>
				
				<FormGroup>
					<Radio
						id='userRadio'
						name='user-class'
						onClick={ this.setPermissions.bind(this, 'producer') }
						inline
					>
						Producer
					</Radio>
					
					<Radio
						id='userRadio'
						name='user-class'
						onClick={ this.setPermissions.bind(this, 'user') }
						defaultChecked
						inline
					>
						User
					</Radio>
				</FormGroup>
				
				<Form className='testFormCenter' onSubmit={ this.handleSubmit.bind(this) }>
					<FormGroup className='addUserField' validationState={ this.state.validate }>
						<ControlLabel className='userLabel'>
							Username
						</ControlLabel>
						<FormControl
							id='username'
							name='username'
							onChange={ this.handleChange.bind(this) }
							placeholder='Enter Username'
							type='text'
							value={ this.state.username }
							required
						/>
					</FormGroup>

					<FormGroup className='addUserField' validationState={ this.state.validate }>
						<ControlLabel bsClass='userLabel'>
							Password
						</ControlLabel>
						<FormControl
							id='password'
							name='pass1'
							onChange={ this.handleChange.bind(this) }
							placeholder='••••••••••'
							type='password'
							value={ this.state.pass1 }
							required
						/>
					</FormGroup>
					
					<FormGroup className='addUserField' validationState={ this.state.validate }>
						<ControlLabel bsClass='userLabel'>
							Confirm Password
						</ControlLabel>
						<FormControl
							id='password'
							name='pass2'
							onChange={ this.handleChange.bind(this) }
							placeholder='••••••••••'
							type='password'
							value={ this.state.pass2 }
							required
						/>
					</FormGroup>

					<p>{ this.state.validateMessage }</p>
					<p>{ this.props.UI.messages.user }</p>
					<Button  bsStyle='primary' type='submit'> Create User </Button>
				</Form>
			</div>
		);
	}
}


export default AddUser;

