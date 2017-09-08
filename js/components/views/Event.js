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
    fetch(config.api + '/getEvent?id=' + this.props.params.id, {
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

  joinEvent() {
   fetch(config.api + '/info', {
      credentials: 'same-origin'
      })
   .then((result) => result.json())
   .then((result) => {
      fetch(config.api + '/joinEvent?id=' + this.props.params.id + '&usrId=' + result.usr._id, {
        credentials: 'same-origin'
        })
        .then((result2) => result2.text())
        .then((result2) => {
        this.setState({joinMessage: result2, joinTriggered: true})
        this.getEvent();
        })
      })
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
      <Modal show={this.state.joinTriggered} bsSize="large" aria-labelledby="contained-modal-title-lg">
         <Modal.Body>
         {this.state.joinMessage == "OK"&&
            <AlertPanel glyph="ok-sign" type="success" text="You have successfully joined the event!" />
          }
          {this.state.joinMessage == "You have already joined!" &&
          <AlertPanel glyph="info-sign" type="warning" text="You have already joined this event!" />
          }
          {this.state.joinMessage == "This event is already full!" &&
          <AlertPanel glyph="info-sign" type="danger" text="Can't join because the event is full!" />
          }
          {this.state.joinMessage == "You're not invited!" &&
          <AlertPanel glyph="info-sign" type="danger" text="You don't have permission to join this event!" />
          }
          <Button bsStyle="info" onClick={this.closeModal}>OK</Button>
         </Modal.Body>
       </Modal>
        {this.state.error == true ? (
          <AlertPanel type="danger" text="This event doesn't exist, please check the ID!" />
        ) : (
          <div>
            <PageHeader>{this.data.name} <small>{moment(this.data.startTime).format('HH:mm DD/MM/YYYY') + " - " + moment(this.data.endTime).format('HH:mm DD/MM/YYYY')}</small></PageHeader>
            <div className="row">
              <div className="col-md-6">
                <div className="text-center col-md-4">
                  <h1 className="text-center">{JSON.parse(this.data.participants).length + "/" + this.data.max}</h1>
                  {JSON.parse(this.data.participants).length / this.data.max < 0.50 &&
                    <Label className="center" bsStyle="success">Lot of room</Label>
                  }
                  {JSON.parse(this.data.participants).length / this.data.max > 0.50 && JSON.parse(this.data.participants).length / this.data.max < 0.75 &&
                    <Label className="center" bsStyle="warning">Half Full</Label>
                  }
                  {JSON.parse(this.data.participants).length / this.data.max > 0.75 &&
                    <Label className="center" bsStyle="danger">Be quick!</Label>
                  }
                  <h3 className="text-center">Participants</h3>
                </div>
                <div className="text-center col-md-4">
                <h4>
                  {this.data.toEVI == "true" &&
                    <div>
                      <Label bsStyle="primary">Leiriläinen</Label>
                    </div>
                  }
                  <br/>
                  {this.data.toInnostaja == "true" &&
                    <Label bsStyle="info">Innostaja</Label>
                  }
                  <h3 className="text-center align-bottom">Suitable for</h3>
                  </h4>
                </div>
              </div>
              <div className="col-md-6">
                Location: {this.data.location}
                <br/>
                <Button onClick={this.joinEvent} bsStyle="success">Join</Button>
              </div>
            </div>
            <div className="row">
              <AdminEvent participants={JSON.parse(this.data.participants)} />
            </div>
          </div>
        )
        } 
      </div>
    )
  }
}

export default Event;
