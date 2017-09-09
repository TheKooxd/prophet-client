import React from 'react';
import ReactDOM from 'react-dom';
import bootstrap from 'bootstrap';
import { Label } from 'react-bootstrap';
import Loading from 'react-loading';

class UserBadge extends React.Component {
 render() {
   if(!this.props.name || !this.props.role) return <Loading type={"spin"} color={"grey"} height='2' width='20' />
   return(
     <div className="text-center" style={{display: 'inline'}}>
     {this.props.onlyBadge !== true &&
       <span>
        Signed in as: <b> {this.props.name + " "} </b>
       </span>
      }
       {this.props.role == "admin" &&
         <Label bsStyle="warning">ADMIN</Label>
       }
       {this.props.role == "EVI" &&
         <Label bsStyle="primary">Leiriläinen</Label>
       }
       {this.props.role == "innostaja" &&
         <Label bsStyle="info">Innostaja</Label>
       }
     </div>
  )
}
}

export default UserBadge;
