import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, HashRouter, Switch } from 'react-router-dom';

class Layout extends React.Component {
  render() {
    return(
      <div className="container">
        <h1 style={{border: 'solid'}}>THIS IS THE WIDGET</h1>
      </div>
    )
  }
}

export default Layout;
