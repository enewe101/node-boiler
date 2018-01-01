import React from 'react';
import ReactDOM from 'react-dom';
import {documentService} from '../services/api';
import { Form, SchemaForm } from './Form';
import fetchit from '../services/fetchit';
import styles from './documents.css';
import { connect } from 'react-redux';
import * as documentActions from '../actions/documentActions';


class Documents extends React.Component {

  constructor(props) {
    super(props);

    let blankDocument = {
	  title: '',
	  body: ''
	};

    this.state = {
      'document': blankDocument,
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

  handleSubmit = e => {
	  e.preventDefault();
	  console.log(JSON.stringify(this.state));
	  console.log(JSON.stringify(this.props));
	  this.props.createDocument(this.state.document);
  //  documentService.create(this.state.deeper.document);
  }

  render() {

	let documents = this.props.documents.map((doc, i) => {
	  return (
        <div className={styles.document} key={i}>
			Document
			<div>{doc.title}</div>
			<div>{doc.body}</div>
        </div>
      );
	});

    return (
      <div>
        <h1>Documents</h1>

        <ul>
          <li>
            <button onClick={this.getDocuments}>
              get documents
            </button>
          </li>
        </ul>

		{/*<Form onSubmit={this.handleSubmit} path="document" scope={this}>
          <input name="title" type="text" />
		  <input name="body" type="text" />
		  <input type="submit" />
        </Form>*/}

		<SchemaForm onSubmit={this.handleSubmit} key="" path="document" 
		  scope={this} schema={this.state.document} >
          <input type="submit"/>
        </SchemaForm>

		{documents}

      </div>
    )
  }

}

const mapStateToProps = (state, ownProps) => {
	return {'documents': state.documents}
}

const mapDispatchToProps = (dispatch) => {
	return {
		createDocument: doc => dispatch(documentActions.createDocument(doc))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Documents);
