import React from 'react';
import ReactDOM from 'react-dom';
import bootstrap from 'bootstrap';
import { Input, FormControl, Button } from 'react-bootstrap';
import "./LoginPanel.less"
import fetch from 'node-fetch';

import AlertPanel from '../alerts/Alert.js';

import config from '../../../config.json';

class LoginPanel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: this.props.modalIsOpen,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleChange3 = this.handleChange3.bind(this);
    this.handleChange4 = this.handleChange4.bind(this);
    this.changePass = this.changePass.bind(this);
    this.login = this.login.bind(this);
 }

  login() {
    fetch(config.api + '/login', {
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'PUT',
    body: JSON.stringify({
      "id": this.state.usrId, 
      "pass": this.state.pass
    })
    })
  .then((resp) => resp.json())
  .then(function(res){
    if(!res.loggedIn) {
      this.setState({ login: false })
    }
    if(res.loggedIn) {
      this.setState({ login: true, usr: res.usr})
    }
    this.props.handler(this.state)
  }.bind(this))
  }

  changePass() {
  fetch(config.api + '/login?changePass=true&oldPass=' + this.state.pass + '&newPass=' + this.state.newPass1, {
  credentials: 'same-origin'
  })
  .then((resp) => resp.json())
  .then(function(res){
  if(!res.loggedIn) {
    this.setState({ login: false })
  }
  if(res.loggedIn) {
    this.setState({ login: true, usr: res.usr})
  }
  this.props.handler(this.state)
}.bind(this))
}

  handleChange(event) {
    this.setState({
        usrId : event.target.value
    });
  }

  handleChange2(event) {
    this.setState({
        pass : event.target.value
    });
  }

  handleChange3(event) {
    if(event.target.value !== this.state.newPass2) this.setState({mismachErr: true})
    else this.setState({mismachErr: false})
    this.setState({
        newPass1 : event.target.value
    });
  }

  handleChange4(event) {
    if(event.target.value !== this.state.newPass1) this.setState({mismachErr: true})
    else this.setState({mismachErr: false})
    this.setState({
        newPass2 : event.target.value
    });
  }

 render() {
   return(
    <div className="container-fluid">
      <div className="row">
      {this.props.changePass ? (
        <div>
        <div className="col-lg-8">
         <FormControl
          type="password"
          value={this.state.value}
          placeholder="Old password"
          onChange={this.handleChange2}
        />
        <br/>
        {this.state.mismachErr == true &&
          <AlertPanel type="danger" glyph="exclamation-sign" text="New passwords do not match." />
        }
        <FormControl
         type="password"
         value={this.state.value}
         placeholder="New password"
         onChange={this.handleChange3}
       />
       <FormControl
         type="password"
         value={this.state.value}
         placeholder="New password again"
         onChange={this.handleChange4}
       />
       </div> 
       <div className="col-lg-4 text-center">
          <Button className="btn btn-success btn-login" onClick={this.changePass}>Save</Button>
        </div>
      </div>
        ) : (
        <div>
         <div className="col-lg-8">
           <FormControl
            type="text"
            value={this.state.value}
            placeholder="User Id"
            onChange={this.handleChange}
          />
          <br/>
          <FormControl
           type="password"
           value={this.state.value}
           placeholder="Password"
           onChange={this.handleChange2}
         />
        </div>
        <div className="col-lg-4 text-center">
          <Button className="btn btn-success btn-login" onClick={this.login}>LOGIN</Button>
        </div>
        </div>
        )}
      </div>
  </div>
  )
}
}

export default LoginPanel;
