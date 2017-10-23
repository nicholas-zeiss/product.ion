import React from 'react';
import NavBar from './NavBar';
import UserList from './UserList';
import AddUser from './AddUser';
import { Button, Col, ControlLabel, Form, FormGroup, FormControl, Grid, Modal, Panel, Row } from 'react-bootstrap';

class Settings extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			newPass1: '',
			newPass2: ''
		};
	}


	componentWillUnmount() {
		this.props.clearUI();
	}


	handleSubmit(e) {
		e.preventDefault();
				
		if (this.state.newPass1 == this.state.newPass2) {
			this.props.changePassword(this.props.organization.user.id, this.state.newPass1);
			this.setState({ newPass1: '', newPass2: '', validate: undefined });
		}
	}


	handleChange(e) {
		if (e.target.name == 'newPass2') {
			if (e.target.value == this.state.newPass1) {
				this.setState({ validate: 'success' });
				this.props.setMessages({ password: '' });

			} else {
				this.setState({ validate: 'error' });
				this.props.setMessages({ password: 'Passwords do not match' });
			}
		}

		this.setState({ [e.target.name]: e.target.value });
	}


	render() {
		let user = this.props.organization.user;

		return (
			<div className='settings'>
				<NavBar { ...this.props }/>
				<Panel>
					<Panel>
						<b style={ { fontSize: '30px'} }>
							Welcome to your settings, { user.username }! You are a { user.permissions } of { this.props.organization.name }
						</b>
					</Panel>

					<br></br>

					<Modal onHide={ this.props.toggleUserModal } show={ this.props.UI.views.userModal && user.permissions == 'admin' }>
						<Modal.Header closeButton>
							<Modal.Title bsClass='addUserTitle'> Add a User to { this.props.organization.name } </Modal.Title>
						</Modal.Header>
						
						<Modal.Body>
							<AddUser { ...this.props }/>
						</Modal.Body>
						
						<Modal.Footer>
							<Button onClick={ this.props.toggleUserModal }>Close</Button>
						</Modal.Footer>
					</Modal>

					<br></br>
					
					<div id='settingsWindow'>
						<Grid>
							<Row>
								<Col md={ 3 }>
								</Col>
								<Col md={ 3 }>
									<div id='settingsMain'>
										<Form onSubmit={ this.handleSubmit.bind(this) }>
											<h3>
												<strong>
													Change Your Password
												</strong>
											</h3>
											
											<br></br>
											
											<FormGroup validationState={ this.state.validate }>
												<ControlLabel bsClass='chartSortSelector'>
													New Password
												</ControlLabel>
												
												<FormControl
													name='newPass1'
													onChange={ this.handleChange.bind(this) }
													placeholder='••••••••••'
													type='password'
													value={ this.state.newPass1 }
													required
												/>
												<FormControl.Feedback />
												
												<br></br>
												
												<ControlLabel bsClass='chartSortSelector'>
													Confirm New Password
												</ControlLabel>
												
												<FormControl
													name='newPass2'
													onChange={ this.handleChange.bind(this) }
													placeholder='••••••••••'
													type='password'
													value={ this.state.newPass2 }
													required
												/>
												
												<FormControl.Feedback />
												
												<p id='passwordMessage'>{ this.props.UI.messages.password }</p>
											</FormGroup>
											
											<Button bsStyle='primary' type='submit'>
												Change Password
											</Button>
										</Form>
									</div>
								</Col>
								
								<Col md={ 3 }>
									<div id='settingsOptional'>
										{
											user.permissions == 'admin' && <UserList { ...this.props }/>
										}
									</div>
								</Col>
								<Col md={ 3 }>
								</Col>
							</Row>
						</Grid>
					</div>
				</Panel>
			</div>
		);
	}
}


export default Settings;

