const actions = {
  GET_SCHEDULED_NOTIFICATIONS: 'GET_SCHEDULED_NOTIFICATIONS',
  ADD_SCHEDULED_NOTIFICATION: 'ADD_SCHEDULED_NOTIFICATION',
  GET_SCHEDULED_NOTIFICATIONS_REDUCER: 'GET_SCHEDULED_NOTIFICATIONS_REDUCER',
  // GET_SCHEDULED_TASK_BY_ID: 'GET_SCHEDULED_TASK_BY_ID',
  // GET_SCHEDULED_TASK_BY_ID_REDUCER: 'GET_SCHEDULED_TASK_BY_ID_REDUCER',
  UPDATE_SCHEDULED_NOTIFICATION: 'UPDATE_SCHEDULED_NOTIFICATION',
  DELETE_SCHEDULED_NOTIFICATION: 'DELETE_SCHEDULED_NOTIFICATION',
  DELETE_SCHEDULED_NOTIFICATION_SUCCESS: 'DELETE_SCHEDULED_NOTIFICATION_SUCCESS',

  // initData: () => ({ type: actions.GET_WORKORDER_TASKS }),
  getDatas: (smId) => {
    return (dispatch, getState) => {
      dispatch({ type: actions.GET_SCHEDULED_NOTIFICATIONS, payload: { smId: smId } });
    };
  },
  saveScheduledNotification: (sendData) => {
    return (dispatch, getState) => {
      dispatch({
        type: actions.ADD_SCHEDULED_NOTIFICATION,
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
        type: actions.DELETE_SCHEDULED_NOTIFICATION,
        payload: { id: selected },
      });
    };
  },
  updateData: (sendData, id) => {
    return (dispatch) => {
      dispatch({
        type: actions.UPDATE_SCHEDULED_NOTIFICATION,
        payload: { sendData: sendData, id: id },
      });
    };
  },
};
export default actions;
