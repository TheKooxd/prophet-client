import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import { Table } from 'react-bootstrap';
import Collapsible from 'react-collapsible';
import { transitionTo } from "react-router";
import History from 'react-history/BrowserHistory';
import { Push } from 'react-history/Actions';
import moment from 'moment';

class EventTable extends React.Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context)
  }

  handleClick() {
    this.context.router.push('/event/' + this.props.data._id)
  }

  render() {
    return(
      <tr onClick={this.handleClick.bind(this)}>
      <td key={ this.props.index }>{this.props.data.name}</td>
      <td key={ this.props.index + 1 }>{moment(this.props.data.startTime).format('DD/MM/YYYY')}</td>
      <td key={ this.props.index + 2 }>{this.props.data.location}</td>
      <td key={ this.props.index + 3 }>{moment(this.props.data.closes).format('DD/MM/YYYY')}</td>
      <td key={ this.props.index + 4 }>{JSON.parse(this.props.data.participants).length + "/" + this.props.data.max}</td>
      </tr>
    )
  }
}

export default EventTable;
