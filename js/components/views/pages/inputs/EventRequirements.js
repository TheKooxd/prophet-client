import React from 'react';
import ReactDOM from 'react-dom';
import { FormGroup, ControlLabel, HelpBlock, FormControl, FormInline } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import AmmountChooser from './panels/AmmountChooser.js'


class EventRequirements extends React.Component {
  constructor(props) {
    super(props)
 }

  render() {
    if(this.props.data == undefined) return <h1> LOADING </h1>
    return(
      <div className="row col-md-12">
        <form className="form">
          <div className="row">
          <AmmountChooser role="innostaja" values={this.props.data.eventRequirements.innostaja} updateFourField={this.props.updateFourField} />
          </div>
          <div className="row">
          <AmmountChooser role="EVI" values={this.props.data.eventRequirements.EVI} updateFourField={this.props.updateFourField} />
          </div>
          <div className="row">
          <AmmountChooser role="admin" values={this.props.data.eventRequirements.admin} updateFourField={this.props.updateFourField} />
          </div>
        </form>
      </div>
    )
  }
}

export default EventRequirements;
