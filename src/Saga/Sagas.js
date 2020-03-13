import { putData, LOAD_DATA } from "../Store/Actions";
import { takeEvery, put, call } from 'redux-saga/effects';


const fetchData = async () => {
    const response = await fetch('https://5dd1894f15bbc2001448d28e.mockapi.io/playlist');
    return await response.json();
}

function* workerLoadData() {
    const data = yield call(fetchData);
    yield put(putData(data));
}

export function* watchLoaddata() {
    yield takeEvery(LOAD_DATA, workerLoadData);
}
