import React from 'react';
import ReactDOM from 'react-dom';
import { Button, PageHeader, Nav, NavItem, Tab, Tabs, Modal } from 'react-bootstrap';
import Collapsible from 'react-collapsible';

import EventTable from '../util/tables/EventTable.js'
import LogInHandler from '../LogInHandler.js';
import AlertPanel from '../alerts/Alert.js'
import BasicInfo from './inputs/BasicInfo';
import UserSelector from './inputs/UserSelector';
import Overview from './Overview.js';

import config from '../../../config.json'

class newEvent extends React.Component {
  constructor(props) {
    super(props)
    this.state = { name: undefined, loggedOut: false, ready: false, open: false, saved: false }
    this.renderInfo = this.renderInfo.bind(this)
    this.setEvent = this.setEvent.bind(this)
    this.updateBasic = this.updateBasic.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.data = new Object
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

  updateBasic(field, value) {
    this.data[field] = value;
    this.setState({data: this.data});
  }

  componentDidMount() {
    this.renderInfo();
  }

  componentWillReceiveProps(nextProps){
    this.renderInfo(nextProps.loggedIn);
  }

  setEvent() {
    console.log(this.state.data)
      fetch(config.api + '/setEvent?name=' + this.state.data.name + '&startTime=' + this.state.data.starts + '&endTime=' + this.state.data.ends+ '&closes=' + this.state.data.closes+ '&location=' + this.state.data.location+ '&toInnostaja=' + this.state.data.toInnostaja + '&toEVI=' + this.state.data.toEVI + '&toIndividual=false' + '&max=' + this.state.data.max + '&type=' + this.state.data.type, {
        credentials: 'same-origin'
        })
        .then((result) => result.text())
        .then((result) => {
        this.setState({saved: true})
        })
  }

 closeModal() {
    this.setState({saved: false})
  }

  render() {
    console.log(this.state.role)
    if(this.state.ready == false) return(<h1>LOADING</h1>)
    return(
      <div>
        <Modal show={this.state.saved} bsSize="large" aria-labelledby="contained-modal-title-lg">
         <Modal.Body>
         <AlertPanel type="success" text="Event was saved succesfully!" glyph="ok-sign" />
          <Button bsStyle="info" onClick={this.closeModal}>OK</Button>
         </Modal.Body>
       </Modal>
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
                  <NavItem eventKey="third">
                    Overview and saving
                  </NavItem>
                </Nav>
                </div>
                <div className="col-md-9">
                   <Tab.Content animation>
                      <Tab.Pane eventKey="first">
                        <BasicInfo updateBasic={this.updateBasic} />
                      </Tab.Pane>
                      <Tab.Pane eventKey="second">
                        <UserSelector updateBasic={this.updateBasic} />
                      </Tab.Pane>
                      <Tab.Pane eventKey="third">
                        <Overview data={this.state.data} setEvent={this.setEvent} />
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
