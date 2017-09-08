import React from 'react';
import ReactDOM from 'react-dom';
import { ButtonToolbar, ToggleButtonGroup, ToggleButton, Button } from 'react-bootstrap';
import bootstrap from 'bootstrap';

class UserSelector extends React.Component {

  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.data = new Object;
    this.data.toEVI = false;
    this.data.toInnostaja = false;
    this.props.updateBasic("toInnostaja", this.data.toInnostaja)
    this.props.updateBasic("toEVI", this.data.toEVI)
  }

  handleClick(e) {
    if(e.target.id == "EVI") {
      this.data.toEVI = !this.data.toEVI;
      this.props.updateBasic("toEVI", this.data.toEVI)
      if(!this.data.toEVI) {
        e.target.className = "btn btn-danger"
      }
      else e.target.className = "btn btn-success"
    }
   if(e.target.id == "innostaja") {
      this.data.toInnostaja = !this.data.toInnostaja;
      this.props.updateBasic("toInnostaja", this.data.toInnostaja)
      if(!this.data.toInnostaja) {
        e.target.className = "btn btn-danger"
      }
      else e.target.className = "btn btn-success"
    }
   if(e.target.id == "max") this.props.updateBasic("max", e.target.value)
  }

  render() {
    return(
      <div className="test">
      <div className="col-md-2">
       <Button id="EVI" onClick={this.handleClick} bsStyle="danger"> Leiriläisille </Button>
      </div>
      <div className="col-md-2">
       <Button id="innostaja" onClick={this.handleClick} bsStyle="danger"> Innostajille </Button>
      </div>
      <div className="col-md-4">
       Maximum number of participants (0=not limited): <input id="max" type="number" onChange={this.handleClick}/>
      </div>
      </div>
    )
  }
}

export default UserSelector;
