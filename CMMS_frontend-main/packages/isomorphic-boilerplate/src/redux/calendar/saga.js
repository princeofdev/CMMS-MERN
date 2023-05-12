import { all, takeEvery, put, call } from 'redux-saga/effects';
import axios from 'axios';
// import { getToken } from '@iso/lib/helpers/utility';
import siteConfig from '@iso/config/site.config';
import notification from '@iso/components/Notification';
import moment from 'moment';
import actions from './actions';
import { start } from 'nprogress';

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
export function* get() {
  axios.defaults.headers.get['Authorization'] = localStorage.getItem(
    'id_token'
  );
  try {
    const callResult = yield call(
      onCallReqeust,
      `${siteConfig.apiUrl}/calendar`
    );

    if (callResult.response != undefined) {
      notification('error', callResult.response.data.msg);
    } else {
      var temp = [];
      callResult.data.data.map((value, index) => {
        value.key = parseInt(index) + 1;
        value.priorityName =
          value.intPriorityID != null ? priority[value.intPriorityID] : '';
        value.workOrderStatus =
          value.intWorkOrderStatusID != null
            ? workorderStatus_array[value.intWorkOrderStatusID]
            : '';
        value.maintenanceTypeName =
          value.intMaintenanceTypeID != null
            ? maintanceType_array[value.intMaintenanceTypeID]
            : '';
        value.assetName =
          value.strAssetIds != null ? value.strAssetIds.strName : '';
        value.assignedUser =
          value.intAssignedUserId != null
            ? value.intAssignedUserId.strFullName
            : '';
        value.completedByUser =
          value.intCompletedByUserID != null
            ? value.intCompletedByUserID.strFullName
            : '';
        temp.push(value);
      });

      yield put({
        type: actions.GET_WORKORDER_REDUCER,
        workorders: temp, //createDemoData(),
      });
    }
  } catch (error) {
    notification('error', 'Internal server error!');
  }
}

export function* getCalendarDatas() {
  axios.defaults.headers.get['Authorization'] = localStorage.getItem(
    'id_token'
  );
  try {
    const callResult = yield call(
      onCallReqeust,
      `${siteConfig.apiUrl}/calendar`
    );

    if (callResult.response != undefined) {
      notification('error', callResult.response.data.msg);
    } else {
      var temp = [];
      callResult.data.workorder.map((value, index) => {
        //  value.key=parseInt(index)+1;
        // var event={};
        value.id = value._id;
        value.type = 'workorder';
        var description =
          value.strDescription == undefined ? '' : value.strDescription;
        description =
          description.length > 10
            ? description.substring(0, 10) + '...'
            : description;
        value.title =
          value.strCode +
          '-' +
          description +
          '-' +
          value.strAssignedUsers +
          '-' +
          value.strAssets;
        value.color = 'blue';
        if (value.strAssignedUsers === 'Deck Department') value.resourceId = 1;
        else if (value.strAssignedUsers === 'Engineering Department')
          value.resourceId = 2;
        else if (value.strAssignedUsers === 'Steward Department')
          value.resourceId = 3;
        else if (value.strAssignedUsers === 'Skill Trades Department')
          value.resourceId = 4;
        value.assignedUser = value.strAssignedUsers; // name assigned to user.
        // value.start= new moment(value.dtmSuggestedCompletionDate).toDate();
        if (
          value.dtmEstimatedStartTime == '' ||
          value.dtmEstimatedStartTime == undefined
        ) {
          let start_tmp = new moment(value.dtmEstimatedStartDate).toDate();
          start_tmp.setHours(8);
          value.start = start_tmp;

          let tmp = new moment(value.dtmEstimatedStartDate).toDate();
          tmp.setHours(
            start_tmp.getHours() + Math.floor(value.intEstimatedHour)
          );
          tmp.setMinutes(
            (parseFloat(value.intEstimatedHour) -
              Math.floor(value.intEstimatedHour)) *
              60
          );
          value.end = tmp;
          // value.end=new moment(value.dtmSuggestedCompletionDate).toDate();
        } else {
          let start_tmp = new moment(value.dtmEstimatedStartDate).toDate();
          let temp_time = value.dtmEstimatedStartTime.split(':');
          start_tmp.setHours(parseInt(temp_time[0]));
          start_tmp.setMinutes(parseInt(temp_time[1]));
          start_tmp.setSeconds(parseInt(temp_time[2]));
          value.start = start_tmp;

          let tmp = new moment(value.dtmEstimatedStartDate).toDate();
          tmp.setHours(
            start_tmp.getHours() + Math.floor(value.intEstimatedHour)
          );
          tmp.setMinutes(
            (parseFloat(value.intEstimatedHour) -
              Math.floor(value.intEstimatedHour)) *
              60
          );
          value.end = tmp;
          // value.end=new moment(value.dtmSuggestedCompletionDate).toDate();
        }
        // let tmp =new moment(value.dtmEstimatedStartDate).toDate();
        // tmp.setHours( tmp.getHours() + value.intEstimatedHour );
        // value.end = tmp;
        // console.log(value.start,value.end,value.intEstimatedHour)
        value.desc = value.strDescription;
        value.allDay = false;
        temp.push(value);
      });

      callResult.data.charter.map((value, index) => {
        value.id = value._id;
        value.type = 'charter';
        value.title =
          '' +
          'CH#' +
          value._id +
          '-' +
          value.reference +
          '-' +
          value.charter +
          "'-'" +
          value.numberOfGuests +
          " PAX'";
        if (value.charter === 'charter') value.color = 'red';
        else if (value.charter !== 'charter') value.color = 'purple';

        let currentDate = new moment(new Date()).toDate().setHours(0);

        let startDate = new moment(value.startDate).toDate();

        startDate.setHours(0);
        value.start = startDate;

        if (currentDate === startDate && value.charter === 'charter')
          value.borderColor = 'red';

        let finishDate = new moment(value.finishDate).toDate();
        finishDate.setHours(1);
        value.end = finishDate;
        value.desc = 'Charter';

        temp.push(value);
      });

      callResult.data.audit.map((value, index) => {
        value.id = value._id;
        value.type = 'audit';
        value.title = "'" + value.strCode + "' '" + value.strTitle;
        value.color = 'green';

        let startDate = new moment(
          value.aSmsAuditPlan.aOpenMeetingBegin
        ).toDate();
        startDate.setHours(0);
        value.start = startDate;

        let finishDate = new moment(
          value.aSmsAuditPlan.aOpenMeetingClose
        ).toDate();
        finishDate.setHours(1);
        value.end = finishDate;
        value.desc = 'Audit';

        temp.push(value);
      });

      callResult.data.drill.map((value, index) => {
        value.id = value._id;
        value.type = 'drill';
        value.title = "'" + value.strCode + "' '" + value.strTitle;
        value.color = 'orange';

        let startDate = new moment(value.aDueDate).toDate();
        startDate.setHours(0);
        value.start = startDate;

        let finishDate = new moment(value.aDueDate).toDate();
        finishDate.setHours(0);
        value.end = finishDate;
        value.desc = 'drill';

        temp.push(value);
      });

      yield put({
        type: actions.GET_WORKORDER_CALENDAR_REDUCER,
        data: temp, //createDemoData(),
      });
    }
  } catch (error) {
    console.log(error);
    notification('error', 'Internal server error!');
  }
}

