import React from 'react';
import ReactDOM from 'react-dom';
import bootstrap from 'bootstrap';
import { Panel } from 'react-bootstrap';
import fetch from 'node-fetch';
import Loading from 'react-loading';

class FormattedNumber extends React.Component {

 render() {
   return(
     <div>{this.props.number}</div>
  )
}
}

export default FormattedNumber;
