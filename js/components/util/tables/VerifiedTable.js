import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import { Table } from 'react-bootstrap';
import Collapsible from 'react-collapsible';
import { transitionTo } from "react-router";
import History from 'react-history/BrowserHistory';
import { Push } from 'react-history/Actions';
import moment from 'moment';

import config from '../../../../config.json';

class VerifiedTable extends React.Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context)
    this.state = {ready: false}
  }

  handleClick() {
    if(this.props.joinLink) {
    fetch(config.api + '/joinEvent?id=' + this.props.data._id + '&usrId=' + this.props.usrId, {
      credentials: 'same-origin'
      })
      .then((result2) => result2.text())
      .then((result2) => {
        this.props.joiningDone(result2);
      })
    }
    else this.context.router.push('/event/' + this.props.data._id)
  }

getUser() {
  fetch(config.api + '/getUser?id=' + this.props.data.verifier, {
    credentials: 'same-origin'
    })
    .then((result) => result.json())
    .then((result) => {
        if(result._id == this.props.data.verifier) {
          this.verifierData = result;
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

 componentDidMount() {
    this.getUser();
  }

  componentWillReceiveProps(nextProps){
    this.getUser(nextProps);
  }

  render() {
    if(this.state.ready == false) return <small> Loading user name </small>
    return(
      <tr onClick={this.handleClick.bind(this)}>
      <td key={ this.props.index }>{this.props.data.name}</td>
      <td key={ this.props.index + 1 }>{moment(this.props.data.startTime).format('DD/MM/YYYY')}</td>
      <td key={ this.props.index + 2 }>{this.props.data.location}</td>
      <td key={ this.props.index + 3 }>{this.props.data.type}</td>
      <td key={ this.props.index + 4 }>{this.verifierData.name}</td>
      </tr>
    )
  }
}

export default VerifiedTable;
