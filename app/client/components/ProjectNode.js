import React from 'react';
import { Link, browserHistory } from 'react-router';
import { Button, Modal, OverlayTrigger } from 'react-bootstrap';


const ProjectNode = React.createClass({
  toDollar(num) {
    return "$" + num.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
  },

  triggerProjectClick () {
    this.props.getProject(this.props.project.projId);
    if (this.props.project.status === "Pitch") {
      this.props.switchModal(this.props.project);
    } else {
      this.props.getExpenses(this.props.project.projId);
    }
  },

  render() {
    const { name, projId, status, costToDate, estimateToComplete } = this.props.project;

    return (
      <tr onClick={this.triggerProjectClick} id="readOnlyBody">
        <td>{name}</td>
        <td>{projId}</td>
        <td>{status}</td>
        <td>{this.toDollar(estimateToComplete)}</td>
        <td>{this.toDollar(costToDate)}</td>
      </tr>
    );
  }
});

export default ProjectNode;
