import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';

class Nav extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
		<Link to="/app/login"><button>login</button></Link>
		<Link to="/app/signup"><button>signup</button></Link>
		<Link to="/app/documents"><button>documents</button></Link>
		<Link to="/app/twitter"><button>Twitter</button></Link>
		<Link to="/app/facebook"><button>Facebook</button></Link>
		<Link to="/app/instagram"><button>Instagram</button></Link>
      </div>
    )
  }
}

export default Nav;

