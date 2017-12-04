import React from 'react';
import ReactDOM from 'react-dom';

class Nav extends React.Component {

  constructor(props) {
    super(props);
  }

  handleClickLogin = (e) => {this.props.history.push('/app/login');}
  handleClickSignup = (e) => {this.props.history.push('/app/signup');}
  handleClickDocs = (e) => {this.props.history.push('/app/documents');}
  handleClickFacebook = (e) => {this.props.history.push('/app/facebook');}
  handleClickTwitter = (e) => {this.props.history.push('/app/twitter');}
  handleClickInstagram = (e) => {this.props.history.push('/app/instagram');}

  render() {
    return (
      <div>
		<button onClick={this.handleClickLogin}>login</button>
		<button onClick={this.handleClickSignup}>signup</button>
		<button onClick={this.handleClickDocs}>documents</button>
		<button onClick={this.handleClickTwitter}>Twitter</button>
		<button onClick={this.handleClickFacebook}>Facebook</button>
		<button onClick={this.handleClickInstagram}>Instagram</button>
      </div>
    )
  }
}

export default Nav;

