import React from 'react';
import ReactDOM from 'react-dom';
import { Button, PageHeader, Nav, NavItem, Tab, Tabs } from 'react-bootstrap';
import Collapsible from 'react-collapsible';

import EventTable from '../util/tables/EventTable.js'
import LogInHandler from '../LogInHandler.js';
import AlertPanel from '../alerts/Alert.js'
import BasicInfo from './inputs/BasicInfo';

import config from '../../../config.json'

class newEvent extends React.Component {
  constructor(props) {
    super(props)
    this.state = { name: undefined, loggedOut: false, ready: false, open: false }
    this.renderInfo = this.renderInfo.bind(this)
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
              this.setState({
                name: result.usr.name,
                role: result.usr.role,
                ready: true
              })
            }

      })
  }

  componentDidMount() {
    this.renderInfo();
  }

  componentWillReceiveProps(nextProps){
    this.renderInfo(nextProps.loggedIn);
  }

  render() {
    if(this.state.ready == false) return(<h1>LOADING</h1>)
    return(
      <div>
        {this.state.role !== "admin" ? (
          <AlertPanel type="danger" text="You need to be an admin to see this!" glyph="exclamation-sign" />
        ) : (
          <div>
            <PageHeader>New Event</PageHeader>
            <Tab.Container id="left-tabs-example" defaultActiveKey="first" className="hidden-xs hidden-sm">
              <div className="row">
                <div className="col-md-3">
                 <Nav bsStyle="pills" stacked>
                  <NavItem eventKey="first">
                    Basic Information
                  </NavItem>
                  <NavItem eventKey="second">
                    Participants
                  </NavItem>
                </Nav>
                </div>
                <div className="col-md-9">
                   <Tab.Content animation>
                      <Tab.Pane eventKey="first">
                        <BasicInfo />
                      </Tab.Pane>
                      <Tab.Pane eventKey="second">
                        Tab 2 content
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

export default newEvent;
