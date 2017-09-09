import React from 'react';
import ReactDOM from 'react-dom';
import { Table, Button } from 'react-bootstrap';
import Collapsible from 'react-collapsible';

import UserTable from '../util/tables/UserTable.js'
import LogInHandler from '../LogInHandler.js';
import Loading from '../util/Loading.js';
import AlertPanel from '../alerts/Alert.js';

import config from '../../../config.json'

class Events extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = { name: undefined, loggedOut: false, ready: false, open: false }
    this.renderInfo = this.renderInfo.bind(this)
    this.getUsers = this.getUsers.bind(this)
 }

  renderInfo(info) {
    if(info !== undefined && info.usr !== undefined) {
      this.setState({
        name: info.usr.name,
        role: info.usr.role,
        loggedOut: true
      })
    }
  }

  getUsers() {
  fetch(config.api + '/getUsers', {
  credentials: 'same-origin'
  })
  .then((result) => result.json())
  .then((result) => {
      this.data = result;
      this.setState({
        ready: true
      })
  })
  .catch(function() {
      this.setState({error: true, ready: true})
    }.bind(this));
}

  componentDidMount() {
    this.renderInfo();
    this.getUsers();
  }

  componentWillReceiveProps(nextProps){
    this.renderInfo(nextProps.loggedIn);
    this.getUsers(nextProps);
  }

  render() {
    if(this.state.ready == false) return (
      <Loading />
    )
    return(
    <div>
      <div>
        <LogInHandler renderInfo={this.renderInfo} name={this.state.name} />
        <div className="row">
        </div>
        <div className="row">
         <div className="col-md-12">
           {this.props.location.query.delete == "true" &&
            <AlertPanel type="success" text="User deleted succesfully!" glyph="ok-sign" />
            }
          <Table condensed hover>
            <thead>
              <tr>
                <th>id</th>
                <th>Name</th>
                <th>Role</th>
                <th>Number of events</th>
              </tr>
            </thead>
            <tbody>
            {this.data.map(function(data, index){
              return(
                <UserTable index={index} data={data} />
              );
            }.bind(this))}
           </tbody>
          </Table>
        </div>
        </div>
      </div>
      </div>
    )
  }
}

export default Events;
