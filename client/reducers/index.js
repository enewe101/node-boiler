import { combineReducers } from 'redux';
import documents from './documentReducers';

export default combineReducers({
	'documents': documents
});
