import { putData, LOAD_DATA } from "../Store/Actions";
import { takeEvery, put, call } from 'redux-saga/effects';


const fetchData = () => {
    return fetch('https://5dd1894f15bbc2001448d28e.mockapi.io/playlist')
        .then(response => response.json());
}

function* workerLoadData() {
    const data = yield call(fetchData);
    yield put(putData(data));
}

export function* watchLoaddata() {
    yield takeEvery(LOAD_DATA, workerLoadData);
}
