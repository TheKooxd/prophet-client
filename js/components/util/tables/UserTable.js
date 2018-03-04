import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import { Table, Label, Badge } from 'react-bootstrap';
import Collapsible from 'react-collapsible';
import { transitionTo } from "react-router";
import History from 'react-history/BrowserHistory';
import { Push } from 'react-history/Actions';

import UserBadge from '../../layout/header/UserBadge.js'
import EventsLeft from '../EventsLeft.js';

class UserTable extends React.Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context)
  }

  handleClick() {
    this.context.router.push('/user/' + this.props.data._id)
  }

  render() {
    console.log(this.props.data)
    return(
      <tr onClick={this.handleClick.bind(this)}>
      <td key={ this.props.index }>{this.props.data.groupId}</td>
      <td key={ this.props.index + 4 }>{this.props.data.name}</td>
      <td key={ this.props.index + 1 }>
        {this.props.data.changePass == true ? (
          <Label bsStyle="danger"> FALSE </Label>
        ) : (
          <Label bsStyle="success"> TRUE </Label>
        )}
      </td>
      <td key={ this.props.index + 2 }><UserBadge name=" " onlyBadge={true} role={this.props.data.role} /></td>
      <td key={ this.props.index + 3 }><Badge bsStyle="success">{JSON.parse(this.props.data.events).length}</Badge></td>
      </tr>
    )
  }
}

export default UserTable;
