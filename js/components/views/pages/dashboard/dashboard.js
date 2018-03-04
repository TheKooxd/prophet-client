import React from 'react';
import ReactDOM from 'react-dom';
import bootstrap from 'bootstrap';
import { Panel, FormGroup, ControlLabel, FormControl, HelpBlock, Button, Glyphicon } from 'react-bootstrap';
import ReactDatalist from 'react-datalist';

import AlertPanel from '../../../alerts/Alert.js'
import Loading from '../../../util/Loading.js'

import UserStats from './views/UserStats.js'

import config from '../../../../../config.json'

class UserStatus extends React.Component {
  constructor(props) {
    super(props)
    this.state = {joined: 0, events: 0, left: 0, loadStatus: null, suggestions: [], value: "", loading: false, result: null}
    this.getUsr = this.getUsr.bind(this);
    this.handleChange = this.handleChange.bind(this)
 }

 getUsr() {
   this.setState( {response: false} )
   fetch(config.api + '/info', {
   credentials: 'same-origin'
   })
   .then((result) => result.json())
   .then((result) => {
      this.setState({
        role: result.usr.role
      })
   });
 }

 handleChange(e) {
  this.setState( {loadStatus: "warning", term: e.target.value, result: null} )
   fetch(config.api + '/dbSearch?term=' + e.target.value, {
   credentials: 'same-origin'
   })
   .then((result) => result.json())
   .then((result) => { 
      console.log(result)
      if(result.length == 0) this.setState({loadStatus: "error"})
      if(result.length == 1 && result[0] !== undefined) {
        this.setState({loadStatus: "success"})
        if(result[0].role !== undefined) {
          this.setState({ result: "user", data: result[0] })
        }
        if(result[0].info !== undefined) {
          this.setState({ result: "event", data: result[0] })
        }
      }
      result.forEach(function(val){
        if(typeof(val) == "string" && this.state.term == val) {
          this.setState({ result: "group", data: result })
        }
      }.bind(this))
       if(result.length !== 0) {
        var suggestionsCache = result.map(function(val, index) {return val.name})
        suggestionsCache.forEach(function(val, index){
          if(val == undefined) {
            suggestionsCache.push(result[result.length - 1])
          }
          if(index + 1 == suggestionsCache.length) {
            this.setState({
              loadStatus: "success",
              suggestions: suggestionsCache
            })
          }
        }.bind(this))
      }
   });
 }

 componentDidMount() {
   this.getUsr();
 }

 componentWillReceiveProps(nextProps){
   this.getUsr(nextProps.loggedIn);
 }

 render() {
   return (
    <div className="row col-md-12">
    {this.state.role !== "admin" ? (
          <AlertPanel type="danger" text="You need to be an admin to see this!" glyph="exclamation-sign" />
        ) : (
    <div className="col-md-12">
    <form>
       <FormGroup
          controlId="GroupName"
          validationState={this.state.loadStatus}
        >
          <ControlLabel>Enter search term</ControlLabel>
         <FormControl type="text" list="suggestions" placeholder="Search" value={this.state.term} onChange={this.handleChange} />
          <ReactDatalist list="suggestions" options={this.state.suggestions} className="hidden" />
          <FormControl.Feedback />
        <HelpBlock>Term will be searched from the database and relevant data will be shown</HelpBlock>
        <Button bsStyle="success"> <Glyphicon glyph="search"/> Force Search </Button>
      </FormGroup>
    </form>
    {this.state.suggestions.length == 0 &&
      <AlertPanel glyph="info-sign" type="info" text="Start by typing a search term." />
    }
    {this.state.loadStatus == "warning" &&
      <Loading />
    }
    {this.state.loadStatus == "error" &&
      <AlertPanel glyph="exclamation-sign" type="danger" text="This search term doesn't match anything in the database." />
    }
    {this.state.result == "user" &&
      <div></div>
    }
    {this.state.result == "event" &&
      <AlertPanel glyph="exclamation-sign" type="info" text="event" />
    }
    </div>
    )}
    </div>
  )
}
}

export default UserStatus;
