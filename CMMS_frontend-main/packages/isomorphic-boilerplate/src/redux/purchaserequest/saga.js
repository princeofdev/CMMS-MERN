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
export function* getPurchaserRequest() {
  axios.defaults.headers.get['Authorization'] = localStorage.getItem(
    'id_token'
  );
  try {
    const callResult = yield call(
      onCallReqeust,
      `${siteConfig.apiUrl}/purchaseorderlineitem`
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
        type: actions.GET_PURCHASE_REQUEST_REDUCER,
        data: temp, //createDemoData(),
      });
    }
  } catch (error) {
    notification('error', 'Internal server error!');
  }
}

export function* getPurchaseBoard() {
  axios.defaults.headers.get['Authorization'] = localStorage.getItem(
    'id_token'
  );
  try {
    const callResult = yield call(
      onCallReqeust,
      `${siteConfig.apiUrl}/purchaseorderlineitem`
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
        type: actions.GET_PURCHASE_PLAN_BOARD_REDUCER,
        data: temp, //createDemoData(),
      });
    }
  } catch (error) {
    notification('error', 'Internal server error!');
  }
}
export function* getPurchaseLineItem({ payload }) {
  axios.defaults.headers.get['Authorization'] = localStorage.getItem(
    'id_token'
  );
  try {
    const callResult = yield call(
      onCallReqeust,
      `${siteConfig.apiUrl}/purchaseorderlineitem/poid/${payload.id}`
    );

    if (callResult.response != undefined) {
      notification('error', callResult.response.data.msg);
    } else {
      // var temp = [];
      // callResult.data.data.map((value, index) => {
      //   value.key = parseInt(index) + 1;
      //   temp.push(value);
      // });
      console.log(callResult.data.data,'callResult.data.data');
      yield put({
        type: actions.GET_PURCHASE_LINEITEM_REDUCER,
        data: callResult.data.data, //createDemoData(),
      });
    }
  } catch (error) {
    notification('error', 'Internal server error!');
  }
}
export function* getDataFromBoard() {
  axios.defaults.headers.get['Authorization'] = localStorage.getItem(
    'id_token'
  );
  try {
    const callResult = yield call(
      onCallReqeust,
      `${siteConfig.apiUrl}/purchaseorderlineitem/poid/`
    );

    if (callResult.response != undefined) {
      notification('error', callResult.response.data.msg);
    } else {
      // var temp = [];
      // callResult.data.data.map((value, index) => {
      //   value.key = parseInt(index) + 1;
      //   temp.push(value);
      // });

      yield put({
        type: actions.GET_PURCHASE_LINEITEM_REDUCER,
        data: callResult.data.data, //createDemoData(),
      });
    }
  } catch (error) {
    notification('error', 'Internal server error!');
  }
}
export function* createdId() {
  axios.defaults.headers.get['Authorization'] = localStorage.getItem(
    'id_token'
  );
  try {
    const callResult = yield call(
      onCallReqeust,
      `${siteConfig.apiUrl}/purchaseorderlineitem`
    );

    if (callResult.response != undefined) {
      notification('error', callResult.response.data.msg);
    } else {
      yield put({
        type: actions.CREATED_PURCHASE_ORDER_ID_REDUCER,
        data: callResult.data.data[0] ? callResult.data.data[0]._id + 1 : 0,
      });
    }
  } catch (error) {
    notification('error', 'Internal server error!');
  }
}
export function* addPurchaseRequest({ payload }) {
  console.log(payload, 'sdfsdf');
  axios.defaults.headers.post['Authorization'] = localStorage.getItem(
    'id_token'
  );
  try {
    const callResult = yield call(
      onPostCallReqeust,
      payload.sendData,
      `${siteConfig.apiUrl}/purchaseorderlineitem`
    );

    if (callResult.response != undefined) {
      notification('error', callResult.response.data.msg);
    } else {
      notification('success', callResult.data.msg);
      yield put({
        type: actions.GET_PURCHASE_REQUEST,
      });
    }
  } catch (error) {
    yield put({ type: actions.ADD_FAILED, msg: 'Server Internal error!' });
  }
}
export function* updatePurchaseRequest({ payload }) {
  axios.defaults.headers.put['Authorization'] = localStorage.getItem(
    'id_token'
  );
  try {
    const callResult = yield call(
      onPutCallReqeust,
      payload.sendData,
      `${siteConfig.apiUrl}/purchaseorderlineitem/${payload.id}`
    );

    if (callResult.response != undefined) {
      notification('error', callResult.response.data.msg);
    } else {
      notification('success', callResult.data.msg);
      yield put({
        type: actions.GET_PURCHASE_REQUEST,
      });
    }
  } catch (error) {
    notification('success', 'Server Internal error!');
  }
}
export function* updatePurchaseBaord({ payload }) {
  axios.defaults.headers.put['Authorization'] = localStorage.getItem(
    'id_token'
  );
  try {
    const callResult = yield call(
      onPutCallReqeust,
      payload.sendData,
      `${siteConfig.apiUrl}/purchaseorderlineitem/${payload.id}`
    );

    if (callResult.response != undefined) {
      notification('error', callResult.response.data.msg);
    } else {
      // notification('success', callResult.data.msg);
      yield put({
        type: actions.GET_PURCHASE_PLAN_BOARD,
      });
    }
  } catch (error) {
    notification('success', 'Server Internal error!');
  }
}

