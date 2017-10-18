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
							onClick={ this.props.viewPitchModal }
							style={ { 'marginBottom': '15px' } }
						>
							Create a Pitch
						</Button>

						<Modal onHide={ this.props.closePitchModal } show={ this.props.UI.views.pitch }>
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

