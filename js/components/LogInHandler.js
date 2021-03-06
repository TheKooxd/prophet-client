import React, { Component } from 'react';
import { render } from 'react-dom';
import { Router, Route, HashRouter, hashHistory } from 'react-router';
import LogInModal from './modals/LogInModal.js';
import fetch from 'node-fetch';

import config from '../../config.json'

class LogInHandler extends Component {
constructor(props) {
  super(props)
  this.state = { login:false, response: false }
  this.getUser = this.getUser.bind(this)
  this.loggedIn = this.loggedIn.bind(this)
}
    getUser(res) {
      this.props.renderInfo(res)
    }

    loggedIn() {
      this.setState( {response: false} )
      fetch(config.api + '/info', {
      credentials: 'same-origin'
      })
      .then((result) => result.json())
      .then((result) => {
          if (!result.loggedIn) {
            this.setState({ login: true, response: true })
          } else {
              if(this.props.name !== undefined) this.setState({ login: false , response: true})
              else {
                this.props.renderInfo(result);
              }
            }

      })
      .catch(function(err){
        console.log(err)
      });
    }

    componentDidMount() {
      this.loggedIn();
    }

    componentWillReceiveProps(nextProps){
      this.loggedIn(nextProps.loggedIn);
    }

    render(){
      if ( !this.state.response ) {
         return <div></div>
      }
      else {
        return (
          <LogInModal modalIsOpen={this.state.login} err={true} getUser={this.getUser} loggedOut={this.props.loggedOut} />
        );
    }
  }
}

export default LogInHandler;
