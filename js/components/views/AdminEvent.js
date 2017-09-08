import React from 'react';
import ReactDOM from 'react-dom';
import bootstrap from 'bootstrap';
import { Alert, Glyphicon, Panel, Table } from 'react-bootstrap';

import UserTable from '../util/tables/UserTable.js'

import config from '../../../config.json';

class AdminEvent extends React.Component {

constructor(props) {
    super(props)
    this.state = {readyad: false, admin: false}
    this.getUsers = this.getUsers.bind(this)
 }

 getUsers() {
 	this.data = new Array;
 	this.data = [];
 	this.props.participants.forEach(function(user, index){
	 	fetch(config.api + '/getUser?id=' + user, {
	    credentials: 'same-origin'
	    })
	    .then((result) => result.json())
	    .then((result) => {
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

 render() {
 	console.log(this.state.readyad)
 if(this.state.readyad == false || this.state.admin == false) return(<div></div>)
   return(
     <div className="col-md-12">
     <hr/>
     <Panel header="Admin panel" bsStyle="info">
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
    </Panel>
     </div>
  )
}
}

export default AdminEvent;
