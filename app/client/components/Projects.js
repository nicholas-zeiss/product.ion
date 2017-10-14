

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


	switchModal(project) {
		if (project != null) {
			this.setState({editProject: project});
		} else {
			this.setState({editProject: null});
		}
		this.props.changeModal('pitch');
	}


	render() {
		return (
			<div style={ { fontSize: '14px'} }>
				{
					this.props.short ? <div></div> :
						<div>
							<NavBar { ...this.props }/>
						</div>
				}

				<Panel>
					{
						this.props.short ? <div></div> :
							<div>
								<Button bsStyle="primary" style={ {'margin-bottom':'15px'} } bsSize="large" id="modalButton" onClick={ this.switchModal }>
								Create a Pitch
								</Button>
								<Modal show={ this.props.modals.pitch } onHide={ this.switchModal } >
									<Modal.Body>
										<Pitch { ...this.props } data={ this.state.editProject }/>
									</Modal.Body>
									<Modal.Footer />
								</Modal>
							</div>
					}

					<Table striped bordered>
						{ projectTableHeader }
						<tbody>
							{ this.props.short ? this.props.projects.slice(-3).map((project, idx) =>
								<ProjectNode key={ idx } idx={ idx } { ...this.props } project={ project } switchModal={ this.switchModal }/>)
								: this.props.projects.map((project, idx) =>
									<ProjectNode key={ idx } idx={ idx } { ...this.props } project={ project } switchModal={ this.switchModal }/>
								) }
						</tbody>
					</Table>
				</Panel>
			</div>
		);
	}
}

export default Projects;

