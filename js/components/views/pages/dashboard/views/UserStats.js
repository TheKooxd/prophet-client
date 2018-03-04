import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import { Table } from 'react-bootstrap';
import Collapsible from 'react-collapsible';
import { transitionTo } from "react-router";
import History from 'react-history/BrowserHistory';
import { Push } from 'react-history/Actions';
import moment from 'moment';
import {LineChart} from 'react-chartjs'

import config from '../../../../../../config.json';

class UserStats extends React.Component {

  constructor(props) {
    super(props)
    this.state = {verifyReady: false, attendReady: false, attendingEvents: new Array(), verifiedEvents: new Array(), reservedReady: false, reservedEvents: new Array(), remainingReady: false, remainingEvents: new Array()}
    this.getAttendingEvents = this.getAttendingEvents.bind(this)
    this.getVerifiedEvents = this.getVerifiedEvents.bind(this)
    this.getRemainingEvents = this.getRemainingEvents.bind(this)
  }

 getAttendingEvents() {
  this.data = new Array;
  this.data = [];
  JSON.parse(this.props.data.events).forEach(function(event, index){
    fetch(config.api + '/getEvent?id=' + event, {
      credentials: 'same-origin'
      })
      .then((result) => result.json())
      .then((result) => {
        this.data[index] = result
        if(this.data.length == JSON.parse(this.props.data.events).length) {
         this.setState({attendReady: true, attendingEvents: this.data})
         }
      });
   }.bind(this))
 }

  getVerifiedEvents() {
  this.verifiedData = new Array;
  this.verifiedData = [];
  JSON.parse(this.props.data.verifiedEvents).forEach(function(event, index){
    fetch(config.api + '/getEvent?id=' + event.event, {
      credentials: 'same-origin'
      })
      .then((result) => result.json())
      .then((result) => {
        result[0].verifier = event.verifier
        this.verifiedData[index] = result
        if(this.verifiedData.length == JSON.parse(this.props.data.verifiedEvents).length) {
         this.setState({verifyReady: true, verifiedEvents: this.verifiedData})
         }
      });
   }.bind(this))
 }

 getReservedEvents() {
  this.reservedData = new Array;
  this.reservedData = [];
  JSON.parse(this.props.data.reservedEvents).forEach(function(event, index){
    fetch(config.api + '/getEvent?id=' + event, {
      credentials: 'same-origin'
      })
      .then((result) => result.json())
      .then((result) => {
        this.reservedData[index] = result
        if(this.reservedData.length == JSON.parse(this.props.data.reservedEvents).length) {
         this.setState({reservedReady: true, reservedEvents: this.reservedData})
         this.getRemainingEvents();
         }
      });
   }.bind(this))
 }

 getRemainingEvents() {
  var remainingCache = this.props.data.eventRequirements;
  if(JSON.parse(this.props.data.verifiedEvents).length !== 0) {
    JSON.parse(this.props.data.verifiedEvents).forEach(function(event, index){
      fetch(config.api + '/getEvent?id=' + event.event, {
      credentials: 'same-origin'
      })
      .then((result2) => result2.json())
      .then((result2) => {
        if(remainingCache[result2[0].type] > 0) {
          remainingCache[result2[0].type]--;
        }
        if(index + 1 == JSON.parse(this.props.data.verifiedEvents).length) {
          this.setState({ remainingEvents: remainingCache, remainingReady: true })
        }
      })
    }.bind(this))
  }
  else this.setState({remainingEvents: this.props.eventRequirements, remainingReady: true})
 }

 componentDidMount() {
   this.getAttendingEvents();
   this.getVerifiedEvents();
   this.getReservedEvents();
 }

 componentWillReceiveProps(nextProps){
   this.getAttendingEvents(nextProps.loggedIn);
   this.getVerifiedEvents(nextProps.loggedIn);
   this.getReservedEvents(nextProps.loggedIn);
 }

  render() {

    return(
      <div>
      {this.state.reservedReady && this.state.verifyReady && this.state.attendReady && this.state.remainingReady ? (
          <div>Name: {this.props.data.name}</div>
        ) : (
      <div>wait</div>
      )}
      </div>
    )
  }
}

export default UserStats;
