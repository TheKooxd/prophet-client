import React from 'react';
import ReactDOM from 'react-dom';
import { FormGroup, ControlLabel, HelpBlock, FormControl } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import './react-datepicker.less';
import moment from 'moment';
import './jquery.timePicker.min.js';
import './time-picker.less';


class BasicInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = { nameValidation: undefined, name: "" , location: "", startTime: moment(), endTime: moment(), closes: moment(), type: "jumis"}
    this.handleChange = this.handleChange.bind(this)
    this.getValidationState = this.getValidationState.bind(this)
    this.startTimeChange = this.startTimeChange.bind(this)
    this.endTimeChange = this.endTimeChange.bind(this)
    this.closesTimeChange = this.closesTimeChange.bind(this)
    this.validateDate = this.validateDate.bind(this)
 }
  
  getValidationState(input) {
    if(input > 0) {
      return "success";
    }
    else return "error"
  }

  handleChange(e) {
    if(e.target.id == "name") {
      this.setState({ name: e.target.value })
    }
    if(e.target.id == "location") {
      this.setState({ location: e.target.value })
    }
    if(e.target.id == "type") {
      this.setState({ type: e.target.value })
    }
    this.props.updateBasic(e.target.id, e.target.value, e.target.type)
  }

  startTimeChange(date) {
    var d = date.target.value.replace("T", " ").split(" ")
    d[0] = d[0].split("-")
    d[1] = d[1].split(":")
    d[0][1] = (d[0][1] - 1).toString()
    if((d[0][1]).length == 1) d[0][1] = "0" + d[0][1]
    var temp = new Date(d[0][0], d[0][1], d[0][2], d[1][0], d[1][1])
    this.props.updateBasic("starts", temp)
    this.setState({startTime: temp})
  }

   endTimeChange(date) {
    var d = date.target.value.replace("T", " ").split(" ")
    d[0] = d[0].split("-")
    d[1] = d[1].split(":")
    d[0][1] = (d[0][1] - 1).toString()
    if((d[0][1]).length == 1) d[0][1] = "0" + d[0][1]
    var temp = new Date(d[0][0], d[0][1], d[0][2], d[1][0], d[1][1])
    this.setState({endTime: temp})
    this.props.updateBasic("ends", temp)
  }

  closesTimeChange(date) {
    var d = date.target.value.replace("T", " ").split(" ")
    d[0] = d[0].split("-")
    d[1] = d[1].split(":")
    d[0][1] = (d[0][1] - 1).toString()
    if((d[0][1]).length == 1) d[0][1] = "0" + d[0][1]
    var temp = new Date(d[0][0], d[0][1], d[0][2], d[1][0], d[1][1])
    this.setState({closes: temp})
    this.props.updateBasic("closes", temp)
  }

  validateDate(e) {
    return "success";
  }


  render() {
    return(
      <div>
        <form>
          <FormGroup
            controlId="name"
            validationState={this.getValidationState(this.state.name.length)}
          >
            <ControlLabel>Name of the Event</ControlLabel>
            <FormControl
              type="text"
              value={this.state.name}
              onChange={this.handleChange}
              placeholder="Enter text"
            />
            <FormControl.Feedback />
            <HelpBlock>Short and descriping name for this event (eg. "Jumalanpalvelus")</HelpBlock>
          </FormGroup>
          <FormGroup
            controlId="type"
          >
            <ControlLabel>Event Type</ControlLabel>
              <FormControl
                componentClass="select"
                value={this.state.type}
                onChange={this.handleChange}
                placeholder="Select type..."
              >
              <option value="jumis">Jumalanpalvelus</option>
              <option value="innostajat">Innostajat</option>
              <option value="festarit">Festarit</option>
              <option value="nuortenilta">Nuortenilta</option>
              <option value="talkoot">Talkoot</option>
              <option value="other">Muu seurakunnan toiminta</option>
            </FormControl>
            <FormControl.Feedback />
            <HelpBlock>What kind of event is this? (eg. Nuortenilta, Innostajat, Jumis...)</HelpBlock>
          </FormGroup>
          <FormGroup
            controlId="location"
            validationState={this.getValidationState(this.state.location.length)}
          >
            <ControlLabel>Location</ControlLabel>
            <FormControl
              type="text"
              value={this.state.location}
              onChange={this.handleChange}
              placeholder="Enter text"
            />
            <FormControl.Feedback />
            <HelpBlock>Location for event (Address or something familiar like "Seukkari")</HelpBlock>
          </FormGroup>
          <div className="row">
            <div className="col-md-4">
              <FormGroup
                controlId="startTime"
                validationState={this.validateDate("start")}
              >
                <ControlLabel>Start Time</ControlLabel><br/>
                <input onBlur={this.startTimeChange} type="datetime-local" id="testDate"/>
                <HelpBlock>"When should I be there?"</HelpBlock>
              </FormGroup>
              </div>
              <div className="col-md-4">
                <FormGroup
                  controlId="endTime"
                >
                  <ControlLabel>End Time</ControlLabel><br/>
                  <input onBlur={this.endTimeChange} type="datetime-local" id="testDate"/>
                  <HelpBlock>"When can I leave?"</HelpBlock>
                </FormGroup>
              </div>
              <div className="col-md-4">
                 <FormGroup
                  controlId="closes"
                >
                  <ControlLabel>Joining Ends</ControlLabel><br/>
                  <input onBlur={this.closesTimeChange} type="datetime-local" id="testDate"/>
                  <HelpBlock>"When do I have to decide?"</HelpBlock>
                </FormGroup>
              </div>
            </div>
        </form>
      </div>
    )
  }
}

export default BasicInfo;
