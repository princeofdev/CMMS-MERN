// import clone from 'clone';
import actions from './actions';
const initState = {
  schedulenotifications: [],
  schedulenotification: {},
  isDelete: false,
};

export default function cardReducer(state = initState, { type, ...action }) {
  switch (type) {
    case actions.GET_SCHEDULED_NOTIFICATIONS_REDUCER: {
      return {
        ...state,
        schedulenotifications: action.data,
        isDelete: false,
      };
    }
    // case actions.GET_SCHEDULED_TASK_BY_ID_REDUCER: {
    //   return {
    //     ...state,
    //     scheduledtask: action.data,
    //     isDelete: false,
    //   };
    // }
    case actions.DELETE_SCHEDULED_NOTIFICATION_SUCCESS:
      return {
        ...state,
        isDelete: true,
      };
    default:
      return state;
  }
}
