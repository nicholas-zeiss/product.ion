/**
 *
 *  Component for the projects page, which lets you view all projects, edit them, and create new ones
 *
**/


import React from 'react';
import { Button, Modal, Panel, Table } from 'react-bootstrap';

import NavBar from './NavBar.js';
import Pitch from './Pitch.js';
import ProjectNode from './ProjectNode.js';

import { projectTableHeader } from '../utils/projectUtils';


class Projects extends React.Component {
	constructor(props) {
		super(props);
	}


	openPitchModal() {
		this.props.newEditProject(this.props.organization.id, this.props.organization.user.id);
		this.props.togglePitchModal();
	}


	render() {
		return (
			<div style={ { fontSize: '14px' } }>
				<NavBar { ...this.props }/>

				<Panel>
					<div>
						<Button
							bsSize='large'
							bsStyle='primary'
							id='modalButton' 
							onClick={ this.openPitchModal.bind(this) }
							style={ { 'marginBottom': '15px' } }
						>
							Create a Pitch
						</Button>

						<Modal onHide={ this.props.togglePitchModal } show={ this.props.UI.views.pitchModal }>
							<Modal.Body>
								<Pitch { ...this.props }/>
							</Modal.Body>
							<Modal.Footer/>
						</Modal>
					</div>
					
					<Table bordered striped>
						{ projectTableHeader }
						<tbody>
							{
								this.props.projects.map((project, idx) => (
									<ProjectNode
										{ ...this.props }
										key={ idx }
										project={ project }
									/>
								))
							}
						</tbody>
					</Table>
				</Panel>
			</div>
		);
	}
}

export default Projects;

