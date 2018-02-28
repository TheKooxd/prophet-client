import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import { PageHeader, Button } from 'react-bootstrap';
import bootstrap from 'bootstrap';
import AlertPanel from '../../../alerts/Alert.js';
import moment from 'moment';

class GenerateUsers extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    this.props.data.names = this.props.data.names.map(function(val){
      if(val !== "") return val;
    })
    this.props.data.names = _.compact(this.props.data.names)
    console.log(this.props.data)
    if(this.props.data == undefined || this.props.data.names.length == 0) return(<AlertPanel glyph="info-sign" type="info" text="You haven't filled all the spots yet." />)
    if(this.props.data != undefined) {
      if(Object.keys(this.props.data).length < this.props.fillSpots) {
        return(<AlertPanel glyph="info-sign" type="info" text="You haven't filled all the spots yet." />)
      }
    }
    return(
      <div>
        <PageHeader>Group overview {this.props.data.groupId} </PageHeader>
        Number of users: {this.props.data.names.length}
        <br/>
        User role: {this.props.data.role}
        <br/>
        {this.props.isGenerating == "done" ? (
          <AlertPanel type="success" text="Group generated succesfully, check the next tab for login cards!" glyph="ok-sign" />
        ) : (
        <Button
          bsStyle="warning"
          disabled={this.props.isGenerating}
          onClick={!this.props.isGenerating ? this.props.generateUsers : null}>
          {this.props.isGenerating ? 'Generating...' : 'Generate Group'}
        </Button>
        )}
      </div>
    )
  }
}

export default GenerateUsers;
