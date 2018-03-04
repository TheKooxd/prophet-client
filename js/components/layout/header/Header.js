import React, {PropTypes}  from 'react';
import ReactDOM from 'react-dom';
import {Nav, Navbar, MenuItem, NavItem, NavDropdown, Button, Badge, Breadcrumb, FormGroup, FormControl, Glyphicon} from 'react-bootstrap';
import bootstrap from 'bootstrap';
import {Link} from "react-router";
import ReactDatalist from 'react-datalist';
import "./Header.less";

import UserBadge from './UserBadge.js';
import Loading from '../../util/Loading.js'

import config from '../../../../config.json'

class Header extends React.Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context)
    this.passLogout = this.passLogout.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    if(this.props.role == "admin") this.state = {loadStatus: null, suggestions: [], value: "", loading: false, result: null, inputSize: 14}
    else this.state = {loadStatus: null, suggestions: [], value: "", loading: false, result: null, inputSize: 23}
  }

  passLogout() {
    this.props.logout()
  }

  handleChange(e) {
  this.setState( {loadStatus: "warning", term: e.target.value, result: null} )
   fetch(config.api + '/dbSearch?onlyMeta=true&term=' + e.target.value, {
   credentials: 'same-origin'
   })
   .then((result) => result.json())
   .then((result) => {
      if(result.length == 0) this.setState({loadStatus: "error"})
      if(result.length == 1 && result[0] !== undefined) {
        this.setState({loadStatus: "success", result: result})
      }
      result.forEach(function(val){
        if(typeof(val) == "string" && this.state.term == val) {
          this.setState({ result: "group", data: result })
        }
      }.bind(this))
       if(result.length !== 0) {
        var suggestionsCache = result.map(function(val, index) {return val.name})
        suggestionsCache.forEach(function(val, index){
          if(val == undefined) {
            suggestionsCache.push(result[result.length - 1])
          }
          if(index + 1 == suggestionsCache.length) {
            this.setState({
              loadStatus: "success",
              suggestions: suggestionsCache
            })
          }
        }.bind(this))
      }
   });
 }

 handleClick(e) {
  if(this.state.result[0].type == "event") {
    this.context.router.push('/event/' + this.state.result[0].id)
  }
  if(this.state.result[0].type == "user") {
    this.context.router.push('/user/' + this.state.result[0].id)
  }
 }

  render() {
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
                <li className={this.props.location == "/events" && 'active'}><Link to="events">Open Events</Link></li>
                <li className={this.props.location == "/myevents" && 'active'}><Link to="myevents">My Events <Badge>{this.props.events}</Badge></Link></li>
                {this.props.role == "admin"&&
                <li className={this.props.location == "/users" && 'active' + " dropdown"}>
                  <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Admin area <span className="caret"></span></a>
                  <ul className="dropdown-menu">
                    <li className={this.props.location == "/users" && 'active'}><Link to="users">Users</Link></li>
                    <li><Link to="ggenerator">Group generator</Link></li>
                    <li role="separator" className="divider"></li>
                    <li><Link to="dashboard">Analytic dashboard</Link></li>
                    <li role="separator" className="divider"></li>
                    <li><Link to="settings">Global settings</Link></li>
                  </ul>
                </li>
                }
              </ul>
              <div className="hidden-md hidden-sm hidden-xs vertical-center">
                <Navbar.Form pullLeft>
                  <FormGroup>
                     <FormControl size={this.state.inputSize} type="text" list="suggestions" placeholder="Search" value={this.state.term} onChange={this.handleChange} />
                    <ReactDatalist list="suggestions" options={this.state.suggestions} className="hidden" />
                  </FormGroup>
                  {' '}
                   {this.state.loadStatus == "success" || this.state.loadStatus == null ? (
                   <Button onClick={this.handleClick} bsStyle="success" bsClass="btn"><Glyphicon glyph="search"/></Button>
                    ) : (
                   <Button onClick={this.handleClick} bsStyle="success" disabled bsClass="btn"><Loading size={"20px"}/></Button>
                    )}
                </Navbar.Form>
              </div>
              <ul className="nav navbar-nav navbar-right">
                <NavItem eventKey={1} onClick={this.passLogout}>Logout</NavItem>
                <NavItem>
                  <UserBadge name={this.props.name} role={this.props.role} />
                </NavItem>
              </ul>
            </div>
          </div>
        </nav>
        <Breadcrumb>
          <Breadcrumb.Item>
            Home
          </Breadcrumb.Item>
          {this.props.location.includes("/myevents") &&
            <Breadcrumb.Item>
              <Link to="events">My Events</Link>
            </Breadcrumb.Item>
          }
          {this.props.location.includes("/newEvent") &&
            <Breadcrumb.Item>
              <Link to="newEvent">New Event</Link>
            </Breadcrumb.Item>
          }
          {this.props.location.includes("/events") &&
            <Breadcrumb.Item>
              <Link to="events">Open Events</Link>
            </Breadcrumb.Item>
          }
          {this.props.location.includes("/event/") &&
            <Breadcrumb.Item>
              <Link to="events">Open Events</Link>
            </Breadcrumb.Item>
          }
          {this.props.location.includes("/event/") &&
            <Breadcrumb.Item>
              <Link to={'event/' + this.props.location.split("/").pop()}>{'Event_' + this.props.location.split("/").pop()}</Link>
             </Breadcrumb.Item>
          }
          {this.props.location.includes("user") &&
            <Breadcrumb.Item>
              <Link to='users'>Admin area</Link>
             </Breadcrumb.Item>
          }
          {this.props.location.includes("user") &&
            <Breadcrumb.Item>
              <Link to='users'>Users</Link>
             </Breadcrumb.Item>
          }
          {this.props.location.includes("ggenerator") &&
            <Breadcrumb.Item>
              <Link to='users'>Admin area</Link>
             </Breadcrumb.Item>
          }
          {this.props.location.includes("ggenerator") &&
            <Breadcrumb.Item>
              <Link to='ggenerator'>Group generator</Link>
             </Breadcrumb.Item>
          }
          {this.props.location.includes("/user/") &&
            <Breadcrumb.Item>
              <Link to={'user/' + this.props.location.split("/").pop()}>{'User_' + this.props.location.split("/").pop()}</Link>
             </Breadcrumb.Item>
          }
        </Breadcrumb>
      </div>
    )
  }
}

export default Header;
