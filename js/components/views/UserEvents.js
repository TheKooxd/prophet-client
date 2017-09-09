import React from 'react';
import ReactDOM from 'react-dom';
import bootstrap from 'bootstrap';
import { Alert, Glyphicon, Panel, Table } from 'react-bootstrap';

import EventTable from '../util/tables/EventTable.js'
import Loading from '../util/Loading.js';

import config from '../../../config.json';

class AdminEvent extends React.Component {

constructor(props) {
    super(props)
    this.state = {readyad: false, admin: false}
    this.getEvents = this.getEvents.bind(this)
 }

 getEvents() {
 	this.data = new Array;
 	this.data = [];
 	this.props.events.forEach(function(event, index){
	 	fetch(config.api + '/getEvent?id=' + event, {
	    credentials: 'same-origin'
	    })
	    .then((result) => result.json())
	    .then((result) => {
	    	if(result.events != undefined) {
	    		this.setState({admin: true})
	    	}
	    	this.data[index] = result
	        if(index + 1 == this.props.events.length) {
	          this.setState({readyad: true})
	        }
	    });
	 }.bind(this))
 }

 componentDidMount() {
    this.getEvents();
  }

  componentWillReceiveProps(nextProps){
    this.getEvents(nextProps);
  }

 render() {
 if(this.state.readyad == false) return <Loading />
   return(
     <div className="col-md-12">
     <hr/>
      Events joined: 
 		<Table condensed hover>
       <thead>
          <tr>
            <th>Name</th>
            <th>Time</th>
            <th>Place</th>
            <th>Expires</th>
            <th>Slots</th>
          </tr>
        </thead>
        <tbody>
        {this.data.map(function(data, index){
          return(
            <EventTable index={index} data={data[0]} />
          );
        }.bind(this))}
       </tbody>
      </Table>
     </div>
  )
}
}

export default AdminEvent;
