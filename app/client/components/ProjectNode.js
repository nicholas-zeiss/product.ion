import React from 'react';
import { Link, browserHistory } from 'react-router';
import { Button, Modal, OverlayTrigger } from 'react-bootstrap';


const ProjectNode = React.createClass({
  toDollar(num) {
    return "$" + num.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
  },

  triggerProjectClick() {
    this.props.editProject(this.props.project);
  },

  render() {
    const { name, projID, status, costToDate, estimateToComplete } = this.props.project;
    var username = '';
    var that = this;
    this.props.organization.users.forEach(function(user) {
      if (user.id === that.props.project.createdBy) username = user.username;
    })

    return (
      <tr onClick={ this.props.editProject(this.props.project) } id="readOnlyBody">
        <td>{name}</td>
        <td>{projID}</td>
        <td>{username}</td>
        <td>{status}</td>
        <td>{this.toDollar(estimateToComplete)}</td>
        <td>{this.toDollar(costToDate)}</td>
      </tr>
    );
  }
});

export default ProjectNode;
