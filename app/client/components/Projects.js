import React from 'react';
import { Link } from 'react-router';
import NavBar from './NavBar.js';
import Pitch from './Pitch.js';
import ProjectNode from './ProjectNode.js';
import { Button, Modal, Panel, Table } from 'react-bootstrap';

const Projects = React.createClass({
  getInitialState() {
    return {
      editProject: null
    };
  },

  switchModal(Project) {
    if (Project !== null) {
      this.setState({editProject: Project});
    } else {
      this.setState({editProject: null});
    }
    this.props.changeModal('pitch');
  },

  render() {
    return (
      <div style={{fontSize : "14px"}}>
        {
          this.props.short ? <div></div> :
          <div>
            <NavBar {...this.props}/>
          </div>
        }

        <Panel>
          {
            this.props.short ? <div></div> :
            <div>
              <Button bsStyle="primary" style={{"margin-bottom":"15px"}} bsSize="large" id="modalButton" onClick={this.switchModal}>
                Create a Pitch
              </Button>
              <Modal show={this.props.modals.pitch} onHide={this.switchModal} >
                <Modal.Body>
                  <Pitch {...this.props} data={this.state.editProject}/>
                </Modal.Body>
                <Modal.Footer />
              </Modal>
            </div>
          }

        	<Table striped bordered>
        		<thead>
        			<tr id="readOnlyHeader">
        				<th>Name</th>
        				<th>Project ID</th>
                <th>Created By</th>
        				<th>Project Status</th>
                <th>Estimate to Complete</th>
        				<th>Cost to Date</th>
        			</tr>
        		</thead>
        		<tbody>
        			{this.props.short ? this.props.projects.slice(-3).map((project, idx) =>
            			<ProjectNode key={idx} idx={idx} {...this.props} project={project} switchModal={this.switchModal}/>)
                : this.props.projects.map((project, idx) =>
                  <ProjectNode key={idx} idx={idx} {...this.props} project={project} switchModal={this.switchModal}/>
              )}
        		</tbody>
        	</Table>
        </Panel>
      </div>
    );
  }
});

export default Projects;
