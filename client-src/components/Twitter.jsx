import React from 'react';
import ReactDOM from 'react-dom';
import fetchit from '../services/fetchit'
import Nav from './Nav.jsx'


class Twitter extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      getResponse: '',
      postResponse: '',
      newTodoText: '',
    }
  }

  handleUserStatusChange = response => {
    console.log('receiving user status change:');
    console.log(response);
    this.setState({fbUser:response});
  }

  twitterReauth = () => {
    window.location.href = "/auth/twitter-reauth";
  }

  twitterVerifyCredentials = () => {
    fetchit('/auth/twitter/verify')
      .then(response => response.json())
      .then(json => console.log(json));
  }

  render() {
    return (
      <div>
	    <Nav history={this.props.history} />
        <h1>Twitter Integration Test</h1>
		<p>
		  To enable twitter integration obtain credentials and
		  place them in .keys.dev, and source that file before rebuilding the
		  docker from scratch.
		</p>
        <ul>
          <li>
            <a href="/auth/twitter/auth">
              <img src="/static/sign-in-with-twitter-gray.png" />
            </a>
          </li>
          <li>
            <button onClick={this.twitterReauth}>
              associate another twitter account
            </button>
          </li>
          <li>
            <button onClick={this.twitterVerifyCredentials}>
              verify credentials
            </button>
          </li>
        </ul>
      </div>
    )
  }

}

export default Twitter;
