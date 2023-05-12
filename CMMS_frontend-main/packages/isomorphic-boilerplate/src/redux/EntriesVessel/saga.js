import { all, takeEvery, put, call, apply } from 'redux-saga/effects';
import axios from 'axios';
// import { getToken } from '@iso/lib/helpers/utility';
import siteConfig from '@iso/config/site.config';
import moment from 'moment';
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
export function* getEntriesVesselList() {
  axios.defaults.headers.get['Authorization'] = localStorage.getItem(
    'id_token'
  );
  try {
    const callResult = yield call(
      onCallReqeust,
      `${siteConfig.apiUrl}/vessellists`
    );

    if (callResult.response != undefined) {
      notification('error', callResult.response.data.msg);
    } else {
      console.log(callResult.data.data)
      var temp = [];
      callResult.data.data.map((value, index) => {
        value.key = parseInt(index) + 1;
        // value.key = value._id;
        temp.push(value);
      });

      yield put({
        type: actions.GET_ENTRIES_VESSEL_LIST_REDUCER,
        entries: temp, //createDemoData(),
      });
    }
  } catch (error) {
    notification('error', 'Internal server error!');
  }
}

export function* getWeatherDatas({ payload }) {
  axios.defaults.headers.get['Authorization'] = siteConfig.weatherApiKey;

  const currentDate = new Date();
  const currentDayOfMonth = currentDate.getDate();
  const currentMonth = currentDate.getMonth(); // Be careful! January is 0, not 1
  const currentYear = currentDate.getFullYear();
  const start_date = new Date(
    currentYear,
    currentMonth,
    currentDayOfMonth,
    0,
    0,
    0
  );
  const end_date = new Date(
    currentYear,
    currentMonth,
    currentDayOfMonth,
    21,
    0,
    0
  );

  let start = Math.round(start_date.getTime() / 1000);
  let end = Math.round(end_date.getTime() / 1000);
  let start_endTime = '&start=' + start + '&end=' + end;
  try {
    const callResult = yield call(
      onCallReqeust,
      `${siteConfig.weatherApiUrl}${start_endTime}`
    );

    let temp = [];
    let k = 0;
    var now = moment().format('YYYY-MM-DD HH:mm:ss');
    for (var i = 0; i < callResult.data.hours.length; i = i + 3) {
      let weather = {};
      k++;
      weather.key = k;
      weather.weatherTime = callResult.data.hours[i].time;
      var time = moment(callResult.data.hours[i].time).format(
        'YYYY-MM-DD HH:mm:ss'
      );
      if (now < time) continue;
      var data = callResult.data.hours[i];
      var content = '';
      content +=
        'Wind Speed ' +
        parseFloat(data.windSpeed.sg * 1.944).toFixed(2) +
        ' Knts , ';
      content +=
        'Gust ' + parseFloat(data.gust.sg * 1.944).toFixed(2) + ' Knts , ';
      content +=
        'Air Temperature ' +
        parseInt(data.airTemperature.sg * 1.8 + 32) +
        ' °F , ';
      content +=
        'Water Temperature ' +
        parseInt(data.waterTemperature.sg * 1.8 + 32) +
        ' °F , ';
      content += 'Coud Coverage ' + parseInt(data.cloudCover.sg) + ' %, ';
      content += 'Relative Humidity ' + parseInt(data.humidity.sg) + ' % , ';
      content +=
        'Pressure ' +
        parseFloat((data.pressure.sg * 0.0295301) / 100).toFixed(2) +
        ' In , ';
      content +=
        'Visibility ' +
        parseFloat(data.visibility.sg / 1.609).toFixed(2) +
        ' Miles ';
      // content+="Current Direction "+data.currentDirection.meto+" Meto, ";
      // content+="Current Speed "+data.currentSpeed.meto+" Meto, ";
      // content+="Sea Level "+data.seaLevel.meto+" Meto, ";
      // content+="Swell Direction "+data.swellDirection.meto+" Meto, ";
      // content+="Swell Height "+data.swellHeight.meto+" Meto, ";
      // content+="Swell Period "+data.swellPeriod.meto+" Meto ";

      weather.weather = content;
      temp.push(weather);
    }
    // if(callResult.response!=undefined){
    //   notification('error',callResult.response.data.msg)
    // }
    // else{
    yield put({
      type: actions.GET_WEATHER_DATA_REDUCER,
      data: temp,
    });
    // }
  } catch (error) {
    notification('error', 'Internal server error2!');
  }
}

export function* getVesselListById({ payload }) {
  axios.defaults.headers.get['Authorization'] = localStorage.getItem(
    'id_token'
  );
  try {
    const callResult = yield call(
      onCallReqeust,
      `${siteConfig.apiUrl}/vessellists/${payload.id}`
    );

    if (callResult.response != undefined) {
      notification('error', callResult.response.data.msg);
    } else {
      yield put({
        type: actions.GET_VESSEL_LIST_ID_REDUCER,
        vesselList: callResult.data.data,
        msg: null,
      });
    }
  } catch (error) {
    notification('error', 'Internal server error3!');
  }
}
export function* addVesselList({ payload }) {
  axios.defaults.headers.post['Authorization'] = localStorage.getItem(
    'id_token'
  );
  try {
    const callResult = yield call(
      onPostCallReqeust,
      payload.sendData,
      `${siteConfig.apiUrl}/vessellists`
    );

    if (callResult.response != undefined) {
      notification('error', callResult.response.data.msg);
    } else {
      notification('success', callResult.data.msg);
      yield put({
        type: actions.ADD_VESSEL_LIST_SUCCESS,
      });
    }
  } catch (error) {
    yield put({ type: actions.ADD_FAILED, msg: 'Server Internal error!' });
  }
}
export function* updateVesselList({ payload }) {
  axios.defaults.headers.put['Authorization'] = localStorage.getItem(
    'id_token'
  );
  try {
    const callResult = yield call(
      onPutCallReqeust,
      payload.sendData,
      `${siteConfig.apiUrl}/vessellists/${payload.id}`
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

export function* deleteVesselEntries({ payload }) {
  axios.defaults.headers.delete['Authorization'] = localStorage.getItem(
    'id_token'
  );
  try {
    const callResult = yield call(
      onDeleteCallReqeust,
      `${siteConfig.apiUrl}/vessellists/${payload.id}`
    );

    if (callResult.response != undefined) {
      notification('error', callResult.response.data.msg);
    } else {
      notification('success', callResult.data.msg);
      yield put({
        type: actions.DELETE_SUCCESS,
      });
    }
  } catch (error) {
    notification('error', 'Server Internal error!');
  }
}

export default function* rootSaga() {
  yield all([
    yield takeEvery(actions.UPDATE_VESSEL_LIST, updateVesselList),
    yield takeEvery(actions.ADD_VESSEL_LIST, addVesselList),
    yield takeEvery(actions.GET_ENTRIES_VESSEL_LIST, getEntriesVesselList),
    yield takeEvery(actions.GET_VESSEL_LIST_BY_ID, getVesselListById),
    yield takeEvery(actions.DELETE_VESSEL_ENTRIES, deleteVesselEntries),
    yield takeEvery(actions.GET_WEATHER_DATA, getWeatherDatas),
  ]);
}
