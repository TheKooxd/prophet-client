import React from 'react';
import ReactDOM from 'react-dom';
import bootstrap from 'bootstrap';
import { Alert, Glyphicon } from 'react-bootstrap';

class AlertPanel extends React.Component {
 render() {
   return(
     <Alert bsStyle={this.props.type}>
       <Glyphicon glyph={this.props.glyph} /> {this.props.text}
     </Alert>
  )
}
}

export default AlertPanel;
