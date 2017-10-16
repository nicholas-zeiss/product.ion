/**
 *
 *  Component for the projects page, which lets you view all projects, edit them, and create new ones
 *
**/


import React from 'react';
import { Button, Modal, Panel, Table } from 'react-bootstrap';

import projectTableHeader from '../data/projectTableHeader';

import NavBar from './NavBar.js';
import Pitch from './Pitch.js';
import ProjectNode from './ProjectNode.js';


class Projects extends React.Component {
	constructor(props) {
		super(props);

		this.state = { projectToEdit: null };
	}


	//As the Pitch modal is a child of Projects we need to keep track of the project supplied
	//to it in this component's state. This method is passed down to individual ProjectNode components
	//allowing them to alter Projects' state and activate the modal.
	setProjectToEdit(project) {
		this.setState({ projectToEdit: project }, () => {
			this.props.toggleModal('pitch');
			
			//project may be null if we are creating a new pitch, not editing an extant one.
			//if it does exist we need to load its expenses.
			if (project) {
				this.props.getExpenses(project.id);
			}
		});
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
							onClick={ this.setProjectToEdit.bind(this, null) }
							style={ { 'marginBottom': '15px' } }
						>
							Create a Pitch
						</Button>

						<Modal onHide={ this.props.toggleModal.bind(this, 'pitch') } show={ this.props.modals.pitch }>
							<Modal.Body>
								<Pitch { ...this.props } project={ this.state.projectToEdit }/>
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
										editProject={ this.setProjectToEdit.bind(this) }
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

