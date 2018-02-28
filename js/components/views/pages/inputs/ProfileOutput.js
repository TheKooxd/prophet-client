import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from "react-router";
import _ from 'lodash';
import { PageHeader, Button } from 'react-bootstrap';
import bootstrap from 'bootstrap';
import AlertPanel from '../../../alerts/Alert.js';
import moment from 'moment';
import fileDownload from 'react-file-download';

class GenerateUsers extends React.Component {

  constructor(props) {
    super(props)
    this.convertArrayOfObjectsToCSV = this.convertArrayOfObjectsToCSV.bind(this)
    this.downloadCSV = this.downloadCSV.bind(this)
  }

  convertArrayOfObjectsToCSV(args) {  
    var result, ctr, keys, columnDelimiter, lineDelimiter, data;

    data = args.data || null;
    if (data == null || !data.length) {
        return null;
    }

    columnDelimiter = args.columnDelimiter || ',';
    lineDelimiter = args.lineDelimiter || '\n';

    keys = Object.keys(data[0]);

    result = '';
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    data.forEach(function(item) {
        ctr = 0;
        keys.forEach(function(key) {
            if (ctr > 0) result += columnDelimiter;

            result += item[key];
            ctr++;
        });
        result += lineDelimiter;
    });

    return result;
}

  downloadCSV(args) {  
    console.log("pöö")
    var data, filename, link;
    var csv = this.convertArrayOfObjectsToCSV({
        data: this.props.data.profiles
    });
    if (csv == null) return;
    fileDownload(csv, 'ProphetGroup' +this.props.data.groupId + '.csv');
  }

  render() {
    if(this.props.data.profiles == undefined) return(<AlertPanel glyph="info-sign" type="info" text="You need to generate the profiles first." />)
    return(
      <div>
        <PageHeader> Login info for group {this.props.data.groupId} </PageHeader>
        <div className="col-md-12">
          <AlertPanel type="danger" text="These passwords are random generated and they will be changed during first login. Do not loose them!" glyph="exclamation-sign"/>
        </div>
        <div className="row">
        {this.props.data.profiles.map(function(profile, index){
          return (
            <div className="col-md-4 panel panel-default">
              <h3>{profile.name}</h3>
              ID: {profile.loginId}
              <br/>
              Password: {profile.pass}
            </div>
            )
        }.bind(this))}
        </div>
        <div className="row">
          <div className="col-md-3">
            <Link to="users"><Button bsStyle="info"> Back to user index page </Button></Link>
          </div>
          <div className="col-md-3">
            <Button bsStyle="info" onClick={this.downloadCSV}> Download as CSV-file (Excel) </Button>
          </div>
        </div>
      </div>
    )
  }
}

export default GenerateUsers;
