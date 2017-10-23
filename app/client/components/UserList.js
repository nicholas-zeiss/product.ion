


import React from 'react';
import { Form, FormControl, FormGroup, ControlLabel, Button } from 'react-bootstrap';


const UserList = props => {

	const handleChange = e => {
		e.preventDefault();
		props.updateUser(e.target.name, { permissions: e.target.value });
	};


	return (
		<div className='settingsMemberNode' style={ { display: 'flex', flexDirection: 'column', alignItems: 'flex-end', marginLeft: '30px' } }>
			<Form bsClass='usersSettings' id='user-list' style={ { display: 'flex', flexDirection: 'column', alignItems: 'flex-end' } }>
				<h4>
					<strong>
						Change User Permissions:
					</strong>
				</h4>

				{ 
					props.organization.users
						.filter(user => user.permissions != 'admin')
						.map((user, index) => (
							<FormGroup key={ index }>
								<ControlLabel bsClass='chartSortSelector'>{ user.username }</ControlLabel>&nbsp;&nbsp;
								<FormControl
									className='settingsMemberNode-perm'
									componentClass='select'
									form='user-list'
									name={ user.id }
									onChange={ handleChange }
									value={ user.permissions }
								>
									<option value='producer'>Producer</option>
									<option value='user'>User</option>
								</FormControl>
							</FormGroup>
						))
				}
			</Form>
		</div>
	);
};


export default UserList;