export function* updateLineItem({ payload }) {
  axios.defaults.headers.put['Authorization'] = localStorage.getItem(
    'id_token'
  );
  try {
    const callResult = yield call(
      onPutCallReqeust,
      payload.sendData,
      `${siteConfig.apiUrl}/purchaseorderlineitem/${payload.id}`
    );

    if (callResult.response != undefined) {
      notification('error', callResult.response.data.msg);
    } else {
      // notification('success', callResult.data.msg);
      yield put({
        type: actions.GET_PURCHASE_LINEITEM,
        payload: { id: payload.sendData.intPurchaseOrderID },
      });
    }
  } catch (error) {
    notification('error', 'Server Internal error!');
  }
}
export function* deletePurchaseRequest({ payload }) {
  axios.defaults.headers.delete['Authorization'] = localStorage.getItem(
    'id_token'
  );
  try {
    const callResult = yield call(
      onDeleteCallReqeust,
      `${siteConfig.apiUrl}/purchaseorderlineitem/${payload.id}`
    );
    if (callResult.response != undefined) {
      notification('error', callResult.response.data.msg);
    } else {
      notification('success', callResult.data.msg);
      yield put({
        type: actions.DELETE_PURCHASE_LINEITEM_SUCCESS,
      });
    }
  } catch (error) {
    notification('error', 'Server Internal error!');
  }
}

export default function* rootSaga() {
  yield all([
    yield takeEvery(actions.GET_PURCHASE_REQUEST, getPurchaserRequest),
    yield takeEvery(actions.UPDATE_PURCHASE_BOARD, updatePurchaseBaord),
    yield takeEvery(actions.ADD_PURCHASE_REQUEST, addPurchaseRequest),
    yield takeEvery(actions.CREATED_PURCHASE_ORDER_ID, createdId),
    yield takeEvery(actions.UPDATE_PURCHASE_REQUEST, updatePurchaseRequest),
    yield takeEvery(actions.EDIT_LINE_ITEM, updateLineItem),
    yield takeEvery(actions.DELETE_PURCHASE_REQUES, deletePurchaseRequest),
    yield takeEvery(actions.GET_PURCHASE_LINEITEM, getPurchaseLineItem),
    yield takeEvery(actions.GET_PURCHASE_PLAN_BOARD, getPurchaseBoard),
    yield takeEvery(actions.GET_PURCHASE_LINEITEM_FROM_BOARD, getDataFromBoard),
  ]);
}
