import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import { Table, Button } from 'react-bootstrap';
import Collapsible from 'react-collapsible';
import { transitionTo } from "react-router";
import History from 'react-history/BrowserHistory';
import { Push } from 'react-history/Actions';

import UserBadge from '../../layout/header/UserBadge.js'

class VerifyTable extends React.Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context)
  }

  handleClick() {
    this.props.verify(this.props.data._id)
  }

  render() {
    return(
      <tr>
      <td key={ this.props.index }>{this.props.data._id}</td>
      <td key={ this.props.index + 1 }>{this.props.data.name}</td>
      <td key={ this.props.index + 2 }><UserBadge name=" " onlyBadge={true} role={this.props.data.role} /></td>
      <td key={ this.props.index + 3 }><Button onClick={this.handleClick.bind(this)} style={{margin: "0px"}} bsStyle="warning" bsSize="small">Verify</Button></td>
      </tr>
    )
  }
}

export default VerifyTable;
