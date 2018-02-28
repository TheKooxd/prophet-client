import React from 'react';
import ReactDOM from 'react-dom';
import { Button, PageHeader, Nav, NavItem, Tab, Tabs, Modal } from 'react-bootstrap';
import Collapsible from 'react-collapsible';

import EventTable from '../../util/tables/EventTable.js'
import LogInHandler from '../../LogInHandler.js';
import AlertPanel from '../../alerts/Alert.js'
import UserGroupInfo from './inputs/UserGroupInfo.js';
import UserGroupRoles from './inputs/UserGroupRoles.js';
import GenerateUsers from './inputs/GenerateUsers.js';
import ProfileOutput from './inputs/ProfileOutput.js';

import config from '../../../../config.json'

class GroupGenerator extends React.Component {
  constructor(props) {
    super(props)
    this.data = new Object
    this.data.names = new Array();
    this.state = { name: undefined, loggedOut: false, ready: false, open: false, saved: false, data: this.data, isGenerating: false }
    this.renderInfo = this.renderInfo.bind(this)
    this.updateBasic = this.updateBasic.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.generateUsers = this.generateUsers.bind(this)
   }

  renderInfo() {
    fetch(config.api + '/info', {
      credentials: 'same-origin'
      })
      .then((result) => result.json())
      .then((result) => {
          if (!result.loggedIn) {
            this.setState({ login: true, response: true })
          } else {
            console.log(result)
              this.setState({
                name: result.usr.name,
                role: result.usr.role,
                ready: true
              })
            }

      })
  }

  generateUsers() {
    this.setState({isGenerating: true})
    fetch(config.api + '/generateGroup?names=' + JSON.stringify(this.state.data.names) + '&role=' + this.state.data.role + '&groupName=' + this.state.data.groupId, {
    credentials: 'same-origin'
    })
    .then((result) => result.json())
    .then((result) => {
    var temp = this.state.data
    temp.profiles = result
    this.setState({isGenerating: "done", data: temp})
    console.log(result)
    })
  }

  updateBasic(field, value) {
    this.data[field] = value;
    this.setState({data: this.data});
    console.log(this.state.data)
  }

  componentDidMount() {
    this.renderInfo();
  }

  componentWillReceiveProps(nextProps){
    this.renderInfo(nextProps.loggedIn);
  }

 closeModal() {
    this.setState({saved: false})
  }

  render() {
    if(this.state.ready == false) return(<h1>LOADING</h1>)
    return(
      <div>
        {this.state.role !== "admin" ? (
          <AlertPanel type="danger" text="You need to be an admin to see this!" glyph="exclamation-sign" />
        ) : (
          <div>
            <PageHeader>New User Group</PageHeader>
            <Tab.Container id="left-tabs-example" defaultActiveKey="first" className="hidden-xs hidden-sm">
              <div className="row">
                <div className="col-md-3">
                 <Nav bsStyle="pills" stacked>
                  <NavItem eventKey="first">
                    User's Names
                  </NavItem>
                  <NavItem eventKey="second">
                    User Roles and Group info
                  </NavItem>
                  <NavItem eventKey="third">
                    Overview and generating
                  </NavItem>
                  <NavItem eventKey="fourth">
                    Profile output
                  </NavItem>
                </Nav>
                </div>
                <div className="col-md-9">
                   <Tab.Content animation>
                      <Tab.Pane eventKey="first">
                        <UserGroupInfo updateBasic={this.updateBasic} />
                      </Tab.Pane>
                      <Tab.Pane eventKey="second">
                        <UserGroupRoles updateBasic={this.updateBasic} />
                      </Tab.Pane>
                      <Tab.Pane eventKey="third">
                        <GenerateUsers data={this.state.data} setEvent={this.setEvent} fillSpots={3} isGenerating={this.state.isGenerating} generateUsers={this.generateUsers} />
                      </Tab.Pane>
                      <Tab.Pane eventKey="fourth">
                        <ProfileOutput data={this.state.data} />
                      </Tab.Pane>
                    </Tab.Content>
                </div>
              </div>
            </Tab.Container>
            <Tabs defaultActiveKey={2} id="uncontrolled-tab-example" className="hidden-md hidden-lg">
               <Tab eventKey={1} title="Basic Information">Tab 1 content</Tab>
               <Tab eventKey={2} title="Participants">
                Tab 2 content
               </Tab>
            </Tabs>
          </div>
        )
        } 
      </div>
    )
  }
}

export default GroupGenerator;
