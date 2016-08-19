import React from 'react';
import { Link } from 'react-router';
import { findDOMNode } from 'react-dom';
import { Button, ControlLabel, Form, FormControl, FormGroup, Panel, Radio } from 'react-bootstrap';

const AddUser = React.createClass({
  getInitialState () {
    return {
      username: "",
      password: "",
      perm: 2,
      validate: "",
      validateMessage: ""
    };
  },
  // Using regex and some logic, we ensure the user input aligns with our rules.
  validateUsername (name) {
    let regex = /\w/,i,
    spaces = /\s/;
    if (name.length < 6 || !name.match(regex) || name.match(spaces)) {
      this.setState({validate: "warning", validateMessage: "Username must be at least 6 characters and not contain spaces"});
      return false;
    } else {
      return true;
    }
  },
  // Concatenates a randomized string to the end of the username.
  randomPassword (length, username) {
    let chars = "abcdefghijklmnopqrstuvwxyz!@#$%^*_ABCDEFGHIJKLMNOP1234567890",
    pass = "";
    if(this.validateUsername(username)) {
      for (let x = 0; x < length; x++) {
        let i = Math.floor(Math.random() * chars.length);
        pass += chars.charAt(i);
      }
      return username + pass;
    } else {
      return "";
    }
  },
  generate (e) {
    e.preventDefault();
    let username = e.target.value;
    findDOMNode(this.refs.passwordInput).value = this.randomPassword(3, username);
  },
  // Sets password state.
  setPass (e) {
    this.setState({password: e.target.value});
  },
  // Sets permission state.
  setPerm (e) {
    this.setState({perm: e.target.value});
  },
  handleSubmit (e) {
    e.preventDefault();
    let name = this.state.username;
    if (!this.validateUsername(name)) {
      this.setState({validate: "warning", validateMessage:"Username must be at least 6 characters and not contain spaces"});
    } else {
      let username = this.state.username,
      password = this.state.password,
      orgs_id = this.props.organization.orgs_id,
      perm = this.state.perm;
      this.props.addNewUser(username, password, orgs_id, perm);
      this.setState({validateMessage: "You did it!"});
    }
  },
  changeOn (e) {
    e.preventDefault();
    let name = e.target.value;
    if (!this.validateUsername(name)) {
      this.setState({validate: "warning", validateMessage: "Username must be at least 6 characters and not contain spaces"});
    } if(name === "" || name.length >= 6) {
        this.setState({validate: "success", validateMessage: ""});
      }
    this.setState({[e.target.name]: e.target.value});
  },

  render() {
    const setRadio = ref => {this.input = ref;};
    return (
      <div style={{"text-align":"center"}}>
        <ControlLabel style={{"font-size":"17px"}}>Select a permission level</ControlLabel>
        <FormGroup>
          <Radio inline id="userRadio" name="user-class" value={0}
                onClick={this.setPerm}>
            ADMIN
          </Radio>
            {' '}
          <Radio inline id="userRadio" name="user-class" value={1}
                onClick={this.setPerm}>
            Producer
          </Radio>
            {' '}
          <Radio inline id="userRadio" name="user-class" value={2} defaultChecked
                onClick={this.setPerm}>
            User
          </Radio>
            {' '}
        </FormGroup>
        <div>
          <Form className="testFormCenter" onSubmit={this.handleSubmit}>
          <p>{this.state.validateMessage}</p>
             <FormGroup validationState={this.state.validate} bsClass="addUserField">
               <ControlLabel bsClass="addUserLabel">Username</ControlLabel>
               <FormControl type="text" id="username" placeholder="Enter Username" ref="usernameInput"
                        name="username" autoCorrect="off" autoCapitalize="off" spellCheck="false"
                       value={this.state.username} onChange={this.changeOn} onBlur={this.generate} required/>
               <FormControl.Feedback/>
             </FormGroup>

             <FormGroup bsClass="addUserField">
               <ControlLabel bsClass="addUserLabel">Password Generator</ControlLabel>
               <FormControl id="password" type="text" name="password"
                        ref="passwordInput" placeholder="Generated Password" onChange={this.setPass}/>
             </FormGroup>
               <p bsClass="reminder">Don't forget to copy the password before submitting</p>
             <div>
               <Button type="submit"> CREATE USER</Button>
             </div>
           </Form>
         </div>
       </div>
    );
  }
});
export default AddUser;
