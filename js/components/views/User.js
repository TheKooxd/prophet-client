import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import { PageHeader, Label, Button, Modal, HelpBlock, SplitButton, MenuItem, FormControl, FormGroup } from 'react-bootstrap';
import Collapsible from 'react-collapsible';

import EventTable from '../util/tables/EventTable.js'
import UserEvents from './UserEvents.js';
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
    this.state = {ready: false, error: false, delete: false, freeze: false, admin: false, nameCheck: false, forceadd: false}
    this.getEvent = this.getEvent.bind(this)
    this.deleteUser = this.deleteUser.bind(this)
    this.freezeUser = this.freezeUser.bind(this)
    this.nameCheckUpdate = this.nameCheckUpdate.bind(this)
    this.deleteUserSend = this.deleteUserSend.bind(this)
    this.forceaddupdate = this.forceaddupdate.bind(this)
    this.closeModal = this.closeModal.bind(this)
 }

  getEvent() {
    fetch(config.api + '/getUser?id=' + this.props.params.id, {
    credentials: 'same-origin'
    })
    .then((result) => result.json())
    .then((result) => {
        if(result._id == this.props.params.id) {
          this.data = result;
          this.setState({
            ready: true
          })
        }
        else {
          this.setState({error: true, ready: true})
        }
    })
    .catch(function() {
      this.setState({error: true, ready: true})
    }.bind(this));
}


  componentDidMount() {
    this.getEvent();
  }

  componentWillReceiveProps(nextProps){
    this.getEvent(nextProps);
  }

  deleteUser(){
    console.log("delete")
    this.setState({delete: true})
  }

  deleteUserSend() {
  if(this.state.nameCheck) {
    fetch(config.api + '/deleteUser?id=' + this.data._id, {
    credentials: 'same-origin'
    })
    .then((result) => result.text())
    .then((result) => {
      this.setState({delete:false})
      this.context.router.push('/users?delete=true')
    })
  }
  }

  nameCheckUpdate(e){
    if(e.target.value == this.data.name) {
      this.setState({nameCheck: true})
    }
    console.log(this.state.nameCheck)
  }

  freezeUser(){
    console.log("freeze")  
  }

  forceaddupdate() {
    this.setState({forceadd: true})
  }

  closeModal(e) {
    if(e == "forceadd") {
      this.setState({ forceadd: false })
    }
  }

  render() {
    if(this.state.ready == false) return <Loading />
    return(
      <div>
        {this.state.error == true ? (
          <AlertPanel type="danger" text="This user doesn't exist, please check the ID!" />
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
           <ForceAddModal open={this.state.forceadd} data={this.data} closeModal={this.closeModal} />
            <div className="col-md-12">
             <PageHeader>
               {this.data.name + " "} 
                <small>
                  <UserBadge name={this.data.name} onlyBadge={true} role={this.data.role} />
                </small>
            </PageHeader>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="text-center col-md-3">
                <h1 className="text-center">{JSON.parse(this.data.events).length}</h1>
                  <h3 className="text-center">Events joined</h3>
                </div>
                <div className="text-center col-md-3">
                 <h1 className="text-center">0</h1>
                  <h3 className="text-center">Events done</h3>
                </div>
                <div className="text-center col-md-3">
                 <h1 className="text-center">0</h1>
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
              <UserEvents events={JSON.parse(this.data.events)} />
            </div>
          </div>
        )
        } 
      </div>
    )
  }
}

export default Event;
