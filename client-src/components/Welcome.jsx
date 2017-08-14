import React from 'react';
import ReactDOM from 'react-dom';

class Welcome extends React.Component {

  constructor(props) {
    super(props);
  }

  handleClickLogin = (e) => {
	  console.log('Login!');
	  this.props.history.push('/app/login');
  }

  handleClickSignup = (e) => {
	  console.log('Signup!');
	  this.props.history.push('/app/signup');
  }

  render() {

    return (
      <div>
		<button onClick={this.handleClickLogin}>login</button>
		<button onClick={this.handleClickSignup}>signup</button>
      </div>
    )
  }
}

export default Welcome;


