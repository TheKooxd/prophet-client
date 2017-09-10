import React from 'react';
import ReactDOM from 'react-dom';
import bootstrap from 'bootstrap';
import { Alert, Glyphicon, Panel, Table } from 'react-bootstrap';

import VerifiedTable from '../util/tables/VerifiedTable.js'
import Loading from '../util/Loading.js';

import config from '../../../config.json';

class UserVerified extends React.Component {

constructor(props) {
    super(props)
    console.log(props)
    this.state = {readyad: false}
    this.getEvents = this.getEvents.bind(this)
 }

 getEvents() {
 	this.data = new Array;
 	this.data = [];
 	this.props.verifiedEvents.forEach(function(event, index){
	 	fetch(config.api + '/getEvent?id=' + event.event, {
	    credentials: 'same-origin'
	    })
	    .then((result) => result.json())
	    .then((result) => {
        result[0].verifier = event.verifier
	    	this.data[index] = result
        console.log(this.data[index])
	      if(this.data.length == this.props.verifiedEvents.length) {
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
      Events verified: 
 		<Table condensed hover>
       <thead>
          <tr>
            <th>Name</th>
            <th>Time</th>
            <th>Place</th>
            <th>Type</th>
            <th>Verifier</th>
          </tr>
        </thead>
        <tbody>
        {this.data.map(function(data, index){
          return(
            <VerifiedTable index={index} data={data[0]} />
          );
        }.bind(this))}
       </tbody>
      </Table>
     </div>
  )
}
}

export default UserVerified;
