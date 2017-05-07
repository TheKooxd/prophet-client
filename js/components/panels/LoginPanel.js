import React from 'react';
import ReactDOM from 'react-dom';
import bootstrap from 'bootstrap';
import { Input, FormControl, Button } from 'react-bootstrap';
import "./LoginPanel.less"
import fetch from 'node-fetch';

class LoginPanel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: this.props.modalIsOpen,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.login = this.login.bind(this);
 }

  login() {
    fetch('http://localhost:8080/api/login?id=' + this.state.usrId + "&pass=" + this.state.pass, {
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

 render() {
   return(
    <div className="container-fluid">
      <div className="row">
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
          <Button className="btn btn-success" onClick={this.login}>LOGIN</Button>
        </div>
      </div>
  </div>
  )
}
}

export default LoginPanel;
