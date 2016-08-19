import React from 'react';
import { Link } from 'react-router';
import NavBar from './NavBar';
import * as dom from 'react-dom';
import UserList from "./UserList";
import AddUser from './AddUser';
import { Form, FormGroup, FormControl, Grid, Row, Col, ControlLabel, Panel, Button, Modal } from 'react-bootstrap';

const Settings = React.createClass({
  getInitialState() {
    return {
      currentPass: "",
      newPass1: "",
      newPass2: "",
      validate: "success",
      validateMessage: ""
    };
  },
  handleSubmit (e) {
    e.preventDefault();
    const {user} = this.props.organization;
    if (user.perm === 0 && this.state.newPass1 === this.state.newPass2) {
      let currentPassword = this.state.currentPass,
          newPassword = this.state.newPass1;
      this.props.changePassword(user.name, currentPassword, newPassword);
    } else {
      this.props.setPasswordMessage("You don't have permission to do that.");
    }
    this.setState({currentPass: "", newPass1: "", newPass2: ""});
  },
  changeOn (e) {
    if (e.target.name === "currentPass") this.props.resetPasswordMessage();
    if (e.target.name === "newPass2") {
      if (e.target.value === this.state.newPass1) {
        this.setState({validate: "success", validateMessage: ""});
      } else {
        this.setState({validate: "error", validateMessage: "Error! Passwords must match"});
      }
    }
    this.setState({[e.target.name]: e.target.value});
  },
  switchModal () {
    this.props.changeModal('addUser');
  },

  render() {
    const { orgName, user } = this.props.organization;
    const permName = { 0: "an Admin", 1: "a Producer", 2: "a User"};
    return (
      <div className="settings">
        <NavBar {...this.props}/>
        <Panel>
        <div>
        <Panel><b style={{"font-size":"30"}}>Welcome to your settings, {user.name}! You are {permName[user.perm]} of { orgName }</b></Panel>
        </div>

         <br></br>

           <Modal show={this.props.modals.addUser} onHide={this.switchModal} >
             <Modal.Header closeButton>
               <Modal.Title bsClass="addUserTitle">Add a User to {this.props.organization.orgName}</Modal.Title>
             </Modal.Header>
            <Modal.Body>
                 <AddUser {...this.props} />
               </Modal.Body>
             <Modal.Footer>
               <Button onClick={this.switchModal}>Close</Button>
             </Modal.Footer>
           </Modal>

           <br></br>
           <div id="settingsWindow">
             <Grid>
              <Row>
                <Col md={3}>
                </Col>
                <Col md={3}>
                  <div id="settingsMain">
                    <Form onSubmit={this.handleSubmit}>
                    <h3>Change {user.name}'s Password</h3>
                      <FormGroup>
                        <ControlLabel bsClass="chartSortSelector">Current Password</ControlLabel>&nbsp;
                        <FormControl type="password" placeholder="••••••••••" required
                                    name="currentPass" autoCorrect="off" autoCapitalize="off"
                                    spellCheck="false" value={this.state.currentPass}
                                    onChange={this.changeOn}  />
                        <p id="passwordMessage">{this.props.messages.password}</p>
                      </FormGroup>
                      <br></br>
                      <FormGroup validationState={this.state.validate}>
                        <ControlLabel bsClass="chartSortSelector">New Password</ControlLabel>
                        <FormControl type="password" placeholder="••••••••••" required
                                    autoCorrect="off" autoCapitalize="off"
                                    spellCheck="false" onChange={this.changeOn}
                                    name = "newPass1" value={this.state.newPass1}/>
                        <FormControl.Feedback />
                        <br></br>
                        <ControlLabel bsClass="chartSortSelector" htmlFor="newPassword">Confirm New Password</ControlLabel>
                        <FormControl type="password" placeholder="••••••••••"
                                    name="newPass2" autoCorrect="off"
                                    autoCapitalize="off" spellCheck="false"
                                    value={this.state.newPass2}
                                    onChange={this.changeOn} required />
                        <FormControl.Feedback />
                        <p id="passwordMessage">{this.state.validateMessage}</p>
                      </FormGroup>
                      <div>
                        <Button type="submit">
                          Change Password
                        </Button>
                      </div>
                    </Form>
                  </div>
                </Col>
                <Col md={3}>
                  <div id="settingsOptional">
                  {
                   !user.perm && <UserList {...this.props } switchModal={this.switchModal}/>
                  }
                  </div>
                </Col>
                <Col md={3}>
                </Col>
              </Row>
            </Grid>
          </div>
        </Panel>
      </div>
    );
  }
});

export default Settings;
