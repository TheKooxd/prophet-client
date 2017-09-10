import React from 'react';
import ReactDOM from 'react-dom';
import bootstrap from 'bootstrap';
import {RingLoader} from 'halogen';

class Loading extends React.Component {

 render() {
   return(
     <div>
	   <div className="col-md-5"></div>
		<div className="col-md-2">
		  <div style={{width: "100px"}}>
		    <RingLoader color="grey" size="100px"/>
		  </div>
	    </div>
      <div className="col-md-5"></div>
    </div>
  )
}
}

export default Loading;
