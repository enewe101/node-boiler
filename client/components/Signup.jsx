import React from 'react';
import ReactDOM from 'react-dom';
import { Form, SchemaForm } from './Form';
import {userService} from '../services/api';

class Signup extends React.Component {

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

	userService.signup(this.state.email, this.state.password)
	  .then(data => {
		  console.log(data)
		  if(data.err) { 
			  this.setState({'success':false});
		  } else {
			  this.setState({'success':true});
		  }
	  })
	  .catch(e => console.log(e));
  }

  render() {

    return (
      <div>
		<h1>Signup</h1>
        <div>email: {this.state.email}</div>
        <div>password: {this.state.password}</div>
		{ this.state.success === false && <div>email taken</div> }
		{ this.state.success === true && <div>OK!</div> }
        <Form onSubmit={this.handleSubmit} scope={this}>
          <input name="email" type="text" />
          <input name="password" type="text" />
		  <input type="submit" />
        </Form>
      </div>
    )
  }
}

export default Signup;

