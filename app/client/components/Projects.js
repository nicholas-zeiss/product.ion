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


const Projects =  props => (
	<div style={ { fontSize: '14px' } }>
		<NavBar { ...props }/>

		<Panel>
			<div>
				<Button
					bsSize='large'
					bsStyle='primary'
					id='modalButton' 
					onClick={ props.toggleModal.bind(this, 'pitch') }
					style={ { 'marginBottom': '15px' } }
				>
					Create a Pitch
				</Button>

				<Modal onHide={ props.toggleModal.bind(this, 'pitch') } show={ props.modals.pitch }>
					<Modal.Body>
						<Pitch { ...props }/>
					</Modal.Body>
					<Modal.Footer/>
				</Modal>
			</div>
			
			<Table bordered striped>
				{ projectTableHeader }
				<tbody>
					{
						props.projects.map((project, idx) => (
							<ProjectNode { ...props } key={ idx } project={ project }/>
						))
					}
				</tbody>
			</Table>
		</Panel>
	</div>
);


export default Projects;

