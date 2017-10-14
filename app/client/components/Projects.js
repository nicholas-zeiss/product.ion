/**
 *
 *  Component for the projects page, which lets you view all projects and edit pitches
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

		this.state = { editProject: null };
	}


	toggleModal(project) {
		if (project != null) {
			this.setState({ editProject: project });
		
		} else {
			this.setState({ editProject: null });
		}

		this.props.toggleModal('pitch');
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
							onClick={ this.toggleModal.bind(this) }
							style={ { 'marginBottom': '15px' } }
						>
							Create a Pitch
						</Button>

						<Modal onHide={ this.toggleModal.bind(this) } show={ this.props.modals.pitch }>
							<Modal.Body>
								<Pitch { ...this.props } data={ this.state.editProject }/>
							</Modal.Body>
							<Modal.Footer/>
						</Modal>
					</div>
					
					<Table bordered striped>
						{ projectTableHeader }
						<tbody>
							{
								this.props.projects.map((project, idx) => (
									<ProjectNode { ...this.props } key={ idx } project={ project }/>
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

