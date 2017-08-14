import React from 'react';
import ReactDOM from 'react-dom';
import { Form, SchemaForm } from './Form';
import {fetchJson} from '../services/fetchit';
import {userService} from '../services/api';

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
	  'email': '',
	  'password': '',
	  'success': null
	}
  }

  handleSubmit = (e) => {
	e.preventDefault();
    console.log('Sending login credentials:');
	console.log('email: ' + this.state.email)
	console.log('password: ' + this.state.password)

    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

	userService.login(this.state.email, this.state.password)
	  .then(data => {
		  console.log('success');
		  console.log(data);
		  if(data.err) {
			this.setState({'success':false});
		  } else {
			//this.setState({'success':true});
			this.props.history.push('/app/dash');
		  }
	  })
	  .catch(e => {
        this.setState({'success':'server-error'})
      });
  }

  render() {

    return (
      <div>

        <div>email: {this.state.email}</div>
        <div>password: {this.state.password}</div>

		{ this.state.success === false && <div> wrong email / password </div> }
		{ this.state.success === true && <div> OK! </div> }
		{ this.state.success === 'server-error' && <div> Error! </div> }

        <Form onSubmit={this.handleSubmit} scope={this}>
          <input name="email" type="text" />
          <input name="password" type="text" />
		  <input type="submit" />
        </Form>

      </div>
    )
  }
}

export default Login;

