import React from 'react';
import ReactDOM from 'react-dom';
import { PageHeader } from 'react-bootstrap';
import Collapsible from 'react-collapsible';

import EventTable from '../util/tables/EventTable.js'
import LogInHandler from '../LogInHandler.js';
import AlertPanel from '../alerts/Alert.js';

import config from '../../../config.json';

class Event extends React.Component {
  constructor(props) {
    super(props)
    this.state = {ready: false, error: false}
    this.getEvent = this.getEvent.bind(this)
 }

  getEvent() {
  fetch(config.api + '/getEvent?id=' + this.props.params.id, {
  credentials: 'same-origin'
  })
  .then((result) => result.json())
  .then((result) => {
      if(result[0]._id == this.props.params.id) {
        this.data = result[0];
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
    this.getEvent();
  }

  componentWillReceiveProps(nextProps){
    this.getEvent(nextProps);
  }

  render() {
    if(this.state.ready == false) return(<h1>Loading</h1>)
    return(
      <div>
        {this.state.error == true ? (
          <AlertPanel type="danger" text="This event doesn't exist, please check the ID!" />
        ) : (
          <div>
            <PageHeader>{this.data.name} <small>{this.data.startTime + "-" + this.data.endTime}</small></PageHeader>
            <div className="row">
              <div className="col-md-6">
                
              </div>
              <div className="col-md-6">
                moi
              </div>
            </div>
          </div>
        )
        } 
      </div>
    )
  }
}

export default Event;
