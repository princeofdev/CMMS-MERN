const actions = {
  GET_WORKORDER_NOTIFICATIONS: 'GET_WORKORDER_NOTIFICATIONS',
  ADD_WORKORDER_NOTIFICATION: 'ADD_WORKORDER_NOTIFICATION',
  GET_WORKORDER_NOTIFICATIONS_REDUCER: 'GET_WORKORDER_NOTIFICATIONS_REDUCER',
  // GET_SCHEDULED_TASK_BY_ID: 'GET_SCHEDULED_TASK_BY_ID',
  // GET_SCHEDULED_TASK_BY_ID_REDUCER: 'GET_SCHEDULED_TASK_BY_ID_REDUCER',
  UPDATE_WORKORDER_NOTIFICATION: 'UPDATE_WORKORDER_NOTIFICATION',
  DELETE_WORKORDER_NOTIFICATION: 'DELETE_WORKORDER_NOTIFICATION',
  DELETE_WORKORDER_NOTIFICATION_SUCCESS: 'DELETE_WORKORDER_NOTIFICATION_SUCCESS',

  // initData: () => ({ type: actions.GET_WORKORDER_TASKS }),
  getDatas: (woId) => {
    return (dispatch, getState) => {
      dispatch({ type: actions.GET_WORKORDER_NOTIFICATIONS, payload: { woId: woId } });
    };
  },
  saveWorkOrderNotification: (sendData) => {
    return (dispatch, getState) => {
      dispatch({
        type: actions.ADD_WORKORDER_NOTIFICATION,
        payload: { sendData: sendData },
      });
    };
  },
  // getById: (id) => {
  //   return (dispatch) => {
  //     dispatch({ type: actions.GET_SCHEDULED_TASK_BY_ID, payload: { id: id } });
  //   };
  // },
  deleteData: (selected) => {
    return (dispatch) => {
      dispatch({
        type: actions.DELETE_WORKORDER_NOTIFICATION,
        payload: { id: selected },
      });
    };
  },
  updateData: (sendData, id) => {
    return (dispatch) => {
      dispatch({
        type: actions.UPDATE_WORKORDER_NOTIFICATION,
        payload: { sendData: sendData, id: id },
      });
    };
  },
};
export default actions;
