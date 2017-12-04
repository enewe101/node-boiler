import React from 'react';
import ReactDOM from 'react-dom';
let facebookUserStatusService = {getUserStatus: function(){}};
import Nav from './Nav.jsx'
//import facebookUserStatusService from '../services/facebookUserStatusService';


class Facebook extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      fbUser: {'authenticated':false}
    }
    facebookUserStatusService.getUserStatus(this.handleUserStatusChange);
  }

  handleUserStatusChange = response => {
    console.log('receiving user status change:');
    console.log(response);
    this.setState({fbUser:response});
  }

  fbLogout = () => {
    facebookUserStatusService.logout(this.handleUserStatusChange);
  }

  fbLogin = () => {
    facebookUserStatusService.login(this.handleUserStatusChange);
  }

  fbCheckStatus = () => {
    facebookUserStatusService._refreshUserStatus();
    facebookUserStatusService.getUserStatus(
        this.handleUserStatusChange, true, false);
  }

  fbRevoke = () => {
    facebookUserStatusService.revoke(this.handleUserStatusChange);
  }

  render() {

    let fbLoginStatus;
    if(this.state.fbUser.authenticated) {
      fbLoginStatus = 'Logged in: ' + this.state.fbUser.userId;
    } else {
      fbLoginStatus = 'Not logged in';
    }

    return (
      <div>
	    <Nav history={this.props.history} />
        <h1>Facebook Integration Test</h1>
		<p>
		  To enable Facebook integration:
		</p>
		<ol>
		  <li>
		    Uncomment the line "import facebookUserStatusService...",
			and delete the line "let facebookUserStatusService..." just above 
			it, in client-src/components/Facebook.jsx
          </li>
		  <li>
		    Obtain facebook app credentials and place them in .keys.dev, and 
		    source that file before rebuilding the docker from scratch.
          </li>
		</ol>
        <ul>
          <li>
            {fbLoginStatus}
          </li>
          <li>
            <button onClick={this.fbLogin}>login fb</button>
          </li>
          <li>
            <button onClick={this.fbLogout}>logout fb</button>
          </li>
          <li>
            <button onClick={this.fbRevoke}>revoke fb</button>
          </li>
          <li>
            <button onClick={this.fbCheckStatus}>check status</button>
          </li>
        </ul>
      </div>
    )
  }

}


export default Facebook;
