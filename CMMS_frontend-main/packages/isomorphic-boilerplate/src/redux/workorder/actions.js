const actions = {
  GET_WORKORDERS: 'GET_WORKORDERS',
  ADD_WORKORDER: 'ADD_WORKORDER',
  ADD_WORKORDER_FROM_TASK: 'ADD_WORKORDER_FROM_TASK',
  ADD_WORKORDER_SUCCESS: 'ADD_WORKORDER_SUCCESS',
  ADD_FAILED: 'ADD_FAILED',
  GET_WORKORDER_REDUCER: 'GET_WORKORDER_REDUCER',
  GET_WORK_ORDER_BY_ID: 'GET_WORK_ORDER_BY_ID',
  GET_BY_ID_REDUCER: 'GET_BY_ID_REDUCER',
  UPDATE_WORKORDER: 'UPDATE_WORKORDER',
  UPDATE_SUCCESS: 'UPDATE_SUCCESS',
  DELETE_WORKORDER: 'DELETE_WORKORDER',
  DELETE_SUCCESS: 'DELETE_SUCCESS',
  DELETE_FAILED: 'DELETE_FAILED',
  GET_PRINT_WORKORDERS: 'GET_PRINT_WORKORDERS',
  PRINT_WORKORDERS_REDUCER: 'PRINT_WORKORDERS_REDUCER',
  ADD_TO_WORKORDER_TASK: 'ADD_TO_WORKORDER_TASK',
  ADD_TO_WORKORDER_TASK_SUCCESS: 'ADD_TO_WORKORDER_TASK_SUCCESS',
  CREATE_WOID:'CREATE_WOID',
  CREATE_WOID_SUCCESS:'CREATE_WOID_SUCCESS',
  GET_WO_BY_SM_ID: "GET_WO_BY_SM_ID",
  GET_WO_BY_SM_ID_REDUCER: "GET_WO_BY_SM_ID_REDUCER",
  initData: () => ({ type: actions.GET_WORKORDERS }),
  initOrderData: () => ({ type: actions.GET_WORKORDERS }),
  add: (sendData) => {
    return (dispatch, getState) => {
      dispatch({
        type: actions.ADD_WORKORDER,
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
  deleteData: (selected) => {
    return (dispatch) => {
      dispatch({
        type: actions.DELETE_WORKORDER,
        payload: { id: selected },
      });
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
  createWorkOrderId: () => {
    return (dispatch, getState) => {
      dispatch({
        type: actions.CREATE_WOID,     
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
