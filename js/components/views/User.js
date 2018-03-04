import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import { PageHeader, Label, Button, Modal, HelpBlock, SplitButton, MenuItem, FormControl, FormGroup } from 'react-bootstrap';
import Collapsible from 'react-collapsible';
import _ from 'lodash';

import EventTable from '../util/tables/EventTable.js'
import UserEvents from './UserEvents.js';
import UserVerified from './UserVerified.js';
import LogInHandler from '../LogInHandler.js';
import AlertPanel from '../alerts/Alert.js';
import moment from 'moment';
import UserBadge from '../layout/header/UserBadge.js'
import Loading from '../util/Loading.js';
import ForceAddModal from '../modals/user/ForceAddModal.js'

import { transitionTo } from "react-router";
import History from 'react-history/BrowserHistory';
import { Push } from 'react-history/Actions';

import config from '../../../config.json';

class Event extends React.Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context)
    this.state = {ready: false, error: false, delete: false, freeze: false, admin: false, nameCheck: false, forceadd: false, remaining: 0, data: new Object()}
    this.getUser = this.getUser.bind(this)
    this.deleteUser = this.deleteUser.bind(this)
    this.freezeUser = this.freezeUser.bind(this)
    this.nameCheckUpdate = this.nameCheckUpdate.bind(this)
    this.deleteUserSend = this.deleteUserSend.bind(this)
    this.forceaddupdate = this.forceaddupdate.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.sum = this.sum.bind(this)
 }

  getUser() {
  console.log(this.props.params.id)
  this.data = new Object();
  this.data = {}
  this.setState({ready: false, error: false, delete: false, freeze: false, admin: false, nameCheck: false, forceadd: false, remaining: 0, data: new Object()})
  fetch(config.api + '/getUser?id=' + this.props.params.id, {
    credentials: 'same-origin'
    })
    .then((result) => result.json())
    .then((result) => {
        console.log(result._id)
        console.log(this.props.params.id)
        if(result._id == this.props.params.id) {
          this.data = result;
          var remainingCache = result.eventRequirements;
          if(JSON.parse(result.verifiedEvents).length !== 0) {
            JSON.parse(result.verifiedEvents).forEach(function(event, index){
              fetch(config.api + '/getEvent?id=' + event.event, {
              credentials: 'same-origin'
              })
              .then((result2) => result2.json())
              .then((result2) => {
                if(remainingCache[result2[0].type] > 0) {
                  remainingCache[result2[0].type]--;
                }
                if(index + 1 == JSON.parse(result.verifiedEvents).length) {
                  this.setState({ remaining: remainingCache, data: this.data, ready: true })
                }
              })
            }.bind(this))
          }
          else {
            this.setState({remaining: result.eventRequirements, data: this.data, ready: true})
          }
        }
        else {
          console.log("eka")
          this.setState({error: false, ready: false})
        }
    })
    .catch(function() {
      console.log("toka")
      this.setState({error: true, ready: true})
    }.bind(this));
}


  componentDidMount() {
    this.getUser();
  }

  componentWillReceiveProps(nextProps){
    this.getUser(nextProps);
  }

  deleteUser(){
    this.setState({delete: true})
  }

  deleteUserSend() {
  if(this.state.nameCheck) {
    fetch(config.api + '/deleteUser', {
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'delete',
    body: JSON.stringify({id: this.state.data._id})
    })
    .then((result) => result.text())
    .then((result) => {
      this.setState({delete:false})
      this.context.router.push('/users?delete=true')
    })
  }
  }

  sum( obj ) {
  var sum = 0;
  for( var el in obj ) {
    if( obj.hasOwnProperty( el ) ) {
      sum += parseFloat( obj[el] );
    }
  }
  return sum;
  }

  nameCheckUpdate(e){
    if(e.target.value == this.state.data.name) {
      this.setState({nameCheck: true})
    }
  }

  freezeUser(){
    console.log("freeze")  
  }

  forceaddupdate() {
    this.setState({forceadd: true})
  }

  closeModal(e) {
    if(e == "forceadd") {
      this.setState({ forceadd: false, ready: true })
    }
    this.getUser();
  }

  render() {
    console.log(this.state)
    if(this.state.ready == false) return <Loading />
    return(
      <div>
        {this.state.error == true ? (
          <AlertPanel type="danger" text="This user doesn't exist, please check the ID!" glyph="exclamation-sign" />
        ) : (
           <div>
            <Modal show={this.state.delete} bsSize="large" aria-labelledby="contained-modal-title-lg">
             <Modal.Header>
               <Modal.Title>Delete User?</Modal.Title>
             </Modal.Header>
             <Modal.Body>
              <AlertPanel type="danger" text="Deleting user" glyph="exclamation-sign" />
              User deletion cannot be undone. Users participations in events will remain, so they will need to be manually removed.
              <br />
              If you really want to carry on, type users name in the box below and hit DELETE:
              <br />
               <FormGroup
                  validationState="error"
                >
                 <FormControl
                    type="text"
                    onChange={this.nameCheckUpdate}
                    placeholder="User's name"
                  />
                </FormGroup>
                <Button onClick={this.deleteUserSend} bsStyle="danger"> DELETE </Button>
             </Modal.Body>
             <Modal.Footer>
             </Modal.Footer>
           </Modal>
           <ForceAddModal open={this.state.forceadd} data={this.state.data} closeModal={this.closeModal} />
            <div className="col-md-12">
             <PageHeader>
               {this.state.data.name + " "} 
                <small>
                  <UserBadge name={this.state.data.name} onlyBadge={true} role={this.state.data.role} />
                </small>
            </PageHeader>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="text-center col-md-3">
                <h1 className="text-center">{JSON.parse(this.state.data.events).length}</h1>
                  <h3 className="text-center">Events joined</h3>
                </div>
                <div className="text-center col-md-3">
                 <h1 className="text-center">{JSON.parse(this.state.data.verifiedEvents).length}</h1>
                  <h3 className="text-center">Events done</h3>
                </div>
                <div className="text-center col-md-3">
                 <h1 className="text-center">{this.sum(this.state.remaining)}</h1>
                  <h3 className="text-center">Events remaining</h3>
                </div>
              </div>
              <div className="col-md-6">
                <div className="col-md-6">
                   <SplitButton onClick={this.freezeUser} bsStyle="danger" title="Freeze Account">
                    <MenuItem eventKey="1" onClick={this.deleteUser}>Delete User</MenuItem>
                  </SplitButton>
                  <HelpBlock> Freeze or remove user </HelpBlock>
                </div>
                <div className="col-md-6">
                  <Button bsStyle="warning"> Promote User </Button>
                  <HelpBlock> Changes user role </HelpBlock>
                </div>
                <div className="col-md-6">
                  <Button bsStyle="success" onClick={this.forceaddupdate}> Add to an event </Button>
                  <HelpBlock> Force add user to an event </HelpBlock>
                </div>
              </div>
            </div>
            <div className="row">
            {JSON.parse(this.state.data.events).length == 0 ? (
                <AlertPanel type="info" text="User hasn't join any events." glyph="info-sign" />
              ) : (
              <UserEvents title="Events joined:" events={JSON.parse(this.state.data.events)} />
            )}
            </div>
            <div className="row">
            {JSON.parse(this.state.data.reservedEvents).length == 0 ? (
                <AlertPanel type="info" text="User doesn't have any events inline." glyph="info-sign" />
              ) : (
              <UserEvents title="Inline events:" events={JSON.parse(this.state.data.reservedEvents)} />
            )}
            </div>
             <div className="row">
             {JSON.parse(this.state.data.verifiedEvents).length == 0 ? (
                <AlertPanel type="info" text="User doesn't have any verified events." glyph="info-sign" />
              ) : (
              <UserVerified verifiedEvents={JSON.parse(this.state.data.verifiedEvents)} />
              )}
            </div>
          </div>
        )
        } 
      </div>
    )
  }
}

export default Event;
