import { combineReducers } from 'redux';
import { documentReducer, pendingDocumentReducer } from './documentReducers';

export default combineReducers({
	'documents': documentReducer,
	'pendingDocuments': pendingDocumentReducer
});
