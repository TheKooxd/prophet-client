import React from 'react';
import ReactDOM from 'react-dom';
import bootstrap from 'bootstrap';
import { Panel } from 'react-bootstrap';
import fetch from 'node-fetch';
import Loading from 'react-loading';
import './UserStatus.less';

import config from '../../../../config.json'

class UserStatus extends React.Component {
  constructor(props) {
    super(props)
    this.state = {joined: 0, events: 0, left: 0}
    this.getUsr = this.getUsr.bind(this);
    this.getEvents = this.getEvents.bind(this);
 }

 getUsr() {
   this.setState( {response: false} )
   fetch(config.api + '/info', {
   credentials: 'same-origin'
   })
   .then((result) => result.json())
   .then((result) => {
      this.setState({
        joined: JSON.parse(result.usr.events).length
      })
   });
 }

 getEvents() {
   this.setState( {response: false} )
   fetch(config.api + '/getEvents?onlyJoinable=true', {
   credentials: 'same-origin'
   })
   .then((result) => result.json())
   .then((result) => {
      this.setState({
        events: result.length
      })
   });
 }

 componentDidMount() {
   this.getUsr();
   this.getEvents();
 }

 componentWillReceiveProps(nextProps){
   this.getUsr(nextProps.loggedIn);
   this.getEvents(nextProps.loggedIn);
 }

 render() {
   return(
    <Panel header="UserStatus">
      <div className="row">
        <div className="col-lg-4">
          <h2 className="text-center">{this.state.joined}</h2>
          <h3 className="text-center">Ilmoittautumisia</h3>
        </div>
        <div className="col-lg-4">
          <h2 className="text-center">{this.state.events}</h2>
          <h3 className="text-center">Avoimia tapahtumia</h3>
        </div>
        <div className="col-lg-4">
          <h2 className="text-center">{this.state.left}</h2>
          <h3 className="text-center">Suorittamattomia tapahtumia</h3>
        </div>
      </div>
    </Panel>
  )
}
}

export default UserStatus;
