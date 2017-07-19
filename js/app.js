import React, { Component } from 'react';
import { render } from 'react-dom';
import { Router, Route, HashRouter, hashHistory } from 'react-router';
import fetch from 'node-fetch';

import Header from './components/layout/header/Header.js';
import Layout from './components/Layout.js';
import UserStatus from './components/widgets/user/UserStatus.js';
import LogInModal from './components/modals/LogInModal.js';
import LogInHandler from './components/LogInHandler.js';
import Events from './components/views/Events.js';
import Event from './components/views/Event.js';
import newEvent from './components/views/newEvent.js';

import config from '../config.json'

class App extends Component {

  static childContextTypes = {
    prop: React.PropTypes.bool
  };

  constructor(props) {
    super(props)
    this.state = { name: undefined, loggedOut: false }
    this.renderInfo = this.renderInfo.bind(this)
    this.logout = this.logout.bind(this)
 }

  logout() {
    fetch(config.api + '/logout', {
    credentials: 'same-origin'
    })
    .then(function(response){
      this.setState({
        name: undefined,
        role: undefined
      })
    }.bind(this))
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

  componentDidMount() {
    this.renderInfo();
  }

  componentWillReceiveProps(nextProps){
    this.renderInfo(nextProps.loggedIn);
  }

  getChildContext() {
    return {prop: true};
  }

  render(){
    if(this.state.name == undefined) return <LogInHandler renderInfo={this.renderInfo} name={this.state.name} loggedOut={this.state.loggedOut} />
    return (
    <div className="container">
      <Header name={this.state.name} role={this.state.role} logout={this.logout} location={this.props.location.pathname} />
      {this.props.children}
    </div>
    );
  }
}


render(
  <Router history={hashHistory}>
    <Route component={App}>
     <Route path="/" component={UserStatus}/>
     <Route path="/events" component={Events}/>
     <Route path="/event/:id" component={Event}/>
     <Route path="/newEvent" component={newEvent}/>
    </Route>
  </Router>,
  document.getElementById('react')
);
