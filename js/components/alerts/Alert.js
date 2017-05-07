import React from 'react';
import ReactDOM from 'react-dom';
import bootstrap from 'bootstrap';
import { Alert } from 'react-bootstrap';

class AlertPanel extends React.Component {
 render() {
   return(
     <Alert bsStyle={this.props.type}>
       {this.props.text}
     </Alert>
  )
}
}

export default AlertPanel;
