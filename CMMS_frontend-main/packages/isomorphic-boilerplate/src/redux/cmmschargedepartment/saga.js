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
export function* getChargeDepartment() {
  axios.defaults.headers.get['Authorization'] = localStorage.getItem(
    'id_token'
  );
  try {
    const callResult = yield call(
      onCallReqeust,
      `${siteConfig.apiUrl}/settingchargedepartment`
    );

    if (callResult.response != undefined) {
      notification('error', callResult.response.data.msg);
    } else {
      var temp = [];
      callResult.data.data.map((value, index) => {
        value.key = value._id;
        temp.push(value);
      });

      yield put({
        type: actions.GET_CHARGEDEPARTMENT_SETTING_REDUCER,
        chargedepartments: temp, //createDemoData(),
      });
    }
  } catch (error) {
    notification('error', 'Internal server error!');
  }
}

export function* addChargeDepartment({ payload }) {
  axios.defaults.headers.post['Authorization'] = localStorage.getItem(
    'id_token'
  );
  try {
    const callResult = yield call(
      onPostCallReqeust,
      payload.sendData,
      `${siteConfig.apiUrl}/settingchargedepartment`
    );

    if (callResult.response != undefined) {
      notification('error', callResult.response.data.msg);
    } else {
      notification('success', callResult.data.msg);
      yield put({
        type: actions.GET_CMMS_SETTING_CHARGEDEPARTMENT,
        msg: callResult.data.msg,
      });
    }
  } catch (error) {
    yield put({ type: actions.ADD_FAILED, msg: 'Server Internal error!' });
  }
}

export function* deleteChargeDepartment({ payload }) {
  axios.defaults.headers.delete['Authorization'] = localStorage.getItem(
    'id_token'
  );
  try {
    const callResult = yield call(
      onDeleteCallReqeust,
      `${siteConfig.apiUrl}/settingchargedepartment/${payload.id}`
    );
    if (callResult.response != undefined) {
      notification('error', callResult.response.data.msg);
    } else {
      notification('success', callResult.data.msg);
      yield put({
        type: actions.DELETE_CHARGEDEPARTMENT_SETTING,
        msg: callResult.data.msg,
      });
    }
  } catch (error) {
    // notification("error", "Server Internal error!");
  }
}

export default function* rootSaga() {
  yield all([
    yield takeEvery(actions.GET_CHARGEDEPARTMENT_SETTING, getChargeDepartment),
    yield takeEvery(
      actions.ADD_CMMS_SETTING_CHARGEDEPARTMENT,
      addChargeDepartment
    ),
    yield takeEvery(
      actions.DELETE_CHARGEDEPARTMENT_SETTING,
      deleteChargeDepartment
    ),
  ]);
}
