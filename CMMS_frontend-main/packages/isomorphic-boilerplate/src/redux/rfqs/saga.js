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
export function* getRfqs() {
  axios.defaults.headers.get['Authorization'] = localStorage.getItem(
    'id_token'
  );
  try {
    const callResult = yield call(
      onCallReqeust,
      `${siteConfig.apiUrl}/rfqs`
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
        type: actions.GET_RFQS_REDUCER,
        data: temp, //createDemoData(),
      });
    }
  } catch (error) {
    notification('error', 'Internal server error!');
  }
}
export function* getRfqById({ payload }) {
  axios.defaults.headers.get['Authorization'] = localStorage.getItem('id_token');
  try {
    const callResult = yield call(
      onCallReqeust,
      `${siteConfig.apiUrl}/rfqs/${payload.id}`
    );

    if (callResult.response != undefined) {
      notification('error', callResult.response.data.msg)
    }
    else {

      yield put({
        type: actions.GET_RFQ_BY_ID_REDUCER,
        data: callResult.data.data,    
      });
    }
  }
  catch (error) {
    notification('error', "Internal server error!")
  }
}
export function* creatId({ payload }) {
  axios.defaults.headers.get['Authorization'] = localStorage.getItem(
    'id_token'
  );
  try {
    const callResult = yield call(
      onCallReqeust,
      `${siteConfig.apiUrl}/rfqs`
    );

    if (callResult.response != undefined) {
      notification('error', callResult.response.data.msg);
    } else {
      yield put({
        type: actions.CREATED_RFQ_ID_REDUCER,
        data: callResult.data.data[0] ? callResult.data.data[0]._id + 1 : 0,
      });
    }
  } catch (error) {
    notification('error', 'Internal server error!');
  }
}



export function* AddRfq({ payload }) {
  axios.defaults.headers.post['Authorization'] = localStorage.getItem(
    'id_token'
  );
  try {
    const callResult = yield call(
      onPostCallReqeust,
      payload.sendData,
      `${siteConfig.apiUrl}/rfqs`
    );

    if (callResult.response != undefined) {
      notification('error', callResult.response.data.msg);
    } else {
      notification('success', callResult.data.msg);
      yield put({
        type: actions.CHANGED_REDUCER,
        msg: callResult.data.msg,
      });
    }
  } catch (error) {
    yield put({ type: actions.ADD_FAILED, msg: 'Server Internal error!' });
  }
}


export function* updateRfq({ payload }) {
  axios.defaults.headers.put['Authorization'] = localStorage.getItem(
    'id_token'
  );
  try {
    const callResult = yield call(
      onPutCallReqeust,
      payload.sendData,
      `${siteConfig.apiUrl}/rfqs/${payload.id}`
    );

    if (callResult.response != undefined) {
      notification('error', callResult.response.data.msg);
    } else {
      notification('success', callResult.data.msg);
      // yield put({
      //   type: actions.CHANGED_REDUCER,       
      // });
    }
  } catch (error) {
    notification('success', 'Server Internal error!');
  }
}

export function* deleteRfq({ payload }) {
  axios.defaults.headers.delete['Authorization'] = localStorage.getItem(
    'id_token'
  );
  try {
    const callResult = yield call(
      onDeleteCallReqeust,
      `${siteConfig.apiUrl}/rfqs/${payload.id}`
    );
    if (callResult.response != undefined) {
      notification('error', callResult.response.data.msg);
    } else {
      notification('success', callResult.data.msg);
      yield put({
        type: actions.CHANGED_REDUCER,
      });
    }
  } catch (error) {
    notification('error', 'Server Internal error!');
  }
}

export default function* rootSaga() {
  yield all([
    yield takeEvery(actions.GET_RFQS, getRfqs),
    yield takeEvery(actions.ADD_RFQS, AddRfq),
    yield takeEvery(actions.GET_RFQ_BY_ID, getRfqById),
    // yield takeEvery(actions.GET_PURCHASE_ORDER_PRINT_DATA, getPrintData),    
    yield takeEvery(actions.UPDATE_RFQ, updateRfq),
    yield takeEvery(actions.CREATED_RFQ_ID, creatId),
    yield takeEvery(actions.DELETE_RFQ, deleteRfq),
  ]);
}
