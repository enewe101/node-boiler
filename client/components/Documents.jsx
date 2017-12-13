import React from 'react';
import ReactDOM from 'react-dom';
import {documentService} from '../services/api';
import { Form, SchemaForm } from './Form';
import fetchit from '../services/fetchit';
import Nav from './Nav.jsx';
import styles from './documents.css';

class Documents extends React.Component {

  constructor(props) {
    super(props);

    let blankDocument = {
	  platformId: '',   // Id for doc on original platform
	  text: '',       
	  title: '',
	  platform: '',
	  publishedAt: '',    // When doc was published on original platform
	  createdAt: '', // When doc was added to this app
	  author: '', // Reference to author by platform Id
	  hearts: '',       // favourites, likes
	  shares: '',       // shares, retweets
	  score: '',        // karma
	  replies: [],  // replies, by platform Id
	  inReplyTo: '',  // parent's platform Id (if reply)
	};

    this.state = {
      'deeper':{'document':blankDocument, 'test':'yo'},
      'documents': []
    }
  }

  getDocuments = () => {
    documentService.find({})
	  .then(json => {
		this.setState((prevState, props) => {
		  return {'documents':json};
		});
	  })
	  .catch(e => {
		console.log(e.message);
	  })
  }

  postDoc = (e) => {
    e.preventDefault();
    console.log('sending document');
    console.log(this.state.deeper.document);
    documentService.create(this.state.deeper.document);
  }

  render() {

	let documents = this.state.documents.map((doc, i) => {
	  return (
        <div className={styles.document} key={i}>
			Document
			<div>{doc.platformId}</div>
			<div>{doc.text}</div>
			<div>{doc.title}</div>
			<div>{doc.platform}</div>
			<div>{doc.publishedAt}</div>
			<div>{doc.createdAt}</div>
			<div>{doc.author}</div>
			<div>{doc.shares}</div>
			<div>{doc.score}</div>
			<div>{doc.replies}</div>
			<div>{doc.inReplyTo}</div>
        </div>
      );
	});

    return (
      <div>
	    <Nav history={this.props.history} />
        <h1>Documents</h1>

        <ul>
          <li>
            <button onClick={this.getDocuments}>
              get documents
            </button>
          </li>
        </ul>

        <Form path="deeper.document" scope={this}>
          <input name="text" type="text" />
        </Form>

        <SchemaForm key="" path="deeper.document" scope={this} 
          schema={this.state.deeper.document}>
          <input type="submit" onClick={this.postDoc} />
        </SchemaForm>

		{documents}

      </div>
    )
  }

}


export default Documents;
