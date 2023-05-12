import { all, takeEvery, put, call } from 'redux-saga/effects';
import axios from 'axios';
// import { getToken } from '@iso/lib/helpers/utility';
import siteConfig from '@iso/config/site.config';
import notification from '@iso/components/Notification';
import moment from 'moment';
import actions from './actions';

const priority = {
  1: 'Hightest',
  2: 'High',
  3: 'Medium',
  4: 'Low',
  5: 'Lowest',
};
const workorderStatus_array = {
  2: 'Requested',
  3: 'Assigned',
  4: 'Open',
  5: 'Work In Progress',
  6: 'On Hold',
  7: 'Closed, Completed',
  8: 'Draft',
  9: 'Closed, Incomplete',
  10: 'Other',
};
const maintanceType_array = {
  1: 'Preventive',
  2: 'Damage',
  3: 'Corrective',
  4: 'Safety',
  5: 'Upgrade',
  6: 'Electrical',
  7: 'Project',
  8: 'Inspection',
  9: 'Meter_Reading',
  10: 'Other',
};
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

export function* add({ payload }) {
  axios.defaults.headers.post['Authorization'] = localStorage.getItem(
    'id_token'
  );
  try {
    const callResult = yield call(
      onPostCallReqeust,
      payload.sendData,
      `${siteConfig.apiUrl}/workorderbusiness`
    );

    if (callResult.response != undefined) {
      notification('error', callResult.response.data.msg);
    } else {
      notification('success', callResult.data.msg);
      yield put({
        type: actions.GET_WORKORDER_BUSINESSES,
        payload: { workOrderId: payload.sendData.intWorkOrderID },
      });
    }
  } catch (error) {
    yield put({ type: actions.ADD_FAILED, msg: 'Server Internal error!' });
  }
}
export function* getDatas({ payload }) {
  axios.defaults.headers.get['Authorization'] = localStorage.getItem(
    'id_token'
  );
  try {
    const callResult = yield call(
      onCallReqeust,
      `${siteConfig.apiUrl}/workorderbusiness/${payload.workOrderId}`
    );

    if (callResult.response != undefined) {
      // notification('error',callResult.response.data.msg);
    } else {
      yield put({
        type: actions.GET_WORKORDER_BUSINESSES_REDUCER,
        data: callResult.data.data,
        msg: null,
      });
    }
  } catch (error) {
    notification('error', 'Internal server error!');
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
      `${siteConfig.apiUrl}/workorderbusiness/${payload.id}`
    );

    if (callResult.response != undefined) {
      notification('error', callResult.response.data.msg);
    } else {
      notification('success', callResult.data.msg);
      yield put({
        type: actions.GET_WORKORDER_BUSINESSES,
        payload: { workOrderId: payload.sendData.intWorkOrderID },
      });
    }
  } catch (error) {
    notification('success', 'Server Internal error!');
  }
}

export function* deleteData({ payload }) {
  axios.defaults.headers.delete['Authorization'] = localStorage.getItem(
    'id_token'
  );
  try {
    const callResult = yield call(
      onDeleteCallReqeust,
      `${siteConfig.apiUrl}/workorderbusiness/${payload.id}`
    );
    if (callResult.response != undefined) {
      notification('error', callResult.response.data.msg);
    } else {
      notification('success', callResult.data.msg);
      yield put({
        type: actions.DELETE_WORKORDER_BUSINESSES_SUCCESS,
      });
    }
  } catch (error) {
    notification('error', 'Server Internal error!');
  }
}

export default function* rootSaga() {
  yield all([
    yield takeEvery(actions.ADD_WORKORDER_BUSINESS, add),
    yield takeEvery(actions.GET_WORKORDER_BUSINESSES, getDatas),
    yield takeEvery(actions.UPDATE_WORKORDER_BUSINESS, updateData),
    yield takeEvery(actions.DELETE_WORKORDER_BUSINESSES, deleteData),
  ]);
}
