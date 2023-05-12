import { all, takeEvery, put, call } from 'redux-saga/effects';
import axios from 'axios';
// import { getToken } from '@iso/lib/helpers/utility';
import siteConfig from '@iso/config/site.config';
import notification from '@iso/components/Notification';
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
export function* getFormDatas() {
  axios.defaults.headers.get['Authorization'] = localStorage.getItem(
    'id_token'
  );
  try {
    const callResult = yield call(
      onCallReqeust,
      `${siteConfig.apiUrl}/formbuilder`
    );

    if (callResult.response != undefined) {
      notification('error', callResult.response.data.msg);
    } else {
      var temp = [];
      callResult.data.data.map((value, index) => {
        value.key = parseInt(index) + 1;
        temp.push(value);
      });

      yield put({
        type: actions.GET_FORM_DATAS_REDUCER,
        data: temp, //createDemoData(),
      });
    }
  } catch (error) {
    notification('error', 'Internal server error!');
  }
}
export function* getFormDataById({ payload }) {
  axios.defaults.headers.get['Authorization'] = localStorage.getItem(
    'id_token'
  );
  try {
    const callResult = yield call(
      onCallReqeust,
      `${siteConfig.apiUrl}/formbuilder/${payload.id}`
    );

    if (callResult.response != undefined) {
      notification('error', callResult.response.data.msg);
    } else {
      yield put({
        type: actions.GET_FORM_DATA_BY_ID_REDUCER,
        formdata: callResult.data.data,
        msg: null,
      });
    }
  } catch (error) {
    notification('error', 'Internal server error!');
  }
}
export function* addFormBuilder({ payload }) {
  axios.defaults.headers.post['Authorization'] = localStorage.getItem(
    'id_token'
  );
  try {
    const callResult = yield call(
      onPostCallReqeust,
      payload.sendData,
      `${siteConfig.apiUrl}/formbuilder`
    );

    if (callResult.response != undefined) {
      notification('error', callResult.response.data.msg);
    } else {
      notification('success', callResult.data.msg);
      yield put({
        type: actions.GET_FORM_DATAS,
      });
    }
  } catch (error) {
    yield put({ type: actions.ADD_FAILED, msg: 'Server Internal error!' });
  }
}
export function* updateFormData({ payload }) {
  axios.defaults.headers.put['Authorization'] = localStorage.getItem(
    'id_token'
  );
  try {
    const callResult = yield call(
      onPutCallReqeust,
      payload.sendData,
      `${siteConfig.apiUrl}/formbuilder/${payload.id}`
    );

    if (callResult.response != undefined) {
      notification('error', callResult.response.data.msg);
    } else {
      notification('success', callResult.data.msg);
      // yield put({
      //   type: actions.UPDATE_SUCCESS
      // });
    }
  } catch (error) {
    notification('success', 'Server Internal error!');
  }
}

export function* deleteFormData({ payload }) {
  axios.defaults.headers.delete['Authorization'] = localStorage.getItem(
    'id_token'
  );
  try {
    const callResult = yield call(
      onDeleteCallReqeust,
      `${siteConfig.apiUrl}/formbuilder/${payload.id}`
    );
    if (callResult.response != undefined) {
      notification('error', callResult.response.data.msg);
    } else {
      notification('success', callResult.data.msg);
      yield put({
        type: actions.DELETE_FORM_DATA_REDUCER,
      });
    }
  } catch (error) {
    notification('error', 'Server Internal error!');
  }
}

export default function* rootSaga() {
  yield all([
    yield takeEvery(actions.GET_FORM_DATAS, getFormDatas),
    yield takeEvery(actions.ADD_FORM_BUILDER, addFormBuilder),
    yield takeEvery(actions.GET_FORM_DATA_BY_ID, getFormDataById),
    yield takeEvery(actions.UPDATE_FORM_DATA, updateFormData),
    yield takeEvery(actions.DELETE_FORM_DATA, deleteFormData),
  ]);
}
