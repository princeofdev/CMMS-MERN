const actions = {
  GET_PURCHASEORDER_NOTIFICATIONS: 'GET_PURCHASEORDER_NOTIFICATIONS',
  ADD_PURCHASEORDER_NOTIFICATION: 'ADD_PURCHASEORDER_NOTIFICATION',
  GET_PURCHASEORDER_NOTIFICATIONS_REDUCER:'GET_PURCHASEORDER_NOTIFICATIONS_REDUCER',
  UPDATE_PURCHASEORDER_NOTIFICATION: 'UPDATE_PURCHASEORDER_NOTIFICATION',
  DELETE_PURCHASER_NOTIFICATION: 'DELETE_PURCHASER_NOTIFICATION',
  DELETE_PURCHASER_NOTIFICATION_SUCCESS:'DELETE_PURCHASER_NOTIFICATION_SUCCESS',
  // initData: () => ({ type: actions.GET_WORKORDER_TASKS }),
  getDatas: (POId) => {
    return (dispatch, getState) => {
      dispatch({
        type: actions.GET_PURCHASEORDER_NOTIFICATIONS,
        payload: { id: POId },
      });
    };
  },
  savePurchaseOrderNotification: (sendData) => {
    return (dispatch, getState) => {
      dispatch({
        type: actions.ADD_PURCHASEORDER_NOTIFICATION,
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
        type: actions.UPDATE_PURCHASEORDER_NOTIFICATION,
        payload: { sendData: sendData, id: id },
      });
    };
  },
};
export default actions;
