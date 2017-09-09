import React from 'react';
import ReactDOM from 'react-dom';
import bootstrap from 'bootstrap';
import { Button, Modal,Popover,Table, OverlayTrigger, Alert, Glyphicon } from 'react-bootstrap';
import AlertPanel from '../../alerts/Alert.js';
import EventTable from '../../util/tables/EventTable.js';
import Loading from '../../util/Loading.js';

import config from '../../../../config.json'

class DeleteModal extends React.Component {
  constructor(props) {
    super(props)
    this.handleOutput = this.handleOutput.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.state = { ready: false, output: "" }
 }

 getEvents() {
  fetch(config.api + '/getEvents', {
  credentials: 'same-origin'
  })
  .then((result) => result.json())
  .then((result) => {
      this.data = result;
      this.setState({
        ready: true
      })
  });
}

componentDidMount() {
  this.getEvents();
}

componentWillReceiveProps(nextProps){
  this.getEvents(nextProps);
}

handleOutput(response) {
  this.setState({output: response})
}

closeModal() {
  this.props.closeModal("forceadd");
}

 render() {
  console.log(this.props)
   return (
     <div>
       <Modal show={this.props.open} bsSize="large" aria-labelledby="contained-modal-title-lg">
         <Modal.Header>
           <Modal.Title>Add {this.props.data.name} to an event</Modal.Title>
         </Modal.Header>
         <Modal.Body>
         Click the event you want {this.props.data.name} join:
         {this.state.ready == false &&
          <Loading />
         }
         {this.state.ready == true &&
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
                  <EventTable usrId={this.props.data._id} joinLink={true} index={index} data={data} joiningDone={this.handleOutput} />
                );
              }.bind(this))}
            </tbody>
          </Table>
         }
         {this.state.output == "You have already joined!" &&
          <AlertPanel type="info" text="User has already joined this event" glyph="info-sign" />
         }
         {this.state.output == "OK" &&
          <AlertPanel type="success" text="User was added to the event" glyph="ok-sign" />
         }
         </Modal.Body>
         <Modal.Footer>
          <Button bsStyle="info" onClick={this.closeModal}>Close</Button>
         </Modal.Footer>
       </Modal>
     </div>
   );
 }
}

export default DeleteModal;
