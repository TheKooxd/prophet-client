import React from 'react';
import ReactDOM from 'react-dom';
import { Table, Button, Tabs, Tab, Glyph } from 'react-bootstrap';
import Collapsible from 'react-collapsible';

import EventTable from '../../util/tables/EventTable.js'
import LogInHandler from '../../LogInHandler.js';
import Loading from '../../util/Loading.js';
import AlertPanel from '../../alerts/Alert.js'

import moment from 'moment';
import _ from 'lodash';

import config from '../../../../config.json'

class MyEvents extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.upcoming = new Array;
    this.unverified = new Array;
    this.state = { name: undefined, loggedOut: false, ready: false, open: false }
    this.renderInfo = this.renderInfo.bind(this)
    this.getEvents = this.getEvents.bind(this)
 }

  renderInfo(info) {
    if(info !== undefined && info.usr !== undefined) {
      this.setState({
        name: info.usr.name,
        role: info.usr.role,
        loggedOut: true
      })
    }
  }

getEvents() {
  fetch(config.api + '/info', {
  credentials: 'same-origin'
  })
  .then((userInfo) => userInfo.json())
  .then((userInfo) => {
    fetch(config.api + '/searchEvents?specific=' + userInfo.usr.events, {
    credentials: 'same-origin'
    })
    .then((result) => result.json())
    .then((result) => {
        this.data = result;
        this.setState({
          ready: true
        })
    })
    .catch(function(e) {
      console.log(e)
    }.bind(this));
  });
}
  componentDidMount() {
    this.renderInfo();
    this.getEvents();
  }

  componentWillReceiveProps(nextProps){
    this.renderInfo(nextProps.loggedIn);
    this.getEvents();
  }

  render() {
    if(this.state.ready) {
      var temp = new Array
      var temp2 = new Array
      this.data.forEach(function(val, index){
        if(moment(val.startTime) > moment()) temp[index] = val
        if(moment(val.startTime) < moment()) temp2[index] = val
      })
      this.upcoming = temp
      this.unverified = temp2
    }
    if(this.state.ready == false) return <Loading />
    return(
      <div>
        <LogInHandler renderInfo={this.renderInfo} name={this.state.name} />
        <div className="row">
        </div>
        <div className="row">
         <div className="col-md-12">
           <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
              <Tab eventKey={1} title="Upcoming events">
              {this.upcoming.length == 0 ? (
                <AlertPanel glyph="ok-sign" type="success" text="No upcoming events!." />
              ) : (
                 <Table condensed hover>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Time</th>
                        <th>Place</th>
                        <th>Expires</th>
                        <th>Slots</th>
                      </tr>
                    </thead>
                    <tbody>
                    {this.upcoming.map(function(data, index){
                      return(
                        <EventTable index={index} data={data} />
                      );
                    }.bind(this))}
                   </tbody>
                  </Table>
                )}
              </Tab>
              <Tab eventKey={2} title="Unverified events">
              {this.unverified.length == 0 ? (
                <AlertPanel glyph="ok-sign" type="success" text="All events verified!" />
              ) : (
              <Table condensed hover>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Time</th>
                    <th>Place</th>
                    <th>Expires</th>
                    <th>Slots</th>
                  </tr>
                </thead>
                <tbody>
                {this.unverified.map(function(data, index){
                  return(
                    <EventTable index={index} data={data} />
                  );
                }.bind(this))}
               </tbody>
              </Table>
              )}
              </Tab>
              <Tab eventKey={4} title="All events">
              {this.data.length == 0 ? (
                <AlertPanel glyph="info-sign" type="warning" text="No events joined." />
              ) : (
                <Table condensed hover>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Time</th>
                      <th>Place</th>
                      <th>Expires</th>
                      <th>Slots</th>
                    </tr>
                  </thead>
                  <tbody>
                  {this.data.map(function(data, index){
                    return(
                      <EventTable index={index} data={data} />
                    );
                  }.bind(this))}
                 </tbody>
                </Table>
              )}
              </Tab>
            </Tabs>
        </div>
        </div>
      </div>
    )
  }
}

export default MyEvents;
