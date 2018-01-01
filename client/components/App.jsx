import React from 'react';
import ReactDOM from 'react-dom';
import Nav from './Nav.jsx';

class App extends React.Component {
  render() {
    return (
	  <div>
	    <Nav history={this.props.history} />
		{this.props.children}
      </div>
    )
  }
}

export default App;

