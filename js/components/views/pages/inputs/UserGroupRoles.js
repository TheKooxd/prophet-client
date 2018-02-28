import React from 'react';
import ReactDOM from 'react-dom';
import { ButtonToolbar, ToggleButtonGroup, ToggleButton, Button } from 'react-bootstrap';
import bootstrap from 'bootstrap';

class UserGroupRoles extends React.Component {

  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.state = {EVI: "default", innostaja: "default", admin: "default"}
    this.data = new Object;
    this.data.toEVI = false;
    this.data.toInnostaja = false;
  }

  handleClick(e) {
   if(e.target.type == "button") {
    this.props.updateBasic("role", e.target.id)
    this.setState({EVI: "default", innostaja: "default", admin: "default"})
    this.setState({[e.target.id]: "primary"})
   }
   if(e.target.id == "GroupId") {
    this.props.updateBasic("groupId", e.target.value)
   } 
  }

  render() {
    return(
      <div className="test">
      <div className="col-md-2">
       <Button id="EVI" onClick={this.handleClick} bsStyle={this.state.EVI}> Leiriläisiä </Button>
      </div>
      <div className="col-md-2">
       <Button id="innostaja" onClick={this.handleClick} bsStyle={this.state.innostaja}> Innostajia </Button>
      </div>
      <div className="col-md-2">
       <Button id="admin" onClick={this.handleClick} bsStyle={this.state.admin}> Ylläpitäjiä </Button>
      </div>
      <div className="col-md-4">
       Group Identifier: <input id="GroupId" type="text" onChange={this.handleClick}/>
      </div>
      </div>
    )
  }
}

export default UserGroupRoles;
