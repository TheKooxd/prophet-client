import React from 'react';
import ReactDOM from 'react-dom';
import bootstrap from 'bootstrap';
import { Button, Modal,Popover,Table, OverlayTrigger, Alert, Glyphicon, Fade } from 'react-bootstrap';
import AlertPanel from '../../alerts/Alert.js';
import EventTable from '../../util/tables/EventTable.js';
import Loading from '../../util/Loading.js';
import ReactTimeout from 'react-timeout';
import config from '../../../../config.json'

class DeleteModal extends React.Component {
  constructor(props) {
    super(props)
    this.handleOutput = this.handleOutput.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.closeAlerts = this.closeAlerts.bind(this)
    this.state = { ready: false, output: "", already: false, ok: false, error: false }
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
  console.log(response)
  if(response == "You have already joined!") this.setState({already: true})
  if(response == "OK") this.setState({ok: true})
  else this.setState({error:true})
  setTimeout(function() { this.setState({already: false, error: false, ok: false}); }.bind(this), 3000);
}

closeAlerts() {
  console.log("close")
}

closeModal() {
  this.props.closeModal("forceadd");
}

 render() {
  console.log(this.state.already)
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
         <div className="row">
         <Fade in={this.state.already}>
           <div className="col-md-12">
            <AlertPanel type="info" text="User has already joined this event" glyph="info-sign" />
           </div>
         </Fade>
         <Fade in={this.state.ok}>
           <div className="col-md-12">
              <AlertPanel type="success" text="User was added to the event" glyph="ok-sign" />
           </div>
         </Fade>
         </div>
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
