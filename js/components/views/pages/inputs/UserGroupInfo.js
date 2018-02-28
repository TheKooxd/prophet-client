import React from 'react';
import ReactDOM from 'react-dom';
import { FormGroup, ControlLabel, HelpBlock, FormControl, FormInline } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import moment from 'moment';


class UserGroupInfo extends React.Component {
  constructor(props) {
    super(props)
    var temp = new Array();
    for(var i = 0; i < 6; i++) {
      temp.push("");
    }
    this.state = {
      users: temp
    }
    this.getValidationState = this.getValidationState.bind(this)
    this.handleChange = this.handleChange.bind(this)
 }
  
  getValidationState(e) {
    if(e == "") return null;
    else {
      if(e.includes(" ") && e.length > 5) {
      return "success";
      }
      else return "error"
      }
  }

  handleChange(e) {
    var save = this.state.users;
    var emptyCount = 0;
    save.forEach(function(val){
      if(val == "") emptyCount++;
    })
    if(emptyCount < 4) {
      for(var i = 0; i < 3; i++) {
      save.push("");
    }
    }
    save[e.target.name] = e.target.value
    this.setState({users: save})
    this.props.updateBasic("names", save)
  }

  render() {
    return(
      <div>
        <form className="form-horizontal">
          <div>
            {this.state.users.map(function(name, index){
              return (
                <div className="col-md-4">
                  <FormGroup
                    controlId="name"
                    validationState={this.getValidationState(name)}
                  >
                  <FormControl
                    type="text"
                    value={this.state.users[index]}
                    name={index}
                    onChange={this.handleChange}
                    placeholder="User's real name"
                  />
                  <FormControl.Feedback />
                  </FormGroup>
                  <br/>
                </div>
                )
            }.bind(this))}
          </div>
        </form>
      </div>
    )
  }
}

export default UserGroupInfo;
