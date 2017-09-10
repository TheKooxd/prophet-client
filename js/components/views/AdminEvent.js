import React from 'react';
import ReactDOM from 'react-dom';
import bootstrap from 'bootstrap';
import { Alert, Glyphicon, Panel, Table } from 'react-bootstrap';
import moment from 'moment';

import UserTable from '../util/tables/UserTable.js'
import VerifyTable from '../util/tables/VerifyTable.js'
import Loading from '../util/Loading.js';
import AlertPanel from '../alerts/Alert.js';

import config from '../../../config.json';

class AdminEvent extends React.Component {

constructor(props) {
    super(props)
    this.state = {readyad: false, admin: false, verifyLoad: false}
    this.getUsers = this.getUsers.bind(this)
    this.verify = this.verify.bind(this)
    this.removeByAttr = this.removeByAttr.bind(this)
 }

removeByAttr(arr, attr, value){
    var i = arr.length;
    while(i--){
       if( arr[i] 
           && arr[i].hasOwnProperty(attr) 
           && (arguments.length > 2 && arr[i][attr] === value ) ){ 

           arr.splice(i,1);

       }
    }
    return arr;
}

 getUsers() {
 	this.data = new Array;
 	this.data = [];
  this.unverifiedData = new Array;
  this.unverifiedData = [];
 	this.props.participants.forEach(function(user, index){
	 	fetch(config.api + '/getUser?id=' + user, {
	    credentials: 'same-origin'
	    })
	    .then((result) => result.json())
	    .then((result) => {
        if(JSON.parse(result.events).includes(this.props.eventId)) {
          this.unverifiedData[index] = result
        }
	    	if(result.events != undefined) {
	    		this.setState({admin: true})
	    	}
	    	this.data[index] = result
	        if(index + 1 == this.props.participants.length) {
	          this.setState({readyad: true})
	        }
	    });
	 }.bind(this))
 }

 componentDidMount() {
    this.getUsers();
  }

  componentWillReceiveProps(nextProps){
    this.getUsers(nextProps);
  }

  verify(userId) {
    this.removeByAttr(this.unverifiedData, '_id', userId)
    this.setState({verifyLoad: true})
    var temp = this.unverifiedData
    fetch(config.api + '/verifyEvent?id=' + this.props.eventId + '&usrId=' + userId, {
      credentials: 'same-origin'
      })
      .then((result) => result.text())
      .then((result) => {
        if(result == "OK") {
          this.setState({verifyLoad: false}) 
        }
      })
    .catch(function() {
      this.setState({verifyLoad: false})
    }.bind(this));
    
  }

 render() {
 if(this.state.readyad == false || this.state.admin == false) return <div></div>
   return(
     <div>
     {moment(this.props.startTime) < moment() && this.unverifiedData.length == 0 ? (
      <AlertPanel type="success" text="All participants have been verified!" glyph="ok-sign" />
      ) : (
     <div className="row">
     <Panel header="Admin panel" bsStyle="info">
      <div className="row">
        <div className="col-md-12">
          {moment(this.props.startTime) > moment() ? (
            <div className="col-md-12">
              People joined: 
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
              <hr/>
              <AlertPanel type="info" text="Participant vertification is only aviable after the event has started." glyph="info-sign" />
              </div>
          ) : (
            <div className="col-md-12">
              People unverified: 
              {this.state.verifyLoad ? (
                <Loading />
                ) : (
            <Table condensed hover>
               <thead>
                  <tr>
                    <th>id</th>
                    <th>Name</th>
                    <th>Role</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                {this.unverifiedData.map(function(data2, index){
                  return(
                    <VerifyTable rerender={this.state.verifyLoad} index={index} data={data2} verify={this.verify} />
                  );
                }.bind(this))}
               </tbody>
              </Table>
              )}
            </div>
          )}
        </div>
      </div>
    </Panel>
    </div>
    )}
    </div>
  )
}
}

export default AdminEvent;
