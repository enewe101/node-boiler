import { delay } from 'redux-saga';
import { put, call, take, takeEvery, all } from 'redux-saga/effects';
import { documentService } from '../services/api';

function* helloSaga() {
  console.log('Hello Sagas!')
}


function* addDocAsync(){
	while(true) {
		const action = yield take('ADD_DOC_START');
		const confirmDoc = yield call(
			[documentService, documentService.create],
		   	action['document']
		);
		yield put({'type':'ADD_DOC_SUCCESS', 'document':confirmDoc});
	}
}

function* addDocAsyncMock(){
	while(true) {
		const action = yield take('ADD_DOC_START_MOCK');
		const confirmDoc = action['document'];
		yield call(delay, 1000);
		yield put({'type':'ADD_DOC_SUCCESS', 'document':confirmDoc});
	}
}

function* logAllEffects() {
	while(true) {
		let action = yield take('*');
		console.log(action);
	}
}

export default function* rootSaga() {
	yield all([
		addDocAsync(),
		logAllEffects(),
		addDocAsyncMock()
	]);
}
