import { all, takeEvery, put, call } from 'redux-saga/effects';
import axios from 'axios';
// import { getToken } from '@iso/lib/helpers/utility';
import siteConfig from '@iso/config/site.config';
import notification from '@iso/components/Notification';
import moment from 'moment';
import actions from './actions';

const onCallReqeust = async (URI) =>
  await axios
    .get(URI)
    .then((res) => res)
    .catch((error) => error);
const onPostCallReqeust = async (sendData, URI) =>
  await axios
    .post(URI, sendData)
    .then((res) => res)
    .catch((error) => error);
const onPutCallReqeust = async (sendData, URI) =>
  await axios
    .put(URI, sendData)
    .then((res) => res)
    .catch((error) => error);
const onDeleteCallReqeust = async (URI) =>
  await axios
    .delete(URI)
    .then((res) => res)
    .catch((error) => error);

export function* getBusinessData() {
  axios.defaults.headers.get['Authorization'] = localStorage.getItem(
    'id_token'
  );
  try {
    const callResult = yield call(
      onCallReqeust,
      `${siteConfig.apiUrl}/businesses`
    );

    if (callResult.response != undefined) {
      notification('error', callResult.response.data.msg);
    } else {
      // notification("success", callResult.data.msg);
      let temp = [];
      callResult.data.data.map((value, index) => {
        value.key = parseInt(index) + 1;
        temp.push(value);
      });
      yield put({
        type: actions.GET_BUSINESSES_REDUCER,
        data: temp,
      });
    }
  } catch (error) {
    yield put({
      type: actions.GET_BUSINESSES_REDUCER,
      msg: 'Server Internal Error!',
    });
  }
}

export function* addBusinessData({ payload }) {
  axios.defaults.headers.post['Authorization'] = localStorage.getItem(
    'id_token'
  );
  try {
    const callResult = yield call(
      onPostCallReqeust,
      payload.sendData,
      `${siteConfig.apiUrl}/businesses`
    );

    if (callResult.response != undefined) {
      notification('error', callResult.response.data.msg);
    } else {
      notification('success', callResult.data.msg);
      yield put({
        type: actions.ADD_BUSINESSES_SUCCESS,
        data: callResult.data.data,
      });
    }
  } catch (error) {
    yield put({
      type: actions.ADD_BUSINESSES_SUCCESS,
      msg: 'Server Internal error!',
    });
  }
}

export function* getById({ payload }) {
  axios.defaults.headers.get['Authorization'] = localStorage.getItem(
    'id_token'
  );
  try {
    const callResult = yield call(
      onCallReqeust,
      `${siteConfig.apiUrl}/businesses/${payload.id}`
    );
    if (callResult.response != undefined) {
      notification('error', callResult.response.data.msg);
    } else {
      yield put({
        type: actions.GET_BUSINESSES_BY_ID_REDUCER,
        data: callResult.data.data,
      });
    }
  } catch (error) {
    yield put({
      type: actions.GET_BUSINESSES_BY_ID_REDUCER,
      msg: 'Server Internal Error!',
    });
  }
}

export function* updateData({ payload }) {
  axios.defaults.headers.put['Authorization'] = localStorage.getItem(
    'id_token'
  );
  try {
    const callResult = yield call(
      onPutCallReqeust,
      payload.sendData,
      `${siteConfig.apiUrl}/businesses/${payload.id}`
    );
    if (callResult.response != undefined) {
      notification('error', callResult.response.data.msg);
    } else {
      notification('success', callResult.data.msg);
    }
  } catch (error) {
    notification('error', 'Server Internal error!');
  }
}

export function* deleteData({ payload }) {
  axios.defaults.headers.delete['Authorization'] = localStorage.getItem(
    'id_token'
  );
  try {
    const callResult = yield call(
      onDeleteCallReqeust,
      `${siteConfig.apiUrl}/businesses/${payload.id}`
    );
    if (callResult.response != undefined) {
      notification('error', callResult.response.data.msg);
    } else {
      notification('success', callResult.data.msg);
      yield put({
        type: actions.DELETE_SUCCESS,
        msg: callResult.data.msg,
      });
    }
  } catch (error) {
    notification('error', 'Server Internal error!');
  }
}

export default function* rootSaga() {
  yield all([
    yield takeEvery(actions.ADD_BUSINESSES_DATA, addBusinessData),
    yield takeEvery(actions.GET_BUSINESSES_DATA, getBusinessData),
    yield takeEvery(actions.GET_BUSINESSES_BY_ID, getById),
    yield takeEvery(actions.DELETE_BUSINESSES, deleteData),
    yield takeEvery(actions.UPDATE_BUSINESSES, updateData),
  ]);
}
