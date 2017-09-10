import React from 'react';
import ReactDOM from 'react-dom';
import {Nav, Navbar, MenuItem, NavItem, NavDropdown, Button, Badge} from 'react-bootstrap';
import bootstrap from 'bootstrap';
import {Link} from "react-router";
import Loading from 'react-loading';
import "./Header.less";

import UserBadge from './UserBadge.js';

class Header extends React.Component {

  constructor(props) {
    super(props)
    this.passLogout = this.passLogout.bind(this)
  }

  passLogout() {
    this.props.logout()
  }

  render() {
    console.log(this.props)
    return(
      <div className="test">
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="#">
                  Prophet
              </a>
            </div>
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav">
                <li className={this.props.location == "/" && 'active'}><a href="#">Overview</a></li>
                <li className={this.props.location == "/events" && 'active'}><Link to="events">Events</Link></li>
                <li className={this.props.location == "/myevents" && 'active'}><Link to="myevents">My Events <Badge>{this.props.events}</Badge></Link></li>
                {this.props.role == "admin"&&
                <li className={this.props.location == "/users" && 'active' + " dropdown"}>
                  <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Admin area <span className="caret"></span></a>
                  <ul className="dropdown-menu">
                    <li className={this.props.location == "/users" && 'active'}><Link to="users">Users</Link></li>
                    <li><Link to="ggenerator">Group generator</Link></li>
                    <li role="separator" className="divider"></li>
                    <li><a href="#">Analytics dashboard</a></li>
                    <li role="separator" className="divider"></li>
                    <li><a href="#">Global settings</a></li>
                  </ul>
                </li>
                }
              </ul>
              <ul className="nav navbar-nav navbar-right">
                <NavItem eventKey={1} onClick={this.passLogout}>Logout</NavItem>
                <NavItem>
                  <UserBadge name={this.props.name} role={this.props.role} />
                </NavItem>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    )
  }
}

export default Header;
