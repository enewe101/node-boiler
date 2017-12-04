import React from 'react';
import ReactDOM from 'react-dom';
import Nav from './Nav.jsx';

class Welcome extends React.Component {
  render() {
    return (
	  <div>
	    <Nav history={this.props.history} />
        <h1>It works!</h1>
      </div>
    )
  }
}

export default Welcome;


