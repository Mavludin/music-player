import { putData, LOAD_DATA } from "../store/Actions";
import { takeEvery, put, call } from 'redux-saga/effects';


const fetchData = async () => {
    const response = await fetch('https://5dd1894f15bbc2001448d28e.mockapi.io/playlist');
    const json = await response.json();
    return json.slice(0,-1)
}

function* workerLoadData() {
    const data = yield call(fetchData);
    yield put(putData(data));
}

export function* watchLoaddata() {
    yield takeEvery(LOAD_DATA, workerLoadData);
}