export function* updateWorkOrderCalendar({ payload }) {
  axios.defaults.headers.put['Authorization'] = localStorage.getItem(
    'id_token'
  );
  try {
    const callResult = yield call(
      onPutCallReqeust,
      payload.sendData,
      `${siteConfig.apiUrl}/calendar/${payload.id}`
    );
    if (callResult.response != undefined) {
      notification('error', callResult.response.data.msg);
    } else {
      //notification('success',callResult.data.msg)
      yield put({
        type: actions.GET_CALENDAR_DATAS,
      });
    }
  } catch (error) {
    notification('error', 'Server Internal error!');
  }
}

export function* updateCharterCalendar({ payload }) {
  axios.defaults.headers.put['Authorization'] = localStorage.getItem(
    'id_token'
  );
  try {
    const callResult = yield call(
      onPutCallReqeust,
      payload.sendData,
      `${siteConfig.apiUrl}/charter/${payload.id}`
    );
    if (callResult.response != undefined) {
      notification('error', callResult.response.data.msg);
    } else {
      //notification('success',callResult.data.msg)
      yield put({
        type: actions.GET_CALENDAR_DATAS,
      });
    }
  } catch (error) {
    notification('error', 'Server Internal error!');
  }
}

export function* updateAuditCalendar({ payload }) {
  axios.defaults.headers.put['Authorization'] = localStorage.getItem(
    'id_token'
  );
  try {
    const callResult = yield call(
      onPutCallReqeust,
      payload.sendData,
      `${siteConfig.apiUrl}/audit/${payload.id}`
    );
    if (callResult.response != undefined) {
      notification('error', callResult.response.data.msg);
    } else {
      //notification('success',callResult.data.msg)
      yield put({
        type: actions.GET_CALENDAR_DATAS,
      });
    }
  } catch (error) {
    notification('error', 'Server Internal error!');
  }
}

export function* updateDrillCalendar({ payload }) {
  axios.defaults.headers.put['Authorization'] = localStorage.getItem(
    'id_token'
  );
  try {
    const callResult = yield call(
      onPutCallReqeust,
      payload.sendData,
      `${siteConfig.apiUrl}/drill/${payload.id}`
    );
    if (callResult.response != undefined) {
      notification('error', callResult.response.data.msg);
    } else {
      //notification('success',callResult.data.msg)
      yield put({
        type: actions.GET_CALENDAR_DATAS,
      });
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
      `${siteConfig.apiUrl}/calendar/${payload.id}`
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
    // yield takeEvery(actions.GET_WORKORDERS, get),
    yield takeEvery(actions.GET_CALENDAR_DATAS, getCalendarDatas),
    yield takeEvery(actions.UPDATE_WORKORDER_CALENDAR, updateWorkOrderCalendar),
    yield takeEvery(actions.UPDATE_CHARTER_CALENDAR, updateCharterCalendar),
    yield takeEvery(actions.UPDATE_AUDIT_CALENDAR, updateAuditCalendar),
    yield takeEvery(actions.UPDATE_DRILL_CALENDAR, updateDrillCalendar),
  ]);
}
