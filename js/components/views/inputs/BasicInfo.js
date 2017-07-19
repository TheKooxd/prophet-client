import React from 'react';
import ReactDOM from 'react-dom';
import { FormGroup, ControlLabel, HelpBlock, FormControl } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import './react-datepicker.less';
import moment from 'moment';
import TimePicker from 'react-bootstrap-time-picker';
import './jquery.timePicker.min.js';
import './time-picker.less';

class BasicInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = { nameValidation: undefined, name: "" , location: "", startTime: moment(), endTime: moment(), closes: moment()}
    this.handleChange = this.handleChange.bind(this)
    this.getValidationState = this.getValidationState.bind(this)
    this.startDateChange = this.startDateChange.bind(this)
    this.endDateChange = this.endDateChange.bind(this)
    this.closesDateChange = this.closesDateChange.bind(this)
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
  }

   startDateChange(date) {
    this.setState({
      startTime: date
    });
  }

   endDateChange(date) {
    this.setState({
      endTime: date
    });
  }

  closesDateChange(date) {
    this.setState({
      closes: date
    });
  }

  startTimeChange(date) {
    var temp = this.state.startTime;
    temp.set({hour:date.target.value.slice(0,5).split(":")[0], minute:date.target.value.slice(0,5).split(":")[1]});
    console.log(date.target.value.slice(0,5).split(":")[1])
    console.log(temp.format("DD/MM/YYYY HH:MM"))
    this.setState({
      startTime: temp
    });
  }

   endTimeChange(date) {
    console.log(date.target.value.slice(0,5).split(":"))
    var temp = this.state.endTime;
    temp.set({hour:date.target.value.slice(0,5).split(":")[0], minute:date.target.value.slice(0,5).split(":")[1]}).toDate();
    console.log(temp)
    this.setState({
      endTime: temp
    });
  }

  closesTimeChange(date) {
    console.log(date.target.value.slice(0,5).split(":"))
    var temp = this.state.closes;
    temp.set({hour:date.target.value.slice(0,5).split(":")[0], minute:date.target.value.slice(0,5).split(":")[1]}).toDate();
    console.log(temp)
    this.setState({
      closes: temp
    });
  }

  validateDate(e) {
    if(e == "start") {
      console.log(this.state.startTime.hours())
    }
  }


  render() {
    return(
      <div>
        <form>
          <FormGroup
            controlId="name"
            validationState={this.getValidationState(this.state.name.length)}
          >
          <input id="time1"/>
          {$("#time1").timePicker()}
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
                <DatePicker
                  selected={this.state.startTime}
                  onChange={this.startDateChange}
                  dateFormat="DD-MM-YY"
                  placeholderText="Click to select a date"
                />
                @
                <input type="text" size="4" onChange={this.startTimeChange}/>
                <HelpBlock>"When should I be there?"</HelpBlock> {this.state.startTime.format("DD/MM/YYYY HH:MM")}
              </FormGroup>
              </div>
              <div className="col-md-4">
                <FormGroup
                  controlId="endTime"
                >
                  <ControlLabel>End Time</ControlLabel><br/>
                  <DatePicker
                    selected={this.state.endTime}
                    onChange={this.endDateChange}
                    dateFormat="DD-MM-YY"
                    placeholderText="Click to select a date"
                  />
                  @
                  <input type="text" size="4" onChange={this.endTimeChange}/>
                  <HelpBlock>"When can I leave?"</HelpBlock> {this.state.endTime.format("DD/MM/YYYY HH:MM")}
                </FormGroup>
              </div>
              <div className="col-md-4">
                 <FormGroup
                  controlId="closes"
                >
                  <ControlLabel>Joining Ends</ControlLabel><br/>
                  <DatePicker
                    selected={this.state.closes}
                    onChange={this.closesDateChange}
                    dateFormat="DD-MM-YY"
                    placeholderText="Click to select a date"
                  />
                  @
                  <input type="text" size="4" onChange={this.closesTimeChange}/>
                  <HelpBlock>"When do I have to decide?"</HelpBlock> {this.state.closes.format("DD/MM/YYYY HH:MM")}
                </FormGroup>
              </div>
            </div>
        </form>
      </div>
    )
  }
}

export default BasicInfo;
