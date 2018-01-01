import React from 'react';
import ReactDOM from 'react-dom';


class Instagram extends React.Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  instagramAuth = () => {
    window.location.href = "/auth/instagram/auth";
  }

  instagramLogout = () => {
	var img = document.createElement("img");
	img.src = "https://instagram.com/accounts/logout";
	img.style.visibility = 'hidden';
    document.body.appendChild(img);
  }

  render() {
    return (
      <div>
        <h1>Instagram Auth</h1>
		<p>
		  To enable Instagram integration, obtain credentials and place them
		  in .keys.dev, and source that file before rebuilding the docker from 
		  scratch.
		</p>
        <ul>
          <li>
            <button onClick={this.instagramAuth}>
              login
            </button>
          </li>
          <li>
            <button onClick={this.instagramLogout}>
              logout
            </button>
          </li>
        </ul>
      </div>
    )
  }

}



export default Instagram;
