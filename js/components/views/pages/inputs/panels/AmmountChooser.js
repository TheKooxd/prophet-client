import React from 'react';
import ReactDOM from 'react-dom';
import { FormGroup, ControlLabel, HelpBlock, FormControl, FormInline } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import moment from 'moment';


class AmmountChooser extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.props.values
    this.handleChange = this.handleChange.bind(this);
 }

 handleChange(e) {
  console.log(this.state)
  this.setState({[e.target.name]: e.target.value})
  this.props.updateFourField("eventRequirements", this.props.role, e.target.name, e.target.value)
 }

  render() {
    return(
        <div>
            <h3> Event requirements for {this.props.role} </h3>
              <FormGroup
                controlId="name"
                validationState={null}
              >
              <div className="col-md-3">
                <div>
                  <ControlLabel>Jumalanpalvelukset</ControlLabel>
                    <FormControl
                      type="number"
                      value={this.state.jumis}
                      name={"jumis"}
                      onChange={this.handleChange}
                      placeholder="Number to attend"
                    />
                  <FormControl.Feedback />
                </div>
              </div>
              <div className="col-md-3">
                <div>
                  <ControlLabel>Innostajat</ControlLabel>
                    <FormControl
                      type="number"
                      value={this.state.innostajat}
                      name={"innostajat"}
                      onChange={this.handleChange}
                      placeholder="Number to attend"
                    />
                  <FormControl.Feedback />
                </div>
              </div>
              <div className="col-md-3">
                <div>
                  <ControlLabel>Nuortenillat</ControlLabel>
                    <FormControl
                      type="number"
                      value={this.state.nuortenilta}
                      name={"nuortenilta"}
                      onChange={this.handleChange}
                      placeholder="Number to attend"
                    />
                  <FormControl.Feedback />
                </div>
              </div>
              <div className="col-md-3">
                <div>
                  <ControlLabel>Festarit</ControlLabel>
                    <FormControl
                      type="number"
                      value={this.state.festarit}
                      name={"festarit"}
                      onChange={this.handleChange}
                      placeholder="Number to attend"
                    />
                  <FormControl.Feedback />
                </div>
              </div>
              <div className="col-md-3">
                <div>
                  <ControlLabel>Talkoot</ControlLabel>
                    <FormControl
                      type="number"
                      value={this.state.talkoot}
                      name={"talkoot"}
                      onChange={this.handleChange}
                      placeholder="Number to attend"
                    />
                  <FormControl.Feedback />
                </div>
              </div>
              <div className="col-md-3">
                <div>
                  <ControlLabel>Muu</ControlLabel>
                    <FormControl
                      type="number"
                      value={this.state.other}
                      name={"other"}
                      onChange={this.handleChange}
                      placeholder="Number to attend"
                    />
                  <FormControl.Feedback />
                </div>
              </div>
              </FormGroup>
              <br/>
          </div>
     )
  }
}
export default AmmountChooser;