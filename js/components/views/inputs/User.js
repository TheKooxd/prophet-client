import React from 'react';
import ReactDOM from 'react-dom';
import { PageHeader, Label, Button, Modal } from 'react-bootstrap';
import Collapsible from 'react-collapsible';

import EventTable from '../util/tables/EventTable.js'
import LogInHandler from '../LogInHandler.js';
import AlertPanel from '../alerts/Alert.js';
import AdminEvent from './AdminEvent.js';
import moment from 'moment';

import config from '../../../config.json';

class Event extends React.Component {
  constructor(props) {
    super(props)
    this.state = {ready: false, error: false, joinTriggered: false, joinMessage: "NA", admin: false}
    this.getEvent = this.getEvent.bind(this)
    this.joinEvent = this.joinEvent.bind(this)
    this.closeModal = this.closeModal.bind(this)
 }

  getEvent() {
    fetch(config.api + '/getUser?id=' + this.props.params.id, {
    credentials: 'same-origin'
    })
    .then((result) => result.json())
    .then((result) => {
        if(result[0]._id == this.props.params.id) {
          this.data = result[0];
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

  closeModal() {
    this.setState({joinTriggered: false})
  }

  render() {
    if(this.state.ready == false) return(<h1>Loading</h1>)
    return(
      <div>
        {this.state.error == true ? (
          <AlertPanel type="danger" text="This user doesn't exist, please check the ID!" />
        ) : (
          <div>
            <PageHeader>{this.data.name}</PageHeader>
            <div className="row">
              <div className="col-md-6">
                <div className="text-center col-md-4">
                </div>
                <div className="text-center col-md-4">
                </div>
              </div>
              <div className="col-md-6">
              </div>
            </div>
            <div className="row">
            </div>
          </div>
        )
        } 
      </div>
    )
  }
}

export default Event;
