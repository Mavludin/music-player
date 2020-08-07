import { putData, LOAD_DATA } from "../store/Actions";
import { takeEvery, put, call } from 'redux-saga/effects';


const fetchData = async () => {
    const response = await fetch('https://5f2c235dffc88500167b8b50.mockapi.io/playlist');
    const json = await response.json();
    return json.slice(0,-1)
}

function* workerLoadData() {
    const data = yield call(fetchData);
    yield put(putData(data));
}

export function* watchLoadData() {
    yield takeEvery(LOAD_DATA, workerLoadData);
}