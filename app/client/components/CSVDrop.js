import React from 'react';
import Papa from 'papaparse';
import { FormGroup, FormControl, ControlLabel, Panel } from 'react-bootstrap';
import Dropzone from 'react-dropzone';
import NavBar from './NavBar.js';


const CSVDrop = React.createClass({
  // Papaparse takes a blob file as its first argument.
  // Its second argument is a customizable configuration object. Here, we set the download to true or else the blob file will not be fully downloaded.
  getInitialState() {
    return {
      projs_id: undefined
    }
  },
  onDrop (file) {
    if (this.state.projs_id) {
      console.log("EVENTS FROM DROPZONE ", file);
      console.log("THIS IS ", this);
      console.log("THIS.REFS IS ", this.refs);
      let that = this;
      var id = this.state.projs_id
      Papa.parse(file[0].preview, {
        header: true,
        download: true,
        complete: function(res) {
          if(res.length !== 0) {
            console.log("COMPLETE DATA ", res);
            console.log("Props are ", that.props);
            console.log(this.state);
            that.props.parseCSV(res.data, id);
          } else {
            reject('Nothing parsed')
          }
        }
      });
    }
  },
  handleChangeProj(e) {
    this.setState({projs_id: e.target.value})
  },
  render () {
    return (
      <div>
        <Panel>
          <NavBar {...this.props}/>
        </Panel>
        <h3>Add Expenses to a Project with a CSV</h3>
        <form>
          <FormGroup>
            <ControlLabel>Select a Project</ControlLabel>
            <FormControl componentClass="select" placeholder="Project" onChange={this.handleChangeProj}>
              {this.props.projects.map(function(project, idx) {
                return (<option key={idx} value={project.id}>{project.name}</option>)
              })}
            </FormControl>
          </FormGroup>
        </form>
        <Dropzone type="file" ref="file" onDrop={this.onDrop}>
          <div>Try dropping some files here, or click to select files to upload.</div>
        </Dropzone>
      </div>
    )
  }
});

export default CSVDrop;