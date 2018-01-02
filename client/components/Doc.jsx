import React from 'react';
import ReactDOM from 'react-dom';
import styles from './documents.css';

class Doc extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

	let className = styles.document;
	if(this.props.pending) {
		className += ' ' + styles.pendingDocument;
	}

    return (
      <div className={className} >
      	<div>{this.props.title}</div>
      	<div>{this.props.body}</div>
      </div>
    );
  }
}

export default Doc;
