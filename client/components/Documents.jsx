import React from 'react';
import ReactDOM from 'react-dom';
import {documentService} from '../services/api';
import { Form, SchemaForm } from './Form';
import Doc from './Doc.jsx';
import fetchit from '../services/fetchit';
import styles from './documents.css';
import { connect } from 'react-redux';
import actions from '../actions';

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
	  this.props.createDocument(this.state.document);
  }

  render() {

	let documents = this.props.documents.map((doc, i) => {
	  return <Doc {...doc} key={i} />;
	});

	let pendingDocuments = this.props.pendingDocuments.map((doc, i) => {
	  return <Doc pending={true} {...doc} key={i} />;
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
		{pendingDocuments}

      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
	return {
		'documents': state.documents,
		'pendingDocuments': state.pendingDocuments
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		createDocument: doc => {
			return dispatch({'type':actions.ADD_DOC_START_MOCK, 'document':doc})
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Documents);
