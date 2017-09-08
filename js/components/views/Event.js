import React from 'react';
import ReactDOM from 'react-dom';
import { PageHeader, Label, Button } from 'react-bootstrap';
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
    this.joinEvent = this.joinEvent.bind(this)
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

  joinEvent() {
   fetch(config.api + '/info', {
      credentials: 'same-origin'
      })
   .then((result) => result.json())
   .then((result) => {
      fetch(config.api + '/joinEvent?id=' + this.props.params.id + '&usrId=' + result.usr._id, {
        credentials: 'same-origin'
        })
        .then((result2) => result2.text())
        .then((result2) => {
          console.log(result2)
          this.getEvent();
        })
      })
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
            <PageHeader>{this.data.name} <small>{this.data.startTime + " - " + this.data.endTime}</small></PageHeader>
            <div className="row">
              <div className="col-md-6">
                <div className="text-center col-md-4">
                  <h1 className="text-center">{JSON.parse(this.data.participants).length + "/" + this.data.max}</h1>
                  {JSON.parse(this.data.participants).length / this.data.max < 0.50 &&
                    <Label className="center" bsStyle="success">Lot of room</Label>
                  }
                  {JSON.parse(this.data.participants).length / this.data.max > 0.50 && JSON.parse(this.data.participants).length / this.data.max < 0.75 &&
                    <Label className="center" bsStyle="warning">Half Full</Label>
                  }
                  {JSON.parse(this.data.participants).length / this.data.max > 0.75 &&
                    <Label className="center" bsStyle="danger">Be quick!</Label>
                  }
                  <h3 className="text-center">Participants</h3>
                </div>
                <div className="text-center col-md-4">
                <h4>
                  {this.data.toEVI == "true" &&
                    <div>
                      <Label bsStyle="primary">Leiriläinen</Label>
                    </div>
                  }
                  <br/>
                  {this.data.toInnostaja == "true" &&
                    <Label bsStyle="info">Innostaja</Label>
                  }
                  <h3 className="text-center align-bottom">Suitable for</h3>
                  </h4>
                </div>
              </div>
              <div className="col-md-6">
                Location: {this.data.location}
                <br/>
                <Button onClick={this.joinEvent} bsStyle="success">Join</Button>
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
