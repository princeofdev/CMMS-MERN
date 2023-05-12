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
export function* getBillingTerms() {
  axios.defaults.headers.get['Authorization'] = localStorage.getItem(
    'id_token'
  );
  try {
    const callResult = yield call(
      onCallReqeust,
      `${siteConfig.apiUrl}/billingterm`
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
        type: actions.GET_BILLING_TERMS_REDUCER,
        data: temp, //createDemoData(),
      });
    }
  } catch (error) {
    notification('error', 'Internal server error!');
  }
}
export function* getProjectById({ payload }) {
  axios.defaults.headers.get['Authorization'] = localStorage.getItem(
    'id_token'
  );
  try {
    const callResult = yield call(
      onCallReqeust,
      `${siteConfig.apiUrl}/billingterm/${payload.id}`
    );

    if (callResult.response != undefined) {
      notification('error', callResult.response.data.msg);
    } else {
      yield put({
        type: actions.GET_PROJECT_BY_ID_REDUCER,
        project: callResult.data.data,
        msg: null,
      });
    }
  } catch (error) {
    notification('error', 'Internal server error!');
  }
}
export function* addBillingTerms({ payload }) {
  axios.defaults.headers.post['Authorization'] = localStorage.getItem(
    'id_token'
  );
  try {
    const callResult = yield call(
      onPostCallReqeust,
      payload.sendData,
      `${siteConfig.apiUrl}/billingterm`
    );

    if (callResult.response != undefined) {
      notification('error', callResult.response.data.msg);
    } else {
      notification('success', callResult.data.msg);
      yield put({
        type: actions.GET_BILLING_TERMS,
        msg: callResult.data.msg,
      });
    }
  } catch (error) {
    yield put({ type: actions.ADD_FAILED, msg: 'Server Internal error!' });
  }
}
export function* updateProjectData({ payload }) {
  axios.defaults.headers.put['Authorization'] = localStorage.getItem(
    'id_token'
  );
  try {
    const callResult = yield call(
      onPutCallReqeust,
      payload.sendData,
      `${siteConfig.apiUrl}/project/${payload.id}`
    );

    if (callResult.response != undefined) {
      notification('error', callResult.response.data.msg);
    } else {
      notification('success', callResult.data.msg);
      yield put({
        type: actions.UPDATE_SUCCESS,
      });
    }
  } catch (error) {
    notification('success', 'Server Internal error!');
  }
}

export function* deleteProject({ payload }) {
  axios.defaults.headers.delete['Authorization'] = localStorage.getItem(
    'id_token'
  );
  try {
    const callResult = yield call(
      onDeleteCallReqeust,
      `${siteConfig.apiUrl}/project/${payload.id}`
    );
    if (callResult.response != undefined) {
      notification('error', callResult.response.data.msg);
    } else {
      notification('success', callResult.data.msg);
      yield put({
        type: actions.GET_PROJECTS,
      });
    }
  } catch (error) {
    notification('error', 'Server Internal error!');
  }
}

export default function* rootSaga() {
  yield all([
    yield takeEvery(actions.GET_BILLING_TERMS, getBillingTerms),
    yield takeEvery(actions.ADD_BILLING_TERM, addBillingTerms),
  ]);
}
