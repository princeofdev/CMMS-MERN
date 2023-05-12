const actions = {
  GET_RECEIPTS: 'GET_RECEIPTS',
  ADD_RECEIPTS: 'ADD_RECEIPTS',
  ADD_RECEIPTS_SUCCESS: 'ADD_WORKORDER_SUCCESS',
  ADD_FAILED: 'ADD_FAILED',
  UPDATE_RECEIPTS: 'UPDATE_RECEIPTS',
  UPDATE_SUCCESS: 'UPDATE_SUCCESS',
  CREATE_RECEIPTID: 'CREATE_RECEIPTID',

  // ADD_WORKORDER_FROM_TASK: 'ADD_WORKORDER_FROM_TASK',
  // GET_WORKORDER_REDUCER: 'GET_WORKORDER_REDUCER',
  // GET_WORK_ORDER_BY_ID: 'GET_WORK_ORDER_BY_ID',
  // GET_BY_ID_REDUCER: 'GET_BY_ID_REDUCER',
  // GET_PRINT_WORKORDERS: 'GET_PRINT_WORKORDERS',
  // PRINT_WORKORDERS_REDUCER: 'PRINT_WORKORDERS_REDUCER',
  // ADD_TO_WORKORDER_TASK: 'ADD_TO_WORKORDER_TASK',
  // ADD_TO_WORKORDER_TASK_SUCCESS: 'ADD_TO_WORKORDER_TASK_SUCCESS',
  // CREATE_WOID_SUCCESS: 'CREATE_WOID_SUCCESS',
  initData: () => ({ type: actions.GET_RECEIPTS }),
  initOrderData: () => ({ type: actions.GET_RECEIPTS }),
  add: (sendData) => {
    return (dispatch, getState) => {
      dispatch({
        type: actions.ADD_RECEIPTS,
        payload: { sendData: sendData },
      });
    };
  },
  addWorkOrder: (sendData) => {
    return (dispatch, getState) => {
      dispatch({
        type: actions.ADD_WORKORDER_FROM_TASK,
        payload: { sendData: sendData },
      });
    };
  },
  getById: (id) => {
    return (dispatch) => {
      dispatch({ type: actions.GET_WORK_ORDER_BY_ID, payload: { id: id } });
    };
  },
  getPrintData: (id) => {
    return (dispatch) => {
      dispatch({ type: actions.GET_PRINT_WORKORDERS, payload: { id: id } });
    };
  },
  updateData: (sendData, id) => {
    return (dispatch) => {
      dispatch({
        type: actions.UPDATE_WORKORDER,
        payload: { sendData: sendData, id: id },
      });
    };
  },
  addToWorkOrderTask: (scheduledtasks, id) => {
    return (dispatch) => {
      dispatch({
        type: actions.ADD_TO_WORKORDER_TASK,
        payload: { scheduledtasks: scheduledtasks, id: id },
      });
    };
  },
  createReceiptId: () => {
    return (dispatch, getState) => {
      console.log('success');
      dispatch({
        type: actions.CREATE_RECEIPTID,
      });
    };
  },
  getWorkOrderBySMId: (id) => {
    return (dispatch) => {
      dispatch({ type: actions.GET_WO_BY_SM_ID, payload: { id: id } });
    };
  },
};
export default actions;
