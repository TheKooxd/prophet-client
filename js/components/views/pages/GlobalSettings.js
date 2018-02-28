import React from 'react';
import ReactDOM from 'react-dom';
import { Button, PageHeader, Nav, NavItem, Tab, Tabs, Modal } from 'react-bootstrap';
import Collapsible from 'react-collapsible';

import EventTable from '../../util/tables/EventTable.js'
import LogInHandler from '../../LogInHandler.js';
import AlertPanel from '../../alerts/Alert.js'
import UserGroupInfo from './inputs/UserGroupInfo.js';
import EventRequirements from './inputs/EventRequirements.js';
import GenerateUsers from './inputs/GenerateUsers.js';
import ProfileOutput from './inputs/ProfileOutput.js';

import config from '../../../../config.json'

class GlobalSettings extends React.Component {
  constructor(props) {
    super(props)
    this.data = new Object
    this.state = { name: undefined, loggedOut: false, ready: false, open: false, saved: false, data: this.data, savedError: false, noChanges: true }
    this.renderInfo = this.renderInfo.bind(this)
    this.updateBasic = this.updateBasic.bind(this)
    this.updateFourField = this.updateFourField.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.saveChanges = this.saveChanges.bind(this)
   }

  renderInfo() {
    fetch(config.api + '/info', {
      credentials: 'same-origin'
      })
      .then((result) => result.json())
      .then((result) => {
        fetch(config.api + '/getSettings', {
        credentials: 'same-origin'
        })
        .then((result2) => result2.json())
        .then((result2) => {
      if (!result.loggedIn) {
        this.setState({ login: true, response: true })
      } else {
          this.data = result2
          this.setState({
            name: result.usr.name,
            role: result.usr.role,
            ready: true,
            data: result2
          })
        }
        })
      })
  }

  updateBasic(field, value) {
    this.data[field] = value;
    this.setState({data: this.data});
  }

  updateFourField(setting, role, field, value) {
    this.data[setting][role][field] = value;
    if(JSON.stringify(this.data) == JSON.stringify(this.state.data)) this.setState({noChanges: true, data: this.data})
    else this.setState({data: this.data, noChanges: false});
  }

  saveChanges() {
    fetch(config.api + '/changeSettings?settings=' + JSON.stringify(this.state.data), {
      credentials: 'same-origin'
      })
      .then((result) => result.text())
      .then((result) => {
        if(result == "OK") {
          this.setState({saved: true, savedError: false})
          setTimeout(function(){
             this.setState({saved: false});
           }.bind(this),3000); 
        }
        else this.setState({savedError: true, saved: false})
      })
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
          {this.state.saved == true&&
            <AlertPanel glyph="ok-sign" type="success" text="Settings saved!" />
          }
            <PageHeader>Global Settings</PageHeader>
            <Tab.Container id="left-tabs-example" defaultActiveKey="first" className="hidden-xs hidden-sm">
              <div className="row">
                <div className="col-md-3">
                 <Nav bsStyle="pills" stacked>
                  <NavItem eventKey="first">
                    General Settings
                  </NavItem>
                  <NavItem eventKey="second">
                    Ëvent Requirements
                  </NavItem>
                  <NavItem eventKey="third">
                    Something something
                  </NavItem>
                    <Button bsStyle="success" onClick={this.saveChanges}>SAVE</Button>
                </Nav>
                </div>
                <div className="col-md-9">
                   <Tab.Content animation>
                      <Tab.Pane eventKey="first">
                       
                      </Tab.Pane>
                      <Tab.Pane eventKey="second">
                        <EventRequirements updateFourField={this.updateFourField} data={this.state.data} />
                      </Tab.Pane>
                      <Tab.Pane eventKey="third">
                        
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

export default GlobalSettings;
