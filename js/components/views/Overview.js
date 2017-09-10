import React from 'react';
import ReactDOM from 'react-dom';
import { PageHeader, Button } from 'react-bootstrap';
import bootstrap from 'bootstrap';
import AlertPanel from '../alerts/Alert.js';
import moment from 'moment';

class Overview extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    console.log(this.props.data)
    if( this.props.data == undefined) return(<AlertPanel glyph="info-sign" type="info" text="You haven't filled all the spots yet." />)
    if(this.props.data != undefined) {
      if(Object.keys(this.props.data).length < 9) {
        return(<AlertPanel glyph="info-sign" type="info" text="You haven't filled all the spots yet." />)
      }
    }
    return(
      <div>
        <PageHeader>{this.props.data.name} <small>{moment(this.props.data.starts).format('MMMM Do YYYY') + " - " + moment(this.props.data.ends).format('MMMM Do YYYY')}</small></PageHeader>
        Time: {moment(this.props.data.starts).format('HH:mm') + "-" + moment(this.props.data.ends).format('HH:mm')}
        <br/>
        Closes: {moment(this.props.data.closes).format('DD/MM/YYYY HH:mm')}
        <br/>
        Location: {this.props.data.location}
        <br/>
        Type: {this.props.data.type}
        <br/>
        <Button onClick={this.props.setEvent} bsStyle="success"> Save </Button>
      </div>
    )
  }
}

export default Overview;
