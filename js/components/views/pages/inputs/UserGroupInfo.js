import React from 'react';
import ReactDOM from 'react-dom';
import { FormGroup, ControlLabel, HelpBlock, FormControl } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import moment from 'moment';


class UserGroupInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [100]
    }
    this.getValidationState = this.getValidationState.bind(this)
    this.handleChange = this.handleChange.bind(this)
 }
  
  getValidationState(input) {
    if(input > 0) {
      return "success";
    }
    else return "error"
  }

  handleChange(e) {
    console.log(e.target.name)
    console.log(e.target.value)
    this.setState({[e.target.name]: e.target.value})
  }


  render() {
    console.log(this.state)
    return(
      <div>
        <form>
          <div>
          <FormGroup
            controlId="name"
          >
            <FormControl
              type="text"
              value={this.state[0].name}
              name={0}
              onChange={this.handleChange}
              placeholder="Enter text"
            />
            <FormControl.Feedback />
          </FormGroup>
          </div>
        </form>
      </div>
    )
  }
}

export default UserGroupInfo;
