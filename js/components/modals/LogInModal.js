import React from 'react';
import ReactDOM from 'react-dom';
import bootstrap from 'bootstrap';
import { Button, Modal,Popover,Tooltip, OverlayTrigger, Alert, Glyphicon } from 'react-bootstrap';
import AlertPanel from '../alerts/Alert.js';

import LoginPanel from '../panels/LoginPanel.js';

import config from '../../../config.json'

class LogInModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: this.props.modalIsOpen,
    };
    this.close = this.close.bind(this)
    this.handler = this.handler.bind(this)
 }

  close() {
    this.setState({ showModal: false })
  }

  handler(e) {
    if(!e.login) {
      this.setState({ loginErr: true })
    }
    else {
      this.setState({ showModal: false })
      this.props.getUser(e);
    }
  }

 render() {
   const popover = (
     <Popover id="modal-popover" title="popover">
       very popover. such engagement
     </Popover>
   );
   const tooltip = (
     <Tooltip id="modal-tooltip">
       wow.
     </Tooltip>
   );

   return (
     <div>
       <Modal show={this.state.showModal} bsSize="large" aria-labelledby="contained-modal-title-lg">
         <Modal.Header>
           <Modal.Title>Login to Prophet</Modal.Title>
         </Modal.Header>
         <Modal.Body>
          {this.props.err == true &&
            <Alert bsStyle="info">
              <Glyphicon glyph="info-sign" /> You're not logged in currently
            </Alert>
          }
          {this.props.loggedOut == true &&
            <Alert bsStyle="success">
              <Glyphicon glyph="ok-sign" /> Logged out successfully
            </Alert>
          }
          {this.state.loginErr == true &&
            <Alert bsStyle="danger">
              <Glyphicon glyph="exclamation-sign" /> Login Error
            </Alert>
          }
           <h4>Enter the credentials provided by your SRK:</h4>
           <LoginPanel handler = {this.handler} />
         </Modal.Body>
         <Modal.Footer>
         </Modal.Footer>
       </Modal>
     </div>
   );
 }
}

export default LogInModal;
