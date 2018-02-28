import React from 'react';
import ReactDOM from 'react-dom';
import { Table, Button, Label } from 'react-bootstrap';
import Collapsible from 'react-collapsible';
import _ from 'lodash';

import EventTable from '../util/tables/EventTable.js'
import LogInHandler from '../LogInHandler.js';
import Loading from '../util/Loading.js';
import AlertPanel from '../alerts/Alert.js';

import config from '../../../config.json'

class Events extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = { name: undefined, loggedOut: false, ready: false, open: false }
    this.renderInfo = this.renderInfo.bind(this)
    this.getEvents = this.getEvents.bind(this)
    this.sortBy = this.sortBy.bind(this)
 }

  renderInfo(info) {
    if(info !== undefined && info.usr !== undefined) {
      this.setState({
        name: info.usr.name,
        role: info.usr.role,
        loggedOut: true
      })
    }
    this.getEvents();
  }

getEvents() {
  var joinable = true
  if(this.state.role == "admin") joinable = false
  fetch(config.api + '/getEvents?onlyJoinable=' + joinable, {
  credentials: 'same-origin'
  })
  .then((result) => result.json())
  .then((result) => {
      this.setState({
        ready: true,
        data: _.sortBy(result, [function(o) { return new Date(o.startTime); }])
      })
  });
}

  componentDidMount() {
    this.renderInfo();
    
  }

  componentWillReceiveProps(nextProps){
    this.renderInfo(nextProps.loggedIn);
  }
  
  sortBy(term) {
    if(term.includes("Time") || term == "closes") {
      if(JSON.stringify(_.sortBy(this.state.data, [function(o) { return new Date(o[term]); }])) == JSON.stringify(this.state.data)) {
        this.setState({data: _.reverse(this.state.data)})
      }
      else this.setState({data: _.sortBy(this.state.data, [function(o) { return new Date(o[term]); }])})
    }
    else {
      if(JSON.stringify(_.sortBy(this.state.data, [function(o) { return o[term]; }])) == JSON.stringify(this.state.data)) {
        this.setState({data: _.reverse(this.state.data)})
      }
      else this.setState({data: _.sortBy(this.state.data, [function(o) { return o[term]; }])})
    }
  }

  render() {
    if(this.state.ready == false) return <Loading />
    return(
      <div>
        <LogInHandler renderInfo={this.renderInfo} name={this.state.name} />
        <div className="row">
        {this.state.role == "admin" &&
          <div className="col-md-2">
            <Button href="/#/newEvent" bsStyle="success">New</Button>
            <br/>
          </div>
        }
        </div>
        <div className="row">
         <div className="col-md-12">
         {this.props.location.query.created == "true" &&
            <AlertPanel type="success" text="Event created succesfully!" glyph="ok-sign" />
            }
          {this.state.data.length == 0 ? (
                <AlertPanel type="info" text="There is no open events." glyph="info-sign" />
              ) : (
          <Table condensed hover>
            <thead>
              <tr>
                <th onClick={() => { this.sortBy("name") }}>Name</th>
                <th onClick={() => { this.sortBy("startTime") }}>Time</th>
                <th onClick={() => { this.sortBy("location") }}>Place</th>
                <th onClick={() => { this.sortBy("closes") }}>Expires</th>
                <th onClick={() => { this.sortBy("slots") }}>Slots</th>
              </tr>
            </thead>
            <tbody>
            {this.state.data.map(function(data, index){
              return(
                <EventTable index={index} data={data} />
              );
            }.bind(this))}
           </tbody>
          </Table>
          )}
        </div>
        </div>
      </div>
    )
  }
}

export default Events;
