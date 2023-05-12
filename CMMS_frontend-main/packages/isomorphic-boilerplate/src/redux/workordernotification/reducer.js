// import clone from 'clone';
import actions from './actions';
const initState = {
  workordernotifications: [],
  workordernotification: {},
  isDelete: false,
};

export default function cardReducer(state = initState, { type, ...action }) {
  switch (type) {
    case actions.GET_WORKORDER_NOTIFICATIONS_REDUCER: {
      return {
        ...state,
        workordernotifications: action.data,
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
    case actions.DELETE_WORKORDER_NOTIFICATION_SUCCESS:
      return {
        ...state,
        isDelete: true,
      };
    default:
      return state;
  }
}
